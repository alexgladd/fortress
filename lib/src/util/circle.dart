import 'dart:collection';

import 'line.dart';
import 'vector.dart';

/// Utility for creating filled and outline circles as a list of points.
class Circle extends IterableBase<Vec2> {
  /// The center of the circle
  final Vec2 center;

  /// The radius of the circle
  final int radius;

  /// Whether the circle is filled or just the edge
  final bool filled;

  @override
  Iterator<Vec2> get iterator => _CircleIterator(this);

  /// Create a filled circle at the given [center] point with the given [radius]
  factory Circle.filled(Vec2 center, int radius) =>
      Circle(center, radius, true);

  /// Create an edge circle at the given [center] point with the given [radius]
  factory Circle.edge(Vec2 center, int radius) => Circle(center, radius, false);

  /// Create a circle at the given [center] point with the given [radius],
  /// optionally specifying whether it should be [filled] (defaults to true).
  Circle(this.center, this.radius, [this.filled = true]) {
    if (radius < 0) {
      throw ArgumentError.value(radius, 'radius', 'Cannot be less than zero');
    }
  }
}

class _CircleIterator extends Iterator<Vec2> {
  final Iterator<Vec2> _pointsIterator;

  @override
  Vec2 get current => _pointsIterator.current;

  // implements a modified Midpoint Circle algorithm that can also do filled
  // circles
  factory _CircleIterator(Circle circle) {
    var points = <Vec2>{};
    var d = (5 - circle.radius * 4) ~/ 4;
    var x = 0;
    var y = circle.radius;

    addPointPair(Vec2 p1, Vec2 p2) {
      points.add(p1);
      if (circle.filled) {
        points.addAll(Line(p1, p2));
      } else {
        points.add(p2);
      }
    }

    do {
      addPointPair(Vec2(circle.center.x + x, circle.center.y + y),
          Vec2(circle.center.x - x, circle.center.y + y));
      addPointPair(Vec2(circle.center.x + x, circle.center.y - y),
          Vec2(circle.center.x - x, circle.center.y - y));
      addPointPair(Vec2(circle.center.x + y, circle.center.y + x),
          Vec2(circle.center.x - y, circle.center.y + x));
      addPointPair(Vec2(circle.center.x + y, circle.center.y - x),
          Vec2(circle.center.x - y, circle.center.y - x));

      if (d < 0) {
        d += 2 * x + 1;
      } else {
        d += 2 * (x - y) + 1;
        y--;
      }

      x++;
    } while (x <= y);

    return _CircleIterator._(points.iterator);
  }

  _CircleIterator._(this._pointsIterator);

  @override
  bool moveNext() => _pointsIterator.moveNext();
}
