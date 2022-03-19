import 'package:fortress/map.dart';
import 'package:fortress/util.dart';

import 'item.dart';
import 'level_gen.dart';
import 'monster.dart';

class Level {
  final LevelGenData _lvlData;

  final int level;
  final Vec2 size;
  final monsters = <Monster>[];
  final items = <GameItem>[];

  bool _built = false;
  TileMap<LevelTile>? _map;
  Vec2 _startPosition = Vec2.zero;
  Vec2 _endPosition = Vec2.zero;
  Room _startRoom = Room(Rect.nill);
  Room _endRoom = Room(Rect.nill);

  /// True if the level has finished building
  bool get isBuilt => _built;

  /// The starting position for the hero for this level
  Vec2 get startPosition => _startPosition;

  /// The ending position (e.g., stairs to next level) for the hero for this
  /// level
  Vec2 get endPosition => _endPosition;

  /// The starting room for the hero for this level
  Room get startRoom => _startRoom;

  /// The ending room for the hero for this level (where the level goal is)
  Room get endRoom => _endRoom;

  /// Get the [TileMap] for the level. Throws a [StateError] if the level hasn't
  /// been built yet (see [build]).
  TileMap<LevelTile> get map {
    if (_built && _map != null) return _map!;
    throw StateError('Level has not been built');
  }

  Level(int width, int height, this.level)
      : _lvlData = LevelGeneration.getLevelData(level),
        size = Vec2(width, height);

  /// Build the level
  Iterable<String> build() sync* {
    yield 'Building map...';

    // build the dungeon
    var mapBuilder =
        Dungeon(size.x, size.y, targetDensity: (rng.rand() * 0.5) + 0.25);

    for (var step in mapBuilder.build()) {
      yield 'Building map ${step.toLowerCase()}s...';
    }

    _map = mapBuilder.map;
    var rooms = mapBuilder.rooms;

    // select start and end rooms
    yield 'Setting start and end positions...';
    _startRoom = rng.item(rooms);
    _startPosition = _randomRoomPosition(startRoom);

    _endRoom = _findFarthestRoom(startRoom, rooms);
    _endPosition = _randomRoomPosition(endRoom);

    // spawn monsters
    yield 'Spawning monsters...';
    _placeMonsters(rooms);

    // place items
    yield 'Placing items...';
    _placeItems(rooms);

    // etc.

    _built = true;

    yield 'Done!';
  }

  /// True if the given [position] is walkable in the [map]
  bool isWalkable(Vec2 position) => map.isOpen(position.x, position.y);

  /// True if an actor at [from] has line-of-sight to an actor at [to],
  /// considering the [map] layout.
  bool hasLos(Vec2 from, Vec2 to) {
    var losLine = Line(from, to);
    for (var pos in losLine) {
      if (!isWalkable(pos)) return false;
    }
    return true;
  }

  @override
  String toString() =>
      'Level(width: ${size.x}, height: ${size.y}, built: $_built)';

  Vec2 _randomRoomPosition(Room room) {
    var inset = room.bounds.shrink(1);
    return rng.item(inset.getPoints());
  }

  Room _findFarthestRoom(Room startRoom, List<Room> rooms) {
    if (rooms.length == 1) return rooms[0];

    Room farthest = rooms[0];
    var fDistance = startRoom.bounds.distanceTo(farthest.bounds);
    for (var i = 1; i < rooms.length; i++) {
      if (rooms[i].bounds == startRoom.bounds) continue;

      var distance = startRoom.bounds.distanceTo(rooms[i].bounds);
      if (distance > fDistance) {
        fDistance = distance;
        farthest = rooms[i];
      }
    }

    return farthest;
  }

  void _placeMonsters(List<Room> rooms) {
    final startRoomPoints = startRoom.bounds.getPoints()..remove(startPosition);
    final endRoomPoints = endRoom.bounds.getPoints()..remove(endPosition);

    // randomly-placed monsters
    for (var room in rooms) {
      if (room == startRoom) continue;

      var roomPositions = room.bounds.getPoints();
      if (room == endRoom) {
        roomPositions = endRoomPoints;
      }

      for (var breed in _lvlData.roomMonsters.keys) {
        if (rng.percent(_lvlData.roomMonsters[breed]!)) {
          var pos = rng.item(roomPositions);
          roomPositions.remove(pos);

          final monster = breed.create();
          monster.position = pos;
          monsters.add(monster);
        }
      }
    }

    // placed monsters
    for (var placedMonster in _lvlData.placedMonsters) {
      List<Vec2> positions;

      switch (placedMonster.placement) {
        case LevelPlacement.startRoom:
          positions = startRoomPoints;
          break;
        case LevelPlacement.endRoom:
          positions = endRoomPoints;
          break;
      }

      final pos = rng.item(positions);
      final monster = placedMonster.breed.create();

      monster.position = pos;
      monsters.add(monster);
      positions.remove(pos);
    }
  }

  void _placeItems(List<Room> rooms) {
    final startRoomPoints = startRoom.bounds.getPoints()..remove(startPosition);
    final endRoomPoints = endRoom.bounds.getPoints()..remove(endPosition);

    // randomly-placed items
    for (var room in rooms) {
      List<Vec2> roomPositions;
      if (room == startRoom) {
        roomPositions = startRoomPoints;
      } else if (room == endRoom) {
        roomPositions = endRoomPoints;
      } else {
        roomPositions = room.bounds.getPoints();
      }

      for (var item in _lvlData.roomItems.keys) {
        if (rng.percent(_lvlData.roomItems[item]!)) {
          var pos = rng.item(roomPositions);
          roomPositions.remove(pos);

          final gameItem = item.create();
          gameItem.position = pos;
          items.add(gameItem);
        }
      }
    }

    // placed items
    for (var placedItem in _lvlData.placedItems) {
      List<Vec2> positions;

      switch (placedItem.placement) {
        case LevelPlacement.startRoom:
          positions = startRoomPoints;
          break;
        case LevelPlacement.endRoom:
          positions = endRoomPoints;
          break;
      }

      final pos = rng.item(positions);
      final gItem = placedItem.item.create();

      gItem.position = pos;
      items.add(gItem);
      positions.remove(pos);
    }
  }
}
