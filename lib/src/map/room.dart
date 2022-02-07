import '../util/rect.dart';
import '../util/rng.dart';
import '../util/vector.dart';

/// Rectangular room
class Room {
  final Rect bounds;

  Vec2 get position => bounds.position;
  Vec2 get size => bounds.size;
  int get x => bounds.position.x;
  int get y => bounds.position.y;
  int get width => bounds.width;
  int get height => bounds.height;
  double get aspectRatio => bounds.aspectRatio;

  const Room(this.bounds);
}

/// Random [Room] generator
class RoomGenerator {
  final Vec2 _mapSize;
  final int _minSize;
  final int _maxSize;
  final double _maxAspect;

  int get mapWidth => _mapSize.x;
  int get mapHeight => _mapSize.y;

  /// Initialize a room generator to generate random rooms within a space of the given [width] and
  /// [height], with other optional tuning parameters.
  /// - Room size: [minSize] and [maxSize]
  /// - Room shape: [maxAspect]
  RoomGenerator(int width, int height, int minSize, int maxSize, double maxAspect)
      : _mapSize = Vec2(width, height),
        _minSize = minSize,
        _maxSize = maxSize,
        _maxAspect = maxAspect;

  /// Iterate through a sequence of random rooms generated within the configured constraints
  Iterable<Room> rooms() sync* {
    yield nextRoom();
  }

  /// Generate on random room within the configured constraints
  Room nextRoom() {
    // safety checking
    var chkAspect = _maxSize / _minSize;
    if (chkAspect < 0.0) {
      throw StateError('Min room size is less than max room size (min: $_minSize, max: $_maxSize)');
    } else if (chkAspect > _maxAspect) {
      throw StateError('Min and max room size produce an aspect ratio greater than configured max');
    }

    // get an acceptable room size
    var roomSize = _randomRoomSize();
    while (roomSize.aspectRatio > _maxAspect) {
      roomSize = _randomRoomSize();
    }

    var roomPos = _randomRoomPos(roomSize);

    return Room(Rect(roomPos, roomSize));
  }

  Vec2 _randomRoomSize() {
    return Vec2(rng.rangeInclusive(_minSize, _maxSize), rng.rangeInclusive(_minSize, _maxSize));
  }

  Vec2 _randomRoomPos(Vec2 size) {
    return Vec2(rng.rangeInclusive(1, mapWidth - size.x - 1),
        rng.rangeInclusive(1, mapHeight - size.y - 1));
  }
}
