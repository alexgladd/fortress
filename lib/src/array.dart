// 2D array utilities

import 'dart:collection';

import 'util/vector.dart';

/// A 2D fixed-size array of elements of type [T]
///
/// This class mirrors conceptual game graphics where the horizontal component is indexed before
/// the vertical component
class Array2<T> extends IterableBase<T> {
  final Vec2 _size;
  final List<T> _elements;

  Array2(int width, int height, T value)
      : _size = Vec2(width, height),
        _elements = List<T>.filled(width * height, value);

  int get width => _size.x;
  int get height => _size.y;
  Vec2 get size => _size;

  @override
  Iterator<T> get iterator => _elements.iterator;

  /// Gets the element at position [x], [y]
  T get(int x, int y) {
    _checkIndex(x, y);
    return _elements[y * width + x];
  }

  /// Sets the element at position [x], [y] to [value].
  /// Returns the old value at the same position
  T set(int x, int y, T value) {
    _checkIndex(x, y);
    var oldValue = _elements[y * width + x];
    _elements[y * width + x] = value;
    return oldValue;
  }

  /// Sets every element in the array to [value]
  void fill(T value) {
    _elements.fillRange(0, _elements.length, value);
  }

  /// Gets the element at [position]
  T operator [](Vec2 position) => get(position.x, position.y);

  /// Sets the element at [position] to [value]
  void operator []=(Vec2 position, T value) => set(position.x, position.y, value);

  /// Throws a [RangeError] if either of the given array indices are out of range
  void _checkIndex(int x, int y) {
    if (x < 0 || x >= width) throw RangeError.range(x, 0, width - 1);
    if (y < 0 || y >= height) throw RangeError.range(y, 0, height - 1);
  }
}
