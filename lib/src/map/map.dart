import 'dart:collection';

import 'tile.dart';
import '../util/array.dart';
import '../util/direction.dart';
import '../util/rect.dart';
import '../util/vector.dart';

/// 2D array of tiles, most often used for representing a level (see
/// [LevelTile]) or world map.
class TileMap<T extends TileBase> extends IterableBase<T> {
  final Array2<T> _tiles;

  /// The width of the map in tiles
  int get width => _tiles.width;

  /// The height of the map in tiles
  int get height => _tiles.height;

  /// The bounds of the map as a [Rect]
  Rect get bounds => _tiles.bounds;

  /// Total number of tiles in the map
  int get totalTiles => width * height;

  /// Iterate through all tiles in row-major order
  @override
  Iterator<T> get iterator => _tiles.iterator;

  /// Create a [TileMap] with the given [width] and [height], in tiles, filled
  /// with the given [initialValue].
  TileMap(int width, int height, T initialValue)
      : _tiles = Array2(width, height, initialValue);

  /// Get the tile at column [x] row [y]
  T get(int x, int y) => _tiles.get(x, y);

  /// Set the tile at column [x] row [y] to [value]. Returns the old tile at
  /// that position.
  T set(int x, int y, T value) => _tiles.set(x, y, value);

  /// Get the tile at the given [position]
  T operator [](Vec2 position) => _tiles[position];

  /// Set the tile at [position] to [value]
  void operator []=(Vec2 position, T value) => _tiles[position] = value;

  /// true if the tile at column [x] row [y] is a valid position and is open
  bool isOpen(int x, int y) {
    if (_tiles.isValid(Vec2(x, y))) {
      return get(x, y).isOpen;
    } else {
      return false;
    }
  }

  /// Get all of the cardinal neighbors of the tile at column [x] row [y].
  List<T> neighbors(int x, int y) {
    var neighbors = <T>[];
    var start = Vec2(x, y);

    for (var d in Direction.cardinals) {
      var neigbor = start + d;
      if (_tiles.isValid(neigbor)) {
        neighbors.add(this[neigbor]);
      }
    }

    return neighbors;
  }

  /// The number of cardinal neighbors of the tile at column [x] row [y]
  int countNeighbors(int x, int y) => neighbors(x, y).length;

  /// The number of cardinal neighbors of the tile at column [x] row [y] that
  /// are open
  int countOpenNeighbors(int x, int y) {
    int count = 0;
    for (var n in neighbors(x, y)) {
      if (n.isOpen) count++;
    }
    return count;
  }

  /// The number of cardinal neighbors of the tile at column [x] row [y] that
  /// are closed (not open)
  int countClosedNeighbors(int x, int y) {
    int count = 0;
    for (var n in neighbors(x, y)) {
      if (!n.isOpen) count++;
    }
    return count;
  }
}
