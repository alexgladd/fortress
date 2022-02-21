import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'game/game.dart';
import 'game/level.dart';
import 'game/loading.dart';
import 'game/log_panel.dart';
import 'game/stats_panel.dart';
import 'input.dart';

const _help = '[↑↓←→]: Move   [esc]: Quit';

class HeroController extends Behavior {
  late final InputHandler<Input> input;

  @override
  void start() {
    input = gameObject.get<InputHandler<Input>>()!;
  }

  @override
  void update(double ds) {
    var pos = gameObject.position;
    if (input.hasInput(Input.n)) gameObject.position += Direction.n;
    if (input.hasInput(Input.e)) gameObject.position += Direction.e;
    if (input.hasInput(Input.s)) gameObject.position += Direction.s;
    if (input.hasInput(Input.w)) gameObject.position += Direction.w;

    if (gameObject.position != pos) gameObject.dirty();
  }
}

class Minigame extends GameLayer<Input> {
  static const rightPanelWidth = 24;
  static const bottomPanelHeight = 8;

  final hero = GameObject();
  late final Array2<Color> background;
  late StatsPanel statsPanel;
  late LogPanel logPanel;

  Level? level;
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
    if (level == null) return ui.renderRect;

    var clip = gameViewport.centerOn(hero.position);

    // ensure it's contained in the level
    return level!.map.bounds.contain(clip);
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
    if (level != null) _renderMap(viewportTerm);

    super.render(viewportTerm);
  }

  @override
  void start() {
    super.start();

    add(hero);
    hero.position = Vec2(-1, -1);
    hero.add(InputHandler<Input>());
    hero.add(HeroController());
    hero.renderer.set(char: '@', foreground: Color.gold);

    ui.push(LoadingScreen(1));

    background =
        Array2<Color>(Game.levelSize.x, Game.levelSize.y, Color.darkBrown);
    _fillBackground();
  }

  @override
  void onActive(Layer<Input> popped, Object? result) {
    level = result as Level;
    hero.position = level!.startPosition;
    hero.dirty();
    print('GAME built $level');
    print('LEVEL start ${level!.startPosition}');
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

    statsPanel = StatsPanel(Rect(Vec2(layoutBounds.right - rightPanelWidth, 0),
        Vec2(rightPanelWidth, layoutBounds.height - 1)));

    logPanel = LogPanel(Rect.sides(layoutBounds.bottom - bottomPanelHeight,
        layoutBounds.right - rightPanelWidth, layoutBounds.bottom - 1, 0));
  }

  void _renderMap(Terminal t) {
    for (var pos in clippingRect.getPoints()) {
      Char c;
      if (level!.map[pos].isOpen) {
        c = Char(CharCode.period, Color.darkGray);
      } else {
        c = Char(CharCode.fullBlock, background[pos]);
      }

      t.drawChar(pos.x - clippingRect.x, pos.y - clippingRect.y, c);
    }
  }

  void _fillBackground() {
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
