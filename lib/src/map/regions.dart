import '../util/array.dart';
import '../util/vector.dart';

/// Helper for keeping track of visited regions for map building
class RegionMap {
  final Array2<int?> _regionMap;

  var _currentRegion = 0;
  var _usedRegions = 0;

  /// The current region value that will be used when calling [visit]
  int get currentRegion => _currentRegion;

  /// The total number of regions currently in the map
  int get regions => _usedRegions;

  /// Width of the region map
  int get width => _regionMap.width;

  /// Height of the region map
  int get height => _regionMap.height;

  /// Create a new [RegionMap] with the given [width] and [height]
  RegionMap(int width, int height) : _regionMap = Array2(width, height, null);

  /// Increment to the next region
  void nextRegion() => _currentRegion++;

  /// Mark the given [position] as visited as part of the [currentRegion]
  void visit(Vec2 position) {
    _regionMap[position] = currentRegion;

    if (currentRegion + 1 > regions) _usedRegions = currentRegion + 1;
  }

  /// true if the given [position] has a non-null region value
  bool isVisited(Vec2 position) => this[position] != null;

  /// Reset the region map to all unvisited
  void reset() {
    _currentRegion = 0;
    _regionMap.fill(null);
  }

  /// Get the region value at the given [position]
  int? operator [](Vec2 position) => _regionMap[position];
}
