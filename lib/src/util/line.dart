import 'dart:collection';

import 'vector.dart';

/// Follows a line of integer coordinates [from] one point [to] another using
/// Bresenham's line algorithm. Can optionally represent a [continuous] line
/// that continues through [to].
///
/// Useful for things like line-of-sight calculations.
class Line extends IterableBase<Vec2> {
  final Vec2 from;
  final Vec2 to;
  final bool continuous;

  @override
  Iterator<Vec2> get iterator => _LineIterator(this);

  @override
  int get length => continuous
      ? throw UnsupportedError('Length of a continuous line is unbounded')
      : super.length;

  /// Create a line between [from] and [to], optionally [continuous] through
  /// [to].
  Line(this.from, this.to, [this.continuous = false]);
}

class _LineIterator extends Iterator<Vec2> {
  final Vec2 _primaryStep;
  final Vec2 _secondaryStep;
  final Vec2? _end;
  final int _primary;
  final int _secondary;

  Vec2 _current;
  int _error = 0;

  bool get isContinuous => _end != null;

  @override
  Vec2 get current => _current;

  factory _LineIterator(Line line) {
    var delta = line.to - line.from;

    // octant selection
    var primaryStep = Vec2(delta.x.sign, 0);
    var secondaryStep = Vec2(0, delta.y.sign);

    // discard signs
    delta = delta.abs();

    // initial primary/secondary magnitudes
    var primary = delta.x;
    var secondary = delta.y;

    // flip the order based on magnitutes
    if (secondary > primary) {
      var temp = primary;
      primary = secondary;
      secondary = temp;

      var tempStep = primaryStep;
      primaryStep = secondaryStep;
      secondaryStep = tempStep;
    }

    return _LineIterator._(line.from, primary, secondary, primaryStep,
        secondaryStep, line.continuous ? null : line.to);
  }

  _LineIterator._(this._current, this._primary, this._secondary,
      this._primaryStep, this._secondaryStep, this._end);

  @override
  bool moveNext() {
    if (isContinuous && _current == _end) return false;

    // step
    _current += _primaryStep;

    // accumulate error
    _error += _secondary;

    // check if we need to make a secondary step
    if (_error * 2 >= _primary) {
      _current += _secondaryStep;
      _error -= _primary;
    }

    return true;
  }
}
