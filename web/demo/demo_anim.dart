import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

const _oranges = [
  Color.lightOrange,
  Color.orange,
  Color.darkOrange,
];

const _reds = [
  Color.lightRed,
  Color.red,
  Color.darkRed,
];

const _blues = [
  Color.lightBlue,
  Color.blue,
  Color.darkBlue,
];

const _greens = [
  Color.lightGreen,
  Color.green,
  Color.darkGreen,
];

const _colorSets = [_oranges, _reds, _blues, _greens];

class _Particle {
  final double _maxY, _baseSpeed;

  double x, y;
  Color color;

  double _speed = 0.0;

  Vec2 get pos => Vec2(x.toInt(), y.toInt());

  _Particle(int x, int maxY, this.color, this._baseSpeed)
      : x = x.toDouble(),
        y = rng.nextDouble(maxY.toDouble()),
        _maxY = maxY.toDouble();

  void update(double ds) {
    y -= _speed * ds;
    _updateSpeed();
  }

  void reset(int width, List<Color> colors) {
    x = rng.nextInt(width).toDouble();
    y = _maxY;

    color = rng.item(colors);
  }

  void _updateSpeed() {
    _speed = (((_maxY - y) / _maxY) * 4 + 1) * _baseSpeed;
  }
}

class AnimParticles extends Layer<Input> {
  final _particles = <_Particle>[];

  int _colorSet = 0;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void update(double ds) {
    for (var p in _particles) {
      p.update(ds);

      if (p.pos.y < 0) {
        p.reset(ui.renderRect.width, _colorSets[_colorSet]);
      }
    }

    dirty();
  }

  @override
  void render(Terminal terminal) {
    for (var p in _particles) {
      terminal.drawChar(p.pos.x, p.pos.y, Char.create('▲', p.color));
    }

    var ground = Char.create(CharCode.fullBlock, Color.brown);
    for (var i = 0; i < terminal.width; i++) {
      terminal.drawChar(i, terminal.height - 3, ground);
    }

    terminal.drawTextCenter(
        terminal.height - 1, '[←→] Change colors.  Press [esc] to go back.', Color.gray);
  }

  @override
  bool onInput(Input input) {
    bool handled = true;

    switch (input) {
      case Input.cancel:
        ui.pop();
        break;

      case Input.e:
        _updateColorSet(1);
        break;

      case Input.w:
        _updateColorSet(-1);
        break;

      default:
        handled = false;
    }

    return handled;
  }

  @override
  void onResize(Vec2 size) {
    _particles.clear();

    var numParticles = (size.absArea.toDouble() * 0.5).round();
    // var numParticles = 10;
    for (var i = 0; i < numParticles; i++) {
      var p = _Particle(
          rng.nextInt(size.x), size.y - 3, rng.item(_colorSets[_colorSet]), rng.rand() + 2.0);
      _particles.add(p);
    }
  }

  void _updateColorSet(int change) {
    _colorSet += change;

    if (_colorSet < 0) {
      _colorSet = _colorSets.length - 1;
    } else if (_colorSet >= _colorSets.length) {
      _colorSet = 0;
    }
  }
}
