import 'builder.dart';
import 'map.dart';
import 'tile.dart';

/// Very basic dungeon tile
class DungeonTile extends TileBase {
  static const wall = DungeonTile(false);
  static const room = DungeonTile(true);
  static const corridor = DungeonTile(true);
  static const door = DungeonTile(true);

  final bool _isOpen;

  @override
  bool get isWalkable => _isOpen;

  const DungeonTile(this._isOpen);
}

/// Builds a dungeon map that consists of rooms connected by corridors, with doors where the
/// corridors meet the rooms.
class Dungeon<T extends TileBase> extends MapBuilder<T> {
  final TileMap<T> _tileMap;
  final double _targetDensity;

  @override
  // TODO: implement map
  TileMap<T> get map => throw UnimplementedError();

  Dungeon(int width, int height,
      {required T wall,
      required T room,
      required T corridor,
      required T door,
      double density = 0.33,
      int minRoomSize = 5,
      int maxRoomSize = 9})
      : _tileMap = TileMap(width, height, wall),
        _targetDensity = density;

  @override
  Iterable<String> build() sync* {
    // TODO: implement build
    throw UnimplementedError();
  }
}
