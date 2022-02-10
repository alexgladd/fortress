import 'dart:math' as math;

import '../util/rect.dart';
import '../util/rng.dart';
import '../util/tuple.dart';
import '../util/vector.dart';

/// Data model for constraining the dimensions of [Room]s
class RoomConstraint extends Tuple2<int, int> {
  int get min => first;
  int get max => second;

  const RoomConstraint(int min, int max) : super(min, max);

  @override
  String toString() => 'roomConstraint(min: $min, max: $max)';
}

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
  final Rect _roomBounds;
  final RoomConstraint _widthBounds;
  final RoomConstraint _heightBounds;
  final double _maxAspect;

  /// Initialize a room generator to generate random rooms within a space of the
  /// given [width] and [height], with other tuning parameters:
  /// - Room size: [widthBounds] and [heightBounds]
  /// - Room shape: [maxAspect]
  RoomGenerator(int width, int height, RoomConstraint widthBounds,
      RoomConstraint heightBounds, double maxAspect)
      : _roomBounds = Rect.sides(1, width - 1, height - 1, 1),
        _widthBounds = widthBounds,
        _heightBounds = heightBounds,
        _maxAspect = maxAspect {
    // safety checks
    if (_widthBounds.max < _widthBounds.min ||
        _heightBounds.max < _heightBounds.min) {
      throw StateError('Room constraints have swapped min and max values: '
          'width $_widthBounds height $_heightBounds');
    }

    var minAspect = math.max(_widthBounds.min, _heightBounds.min) /
        math.min(_widthBounds.min, _heightBounds.min);
    if (minAspect > _maxAspect) {
      throw StateError(
          'Room constraints always produce an aspect ratio greater than '
          'configured max: width $_widthBounds height $_heightBounds');
    }
  }

  /// Iterate through a sequence of random rooms generated within the configured
  /// constraints
  Iterable<Room> rooms() sync* {
    yield nextRoom();
  }

  /// Generate on random room within the configured constraints
  Room nextRoom() {
    // get an acceptable room size
    var roomSize = _randomRoomSize();
    while (roomSize.aspectRatio > _maxAspect) {
      roomSize = _randomRoomSize();
    }

    var roomPos = _randomRoomPos(roomSize);

    return Room(Rect(roomPos, roomSize));
  }

  Vec2 _randomRoomSize() {
    return Vec2(rng.rangeInclusive(_widthBounds.min, _widthBounds.max),
        rng.rangeInclusive(_heightBounds.min, _heightBounds.max));
  }

  Vec2 _randomRoomPos(Vec2 size) {
    return Vec2(
        rng.rangeInclusive(_roomBounds.left, _roomBounds.right - size.x),
        rng.rangeInclusive(_roomBounds.top, _roomBounds.bottom - size.y));
  }
}
