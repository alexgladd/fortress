import 'regions.dart';
import '../util/direction.dart';
import '../util/rect.dart';
import '../util/rng.dart';
import '../util/vector.dart';

/// Random maze generator
class MazeGenerator {
  final RegionMap _regions;
  final Rect _bounds;

  /// Create a new [MazeGenerator] using the given [RegionMap]. Note that while
  /// generating mazes, the [MazeGenerator] will modify the given [RegionMap].
  /// Each distinct maze will be a separate region.
  MazeGenerator(this._regions)
      : _bounds = Rect.sides(1, _regions.width - 1, _regions.height - 1, 1);

  /// Generate the next maze. If successful, returns a list of points included
  /// in the generated maze. Returns an empty [List] if there is no space for
  /// another maze.
  List<Vec2> nextMaze() {
    var available = _collectUnvisited();

    if (available.isEmpty) {
      return [];
    } else {
      return _propagateMaze(rng.item(available));
    }
  }

  List<Vec2> _propagateMaze(Vec2 position) {
    var maze = [position];
    var dirIndex = rng.nextInt(4);

    _regions.visit(position);

    for (var i = 0; i < 4; i++) {
      var dir = Direction.cardinals[(dirIndex + i) % 4];
      var step = position + dir;
      var next = position + (dir * 2);

      if (_isInBounds(next) && _isUnvisited(next)) {
        _regions.visit(step);
        maze.add(step);
        maze.addAll(_propagateMaze(next));
      }
    }

    return maze;
  }

  List<Vec2> _collectUnvisited() {
    var unvisited = <Vec2>[];
    for (var pos in _bounds.getPoints()) {
      if (pos.x % 2 == 1 && pos.y % 2 == 1 && _isUnvisited(pos)) {
        unvisited.add(pos);
      }
    }
    return unvisited;
  }

  bool _isUnvisited(Vec2 pos) => !_regions.isVisited(pos);

  bool _isInBounds(Vec2 pos) => _bounds.contains(pos);
}
