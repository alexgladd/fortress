import 'package:fortress/map.dart';
import 'package:fortress/util.dart';

class Level {
  var _built = false;
  TileMap<LevelTile>? _map;

  final int level;
  final Vec2 size;

  /// True if the level has finished building
  bool get isBuilt => _built;

  /// Get the [TileMap] for the level. Throws a [StateError] if the level hasn't
  /// been built yet (see [build]).
  TileMap<LevelTile> get map {
    if (_map != null) return _map!;
    throw StateError('Level has not been built');
  }

  Level(int width, int height, this.level) : size = Vec2(width, height);

  /// Build the level
  Iterable<String> build() sync* {
    // build the dungeon
    var mapBuilder =
        Dungeon(size.x, size.y, targetDensity: (rng.rand() * 0.5) + 0.5);

    for (var step in mapBuilder.build()) {
      yield 'Building map ${step.toLowerCase()}s...';
    }

    // start and end rooms

    // monsters

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
}
