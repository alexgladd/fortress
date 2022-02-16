import 'map.dart';
import '../util/direction.dart';
import '../util/rng.dart';
import '../util/vector.dart';

/// Finds and culls dead ends in a [TileMap]
class DeadEndCuller {
  final TileMap _tileMap;
  final double _keepChance;

  /// Initialize a [DeadEndCuller] that will find dead ends to cull in the given
  /// [tileMap]. The [keepChance] defines how often a dead end will be left in
  /// the map (0.0 == never, 1.0 == always). By default the [keepChance] is
  /// zero.
  DeadEndCuller(TileMap tileMap, [double keepChance = 0.0])
      : _tileMap = tileMap,
        _keepChance = keepChance;

  /// Cull deads ends in the [TileMap] one at a time until all of the dead ends
  /// have been removed (except ones that are left based on the configured
  /// keep chance). Each value in the returned [Iterable] represents a list of
  /// [Vec2] points in one culled dead end.
  Iterable<List<Vec2>> cullDeadEnds() sync* {
    var deadEnds = _findDeadEnds();

    // for each dead end cull all points until we reach a non dead-end
    for (var deadEnd in deadEnds) {
      yield _collectDeadEnd(deadEnd);
    }
  }

  List<Vec2> _collectDeadEnd(Vec2 start, [Vec2? previous]) {
    var deadEndPoints = [start];
    for (var dir in Direction.cardinals) {
      var next = start + dir;
      // don't backtrack
      if (previous != null && next == previous) continue;

      if (_tileMap.isOpen(next.x, next.y) &&
          _tileMap.countClosedNeighbors(next.x, next.y) >= 2 &&
          rng.rand() >= _keepChance) {
        // keep following
        deadEndPoints.addAll(_collectDeadEnd(next, start));
      }
    }
    return deadEndPoints;
  }

  List<Vec2> _findDeadEnds() {
    var deadEnds = <Vec2>[];

    for (var pos in _tileMap.bounds.getPoints()) {
      if (_tileMap.isOpen(pos.x, pos.y) &&
          _tileMap.countClosedNeighbors(pos.x, pos.y) >= 3) {
        deadEnds.add(pos);
      }
    }

    return deadEnds;
  }
}
