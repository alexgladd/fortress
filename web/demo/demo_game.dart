import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'game/dialogs.dart';
import 'game/game.dart';
import 'game/hero.dart';
import 'game/level.dart';
import 'game/loading.dart';
import 'game/log_panel.dart';
import 'game/stats_panel.dart';
import 'game/turn_based.dart';
import 'input.dart';

const _help = '[↑↓←→]: Move   [esc]: Quit';

class Minigame extends GameLayer<Input> {
  static const rightPanelWidth = 24;
  static const bottomPanelHeight = 8;

  final hero = Hero();
  late final Array2<Color> background;
  late StatsPanel statsPanel;
  late LogPanel logPanel;

  bool dialogOpen = false;
  Vec2 dialogPosition = Vec2.zero;
  Vec2 maxLayoutSize = Vec2(
      Game.levelSize.x + rightPanelWidth, Game.levelSize.y + bottomPanelHeight);
  Rect layoutBounds = Rect.nill;
  Rect gameViewport = Rect.nill;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  Rect get clippingRect {
    if (!game.hasLevel) return ui.renderRect;

    var clip = gameViewport.centerOn(hero.position);

    // ensure it's contained in the level
    return game.level.map.bounds.contain(clip);
  }

  @override
  void start() {
    super.start();

    game.reset();
    game.hero = hero;

    addSystem(TurnBasedSystem(hero));

    add(hero);
    hero.position = Vec2(-1, -1);

    ui.push(LoadingScreen(1));

    background =
        Array2<Color>(Game.levelSize.x, Game.levelSize.y, Color.darkBrown);
  }

  @override
  void postUpdate(double ds) {
    if (hero.position != dialogPosition) dialogPosition = Vec2.zero;

    if (!dialogOpen &&
        game.hasLevel &&
        hero.position != dialogPosition &&
        hero.position == game.level.endPosition) {
      dialogOpen = true;
      dialogPosition = hero.position;
      ui.push(levelChangeDialog);
    }
  }

  @override
  void render(Terminal terminal) {
    Terminal rTerm =
        terminal.childCenter(layoutBounds.width, layoutBounds.height);

    statsPanel.render(rTerm);
    logPanel.render(rTerm);

    var helpTerm = rTerm.child(
        (rTerm.width - _help.length) ~/ 2, rTerm.height - 1, _help.length, 1);
    helpTerm.drawText(0, 0, _help, Color.gray);

    var viewportTerm = rTerm.childRect(gameViewport);
    if (game.hasLevel) _renderMap(viewportTerm);

    super.render(viewportTerm);
  }

  @override
  void onActive(Layer<Input> popped, Object? result) {
    if (popped is LoadingScreen) {
      _loadLevel(result! as Level);
    } else if (popped == levelChangeDialog) {
      print('LEVEL CHANGE result $result');
      dialogOpen = false;

      bool isReady = result! as bool;
      if (isReady) {
        ui.push(LoadingScreen(game.dungeonLevel + 1));
      }
    }
  }

  @override
  bool onInput(Input input) {
    super.onInput(input);

    if (input == Input.cancel) {
      ui.pop();
      return true;
    }

    return false;
  }

  @override
  void onResize(Vec2 size) {
    if (ui.renderRect.contains(maxLayoutSize)) {
      // render space is larger than the game layout
      layoutBounds = Rect(Vec2.zero, maxLayoutSize);
    } else {
      // shrink game layout to fit within available render space
      layoutBounds = ui.renderRect;
    }

    gameViewport = Rect(
        Vec2.zero,
        Vec2(layoutBounds.width - rightPanelWidth,
            layoutBounds.height - bottomPanelHeight));

    statsPanel = StatsPanel(
        Rect(Vec2(layoutBounds.right - rightPanelWidth, 0),
            Vec2(rightPanelWidth, layoutBounds.height - 1)),
        hero);

    logPanel = LogPanel(Rect.sides(layoutBounds.bottom - bottomPanelHeight,
        layoutBounds.right - rightPanelWidth, layoutBounds.bottom - 1, 0));
  }

  void _loadLevel(Level level) {
    game.level = level;
    _fillBackground();

    hero.position = level.startPosition;
    hero.dirty();
    dialogPosition = Vec2.zero;

    level.monsters.forEach(add);

    game.log.msg('You enter level ${game.dungeonLevel}; the staircase crumbles '
        'behind you');

    if (level.level == 1) {
      game.log
          .msg('You detect the foul stench of demon and hear stirrings in the '
              'darkness...');
    }

    print('GAME built $level');
    print('LEVEL start ${level.startPosition}');
  }

  void _renderMap(Terminal t) {
    var clipRect = clippingRect;
    for (var pos in clipRect.getPoints()) {
      Char c;
      if (pos == game.level.endPosition) {
        c = Char(CharCode.blackDownPointingTriangle, Color.yellow);
      } else if (game.level.map[pos].isOpen) {
        c = Char(CharCode.period, Color.darkGray);
      } else {
        c = Char(CharCode.fullBlock, background[pos]);
      }

      t.drawChar(pos.x - clipRect.x, pos.y - clipRect.y, c);
    }
  }

  void _fillBackground() {
    background.fill(Color.darkBrown);

    for (var y = 0; y < background.height; y++) {
      for (var x = 0; x < background.width; x++) {
        var rand = rng.nextInt(100);
        if (rand < 2) {
          background.set(x, y, Color.darkOrange);
        } else if (rand < 5) {
          background.set(x, y, Color.darkGray);
        }
      }
    }
  }
}
