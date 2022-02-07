import 'package:fortress/map.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

class DemoTile extends TileBase {
  static const open = DemoTile(true);
  static const closed = DemoTile(false);

  final bool isOpen;

  @override
  bool get isWalkable => isOpen;

  const DemoTile(this.isOpen);
}

class Maps extends Layer<Input> {
  static const wall = Char(CharCode.fullBlock, Color.darkBrown);
  static const floor = Char(CharCode.period, Color.lightBrown);

  final _timer = Stopwatch();

  late MapBuilder<DemoTile> _builder;
  late Iterator<String> _buildSteps;

  var _finished = false;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void start() {
    _buildDungeon();
  }

  @override
  void update(double dt) {
    if (_timer.elapsedMilliseconds <= 100) return;

    if (_buildSteps.moveNext()) {
      dirty();
      _timer.reset();
    } else {
      if (!_finished) _finished = true;
      _timer
        ..stop()
        ..reset();
    }
  }

  @override
  void render(Terminal terminal) {
    for (var pos in terminal.bounds.getPoints()) {
      var tile = _builder.map[pos];

      if (tile.isWalkable) {
        terminal.drawChar(pos.x, pos.y, floor);
      } else {
        terminal.drawChar(pos.x, pos.y, wall);
      }
    }
  }

  @override
  bool onInput(Input input) {
    bool handled = true;
    switch (input) {
      case Input.cancel:
        ui.pop();
        break;
      default:
        handled = false;
    }

    return handled;
  }

  @override
  bool onKeyDown(String key, String code,
      {required bool shift, required bool altOpt, required bool ctrl, required bool meta}) {
    if (!_finished) return false;

    bool handled = true;
    switch (code) {
      case KeyCode.keyD:
        _buildDungeon();
        break;

      default:
        handled = false;
    }

    return handled;
  }

  @override
  void onResize(Vec2 size) {
    _timer
      ..stop()
      ..reset();

    _buildDungeon();
  }

  void _buildDungeon() {
    _builder = Dungeon(ui.renderRect.width, ui.renderRect.height,
        wall: DemoTile.closed, room: DemoTile.open, corridor: DemoTile.open, door: DemoTile.open);
    _buildSteps = _builder.build().iterator;
    _finished = false;
    _timer.start();
    dirty();
  }
}
