// 2D vector and vector math utils

import 'dart:math' as math;

/// Base class of an immutable 2D vector or direction
abstract class VectorBase {
  final int x;
  final int y;

  const VectorBase(this.x, this.y);

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
}

/// Standard 2D vector
class Vec2 extends VectorBase {
  static const zero = Vec2(0, 0);
  static const identity = Vec2(1, 1);

  const Vec2(int x, int y) : super(x, y);
}
