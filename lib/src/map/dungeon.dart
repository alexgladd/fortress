import 'package:fortress/src/map/maze.dart';

import 'builder.dart';
import 'dead_ends.dart';
import 'map.dart';
import 'regions.dart';
import 'room.dart';
import 'tile.dart';

/// Builds a dungeon map that consists of rooms connected by corridors, with
/// doors where the corridors meet the rooms.
class Dungeon extends MapBuilder<LevelTile> {
  final TileMap<LevelTile> _tileMap;
  final RegionMap _regions;
  final RoomGenerator _roomGen;
  final double _targetDensity;

  final _rooms = <Room>[];

  int _openedRoomTiles = 0;

  @override
  TileMap<LevelTile> get map => _tileMap;

  /// Get the regions of the dungeon
  RegionMap get regions => _regions;

  /// The list of rooms generated for this [Dungeon]
  List<Room> get rooms => _rooms.toList(growable: false);

  /// The density of open room tiles in the [Dungeon]
  double get roomDensity => _openedRoomTiles / _tileMap.totalTiles;

  Dungeon(int width, int height,
      {double targetDensity = 0.33,
      RoomConstraint roomWidths = const RoomConstraint(9, 15),
      RoomConstraint roomHeights = const RoomConstraint(5, 9),
      double maxAspectRatio = 3.0})
      : _tileMap = TileMap(width, height, LevelTile.solid),
        _regions = RegionMap(width, height),
        _roomGen = RoomGenerator(
            width, height, roomWidths, roomHeights, maxAspectRatio),
        _targetDensity = targetDensity;

  @override
  Iterable<String> build() sync* {
    // add rooms until we get to the target density or we fail too many times
    var failures = 0;
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
    var mazeGen = MazeGenerator(regions);
    var maze = mazeGen.nextMaze();
    while (maze.isNotEmpty) {
      for (var pos in maze) {
        _tileMap[pos] = LevelTile.corridor;
      }

      _regions.nextRegion();
      maze = mazeGen.nextMaze();
      yield 'Corridor';
    }

    // connect regions
    var connector = RegionConnector(regions);

    for (var conn in connector.carveConnections()) {
      if (conn.type == ConnectorType.duplicate) {
        _tileMap[conn.position] = LevelTile.duplicateConnector;
      } else {
        _tileMap[conn.position] = LevelTile.connector;
      }

      yield 'Connector';
    }

    // cull dead ends
    var culler = DeadEndCuller(map);
    for (var deadEnd in culler.cullDeadEnds()) {
      for (var pos in deadEnd) {
        _tileMap[pos] = LevelTile.solid;
      }

      yield 'Dead end';
    }
  }

  /// Places the room in the dungeon
  void _placeRoom(Room room) {
    for (var pos in room.bounds.getPoints()) {
      // update the tile map
      _tileMap[pos] = LevelTile.room;
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
