import 'dart:collection';

import 'tile.dart';
import '../web/char.dart';
import '../util/array.dart';
import '../util/vector.dart';

/// 2D array of tiles, most often used for representing a world or level map
class TileMap<T extends TileBase> extends IterableBase<T> {
  final Array2<T> _tiles;

  /// The width of the map in tiles
  int get width => _tiles.width;

  /// The height of the map in tiles
  int get height => _tiles.height;

  /// Iterate through all tiles in row-major order
  @override
  Iterator<T> get iterator => _tiles.iterator;

  /// Create a [TileMap] with the given [width] and [height], in tiles, filled with the given
  /// [initialValue].
  TileMap(int width, int height, T initialValue) : _tiles = Array2(width, height, initialValue);

  /// Get the tile at column [x] row [y]
  T get(int x, int y) => _tiles.get(x, y);

  /// Set the tile at column [x] row [y] to [value]. Returns the old tile at that position.
  T set(int x, int y, T value) => _tiles.set(x, y, value);

  /// Get the tile at the given [position]
  T operator [](Vec2 position) => _tiles[position];

  /// Set the tile at [position] to [value]
  void operator []=(Vec2 position, T value) => _tiles[position] = value;

  /// true if the tile at column [x] row [y] is walkable
  bool isWalkable(int x, int y) => get(x, y).isWalkable;
}
