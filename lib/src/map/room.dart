import 'dart:math' as math;

import 'maze.dart';

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

  @override
  bool operator ==(Object other) {
    if (other is Room) return bounds == other.bounds;
    return false;
  }

  @override
  int get hashCode => bounds.hashCode;

  @override
  String toString() => 'room($position, $size)';
}

/// Random [Room] generator
class RoomGenerator {
  final Rect _roomBounds;
  final double _maxAspect;
  final _widths = <int>[];
  final _heights = <int>[];

  /// Initialize a room generator to generate random rooms within a space of the
  /// given [width] and [height], with other tuning parameters:
  /// - Room size: [widthBounds] and [heightBounds]
  /// - Room shape: [maxAspect]
  ///
  /// Note that the [RoomGenerator] will ensure that the resulting rooms are
  /// placed at odd positions and have odd sizes (within the given constraints)
  /// so that the rooms will be aligned with corridors generated by the
  /// [MazeGenerator].
  RoomGenerator(int width, int height, RoomConstraint widthBounds,
      RoomConstraint heightBounds, double maxAspect)
      : _roomBounds = Rect.sides(1, width - 1, height - 1, 1),
        _maxAspect = maxAspect {
    // safety checks
    if (widthBounds.max < widthBounds.min ||
        heightBounds.max < heightBounds.min) {
      throw StateError('Room constraints have swapped min and max values: '
          'width $widthBounds height $heightBounds');
    }

    var minAspect = math.max(widthBounds.min, heightBounds.min) /
        math.min(widthBounds.min, heightBounds.min);
    if (minAspect > _maxAspect) {
      throw StateError(
          'Room constraints always produce an aspect ratio greater than '
          'configured max: width $widthBounds height $heightBounds');
    }

    // fill widths
    for (var w = widthBounds.min; w <= widthBounds.max; w++) {
      if (w % 2 == 1) _widths.add(w);
    }

    // fill heights
    for (var h = heightBounds.min; h <= heightBounds.max; h++) {
      if (h % 2 == 1) _heights.add(h);
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
    return Vec2(rng.item(_widths), rng.item(_heights));
  }

  Vec2 _randomRoomPos(Vec2 size) {
    var x = rng.rangeInclusive(_roomBounds.left, _roomBounds.right - size.x);
    var y = rng.rangeInclusive(_roomBounds.top, _roomBounds.bottom - size.y);

    if (x % 2 == 0) x--;
    if (y % 2 == 0) y--;

    return Vec2(x, y);
  }
}
