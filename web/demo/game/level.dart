import 'package:fortress/map.dart';
import 'package:fortress/util.dart';

class Level {
  var _built = false;
  TileMap<LevelTile>? _map;
  Vec2 _startPosition = Vec2.zero;
  Vec2 _endPosition = Vec2.zero;

  final int level;
  final Vec2 size;

  /// True if the level has finished building
  bool get isBuilt => _built;

  /// The starting position for the hero for this level
  Vec2 get startPosition => _startPosition;

  /// The ending position (e.g., stairs to next level) for the hero for this
  /// level
  Vec2 get endPosition => _endPosition;

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

    // select start and end rooms
    yield 'Setting start and end positions...';
    var rooms = mapBuilder.rooms;
    var startRoom = rng.item(rooms);
    _startPosition = _randomRoomPosition(startRoom);

    var endRoom = _findFarthestRoom(startRoom, rooms);
    _endPosition = _randomRoomPosition(endRoom);

    // monsters

    // items

    // etc.

    _map = mapBuilder.map;
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
}
