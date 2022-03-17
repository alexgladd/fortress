import 'dart:math' as math;

import 'direction.dart';
import 'line.dart';

/// Base class of an immutable 2D vector or direction
abstract class VectorBase {
  final int x;
  final int y;

  /// The area of a rectangle formed by (0, 0) and this vector
  /// Will be a negative value if one of the vector's components are negative
  int get area => x * y;

  /// The area of a rectangle formed by (0, 0) and this vector
  /// Will always be a positive value
  int get absArea => x.abs() * y.abs();

  /// Length of the vector squared; useful for length comparisons
  int get lengthSquared => (x * x) + (y * y);

  /// Cartesian length of the vector
  num get length => math.sqrt(lengthSquared);

  /// Aspect ratio of the rectangle formed between (0, 0) and this vector
  /// (always >= 1.0)
  double get aspectRatio => x >= y ? x / y : y / x;

  const VectorBase(this.x, this.y);

  /// Clamps the given vector so that it falls within the boundaries formed by a
  /// rectangle between the origin (0, 0) and this vector.
  Vec2 clamp(VectorBase other) {
    int newX, newY;

    if (x < 0) {
      newX = other.x.clamp(x, 0).toInt();
    } else {
      newX = other.x.clamp(0, x).toInt();
    }

    if (y < 0) {
      newY = other.y.clamp(y, 0).toInt();
    } else {
      newY = other.y.clamp(0, y).toInt();
    }

    return Vec2(newX, newY);
  }

  Vec2 operator +(Object other) {
    if (other is VectorBase) {
      return Vec2(x + other.x, y + other.y);
    } else if (other is int) {
      return Vec2(x + other, y + other);
    } else {
      throw ArgumentError('Argument must be a VectorBase or an int');
    }
  }

  Vec2 operator -(Object other) {
    if (other is VectorBase) {
      return Vec2(x - other.x, y - other.y);
    } else if (other is int) {
      return Vec2(x - other, y - other);
    } else {
      throw ArgumentError('Argument must be a VectorBase or an int');
    }
  }

  Vec2 operator *(Object other) {
    if (other is VectorBase) {
      return Vec2(x * other.x, y * other.y);
    } else if (other is int) {
      return Vec2(x * other, y * other);
    } else {
      throw ArgumentError('Argument must be a VectorBase or an int');
    }
  }

  Vec2 operator ~/(Object other) {
    if (other is VectorBase) {
      return Vec2(x ~/ other.x, y ~/ other.y);
    } else if (other is int) {
      return Vec2(x ~/ other, y ~/ other);
    } else {
      throw ArgumentError('Argument must be a VectorBase or an int');
    }
  }

  @override
  bool operator ==(Object other) {
    if (other is! VectorBase) return false;
    return x == other.x && y == other.y;
  }

  @override
  int get hashCode {
    // Map negative coordinates to positive and spread out the positive ones to
    // make room for them.
    var a = x >= 0 ? 2 * x : -2 * x - 1;
    var b = y >= 0 ? 2 * y : -2 * y - 1;

    // Cantor pairing function.
    // https://en.wikipedia.org/wiki/Pairing_function
    return (a + b) * (a + b + 1) ~/ 2 + b;
  }

  @override
  String toString() => 'vec2($x, $y)';
}

/// Standard 2D vector
class Vec2 extends VectorBase {
  static const zero = Vec2(0, 0);
  static const identity = Vec2(1, 1);

  const Vec2(int x, int y) : super(x, y);

  /// Returns the same vector using the absolute value of [x] and [y]
  Vec2 abs() => Vec2(x.abs(), y.abs());

  /// Returns the vector as a [Direction] "unit" vector
  Direction toDirection() {
    var next = Line(Vec2.zero, this).first;
    return Direction(next.x, next.y);
  }
}
