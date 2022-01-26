import 'dart:math' as math;

import 'vector.dart';

/// Immutable 2D rectangle with integer position and size. Note that a [Rect] can be constructed
/// with negative size values; this will be handled properly.
class Rect {
  /// The null rectangle: position (0, 0) size (0, 0)
  static const nill = Rect(Vec2.zero, Vec2.zero);

  final Vec2 position;
  final Vec2 size;

  /// Horizontal coordinate of the top-left corner of this rectangle
  int get x => position.x;

  /// Vertical coordinate of the top-left corner of this rectangle
  int get y => position.y;

  /// Width of the rectangle
  int get width => size.x;

  /// Height of the rectangle
  int get height => size.y;

  /// Vertical coordinate of the top side of this rectangle
  int get top => math.min(y, y + height);

  /// Horizontal coordinate of the right side of this rectangle
  int get right => math.max(x, x + width);

  /// Vertical coordinate of the bottom side of this rectangle
  int get bottom => math.max(y, y + height);

  /// Horizontal coordinate of the left side of this rectangle
  int get left => math.min(x, x + width);

  /// Top-left corner of the rectangle
  Vec2 get topLeft => Vec2(left, top);

  /// Top-right corner of the rectangle
  Vec2 get topRight => Vec2(right, top);

  /// Bottom-right corner of the rectangle
  Vec2 get bottomRight => Vec2(right, bottom);

  /// Bottom-left corner of the rectangle
  Vec2 get bottomLeft => Vec2(left, bottom);

  /// Integer center point of the rectangle
  Vec2 get center => Vec2((left + right) ~/ 2, (top + bottom) ~/ 2);

  /// Area of the rectangle (may be negative)
  int get area => size.area;

  /// Area of the rectangle (always positive)
  int get absArea => size.absArea;

  /// Create a [Rect] using the given bounds
  Rect.sides(int top, int right, int bottom, int left)
      : position = Vec2(left, top),
        size = Vec2(right - left, bottom - top);

  /// Create a [Rect] positioned at (0, 0) with the given width and height
  Rect.atOrigin(int width, int height)
      : position = Vec2.zero,
        size = Vec2(width, height);

  /// Create a [Rect] at the given position coordinates with the given width and height
  Rect.positionAndSize(int x, int y, int width, int height)
      : position = Vec2(x, y),
        size = Vec2(width, height);

  const Rect(this.position, this.size);

  /// Clamps the given [point] to the nearest point that is within the bounds of this [Rect].
  /// Returns the clamped point as a new [Vec2].
  ///
  /// For this operation, the rectangle is treated as a group of columns and rows. For example,
  /// consider the [Rect] defined by [top]=1, [right]=4, [bottom]=5, [left]=1. This rectangle
  /// consists of 3 columns (right - left) and 4 rows (bottom - top). This means that the rectangle
  /// would [clamp] the [Vec2] (4, 5) to (3, 4).
  ///
  /// The exception to this is when the rectangle has a width or height of zero, in which case it's
  /// impossible to clamp any vector within the bounds of the rectangle. In this case, a
  /// [StateError] will be thrown.
  Vec2 clamp(Vec2 point) {
    if (size.x == 0 || size.y == 0) {
      throw StateError('Cannot clamp a vector inside a Rect with width or height of 0');
    }

    var x = point.x.clamp(left, right - 1).toInt();
    var y = point.y.clamp(top, bottom - 1).toInt();
    return Vec2(x, y);
  }

  /// Returns the distance between this [Rect] and [other]. This is minimum
  /// length that a corridor would have to be to go from one Rect to the other.
  /// If the two Rects are adjacent, returns zero. If they overlap, returns -1.
  int distanceTo(Rect other) {
    int vertical;
    if (top >= other.bottom) {
      vertical = top - other.bottom;
    } else if (bottom <= other.top) {
      vertical = other.top - bottom;
    } else {
      vertical = -1;
    }

    int horizontal;
    if (left >= other.right) {
      horizontal = left - other.right;
    } else if (right <= other.left) {
      horizontal = other.left - right;
    } else {
      horizontal = -1;
    }

    if (vertical == -1 && horizontal == -1) return -1;
    if (vertical == -1) return horizontal;
    if (horizontal == -1) return vertical;
    return horizontal + vertical;
  }

  /// Returns true if [other] is another [Rect] that creates the same rectangle in 2D coordinate
  /// space as this rectangle (i.e., their [top], [right], [bottom], and [left] values are
  /// equivalent).
  @override
  bool operator ==(Object other) {
    if (other is! Rect) return false;

    return top == other.top && right == other.right && bottom == other.bottom && left == other.left;
  }

  @override
  int get hashCode => top.hashCode ^ right.hashCode ^ bottom.hashCode ^ left.hashCode;

  @override
  String toString() => 'rect($top, $right, $bottom, $left)';
}