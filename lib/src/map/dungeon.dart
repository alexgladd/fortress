import 'package:fortress/src/map/maze.dart';

import 'builder.dart';
import 'map.dart';
import 'regions.dart';
import 'room.dart';
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

enum _DungeonTile {
  wall,
  room,
  corridor,
  door,
}

/// Builds a dungeon map that consists of rooms connected by corridors, with
/// doors where the corridors meet the rooms.
class Dungeon<T extends TileBase> extends MapBuilder<T> {
  final TileMap<T> _tileMap;
  final RegionMap _regions;
  final Map<_DungeonTile, T> _tilePalette;
  final RoomGenerator _roomGen;
  final double _targetDensity;

  final _rooms = <Room>[];

  int _openedRoomTiles = 0;

  @override
  TileMap<T> get map => _tileMap;

  /// Get the regions of the dungeon
  RegionMap get regions => _regions;

  /// The list of rooms generated for this [Dungeon]
  List<Room> get rooms => _rooms.toList(growable: false);

  /// The density of open room tiles in the [Dungeon]
  double get roomDensity => _openedRoomTiles / _tileMap.totalTiles;

  Dungeon(int width, int height,
      {required T wall,
      required T room,
      required T corridor,
      required T door,
      double targetDensity = 0.33,
      RoomConstraint roomWidths = const RoomConstraint(9, 15),
      RoomConstraint roomHeights = const RoomConstraint(5, 9),
      double maxAspectRatio = 3.0})
      : _tileMap = TileMap(width, height, wall),
        _regions = RegionMap(width, height),
        _roomGen = RoomGenerator(
            width, height, roomWidths, roomHeights, maxAspectRatio),
        _tilePalette = {
          _DungeonTile.wall: wall,
          _DungeonTile.room: room,
          _DungeonTile.corridor: corridor,
          _DungeonTile.door: door
        },
        _targetDensity = targetDensity;

  @override
  Iterable<String> build() sync* {
    var mazeGen = MazeGenerator(regions);
    var failures = 0;

    // add rooms until we get to the target density or we fail too many times
    while (roomDensity < _targetDensity && failures < 100) {
      var room = _roomGen.nextRoom();

      if (_canPlaceRoom(room)) {
        _placeRoom(room);
        failures = 0;
        _regions.nextRegion();
        yield 'Room';
      } else {
        failures++;
      }
    }

    // fill the remaining open area with mazes
    var maze = mazeGen.nextMaze();
    while (maze.isNotEmpty) {
      for (var pos in maze) {
        _tileMap[pos] = _tilePalette[_DungeonTile.corridor]!;
      }

      _regions.nextRegion();
      maze = mazeGen.nextMaze();
      yield 'Corridor';
    }

    // TODO: connect regions

    // TODO: cull dead ends
  }

  /// Places the room in the dungeon
  void _placeRoom(Room room) {
    for (var pos in room.bounds.getPoints()) {
      // update the tile map
      _tileMap[pos] = _tilePalette[_DungeonTile.room]!;
      // update the region map
      _regions.visit(pos);
    }

    _rooms.add(room);
    _openedRoomTiles += room.bounds.absArea;
  }

  /// Returns true if the given [room] can be placed so that it's at least one
  /// tile away from all other placed rooms.
  bool _canPlaceRoom(Room room) {
    for (var placedRoom in _rooms) {
      if (placedRoom.bounds.distanceTo(room.bounds) < 1) return false;
    }

    return true;
  }
}
