import 'package:fortress/map.dart';
import 'package:fortress/util.dart';

import 'breed.dart';
import 'monster.dart';

class Level {
  bool _built = false;
  TileMap<LevelTile>? _map;
  Vec2 _startPosition = Vec2.zero;
  Vec2 _endPosition = Vec2.zero;
  Room _startRoom = Room(Rect.nill);
  Room _endRoom = Room(Rect.nill);

  final int level;
  final Vec2 size;
  final monsters = <Monster>[];

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

  Level(int width, int height, this.level) : size = Vec2(width, height);

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

    // items

    // etc.

    _built = true;

    yield 'Done!';
  }

  /// True if the given [position] is walkable in the [map]
  bool isWalkable(Vec2 position) => map[position].isOpen;

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
    for (var room in rooms) {
      if (room == startRoom) continue;

      var pos = rng.item(room.bounds.getPoints());
      var monster = Breed.rat.create();
      monster.position = pos;

      monsters.add(monster);
    }
  }
}
