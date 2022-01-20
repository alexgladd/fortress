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
}

/// Standard 2D vector
class Vec2 extends VectorBase {
  static const zero = Vec2(0, 0);
  static const identity = Vec2(1, 1);

  const Vec2(int x, int y) : super(x, y);
}
