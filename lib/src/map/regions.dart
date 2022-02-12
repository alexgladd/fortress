import '../util/array.dart';
import '../util/direction.dart';
import '../util/rng.dart';
import '../util/tuple.dart';
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

class _Connection {
  final Vec2 position;
  late final Tuple2<int, int> regions;

  int get region1 => regions.first;
  int get region2 => regions.second;

  _Connection(int firstRegion, int secondRegion, this.position) {
    if (firstRegion <= secondRegion) {
      regions = Tuple2(firstRegion, secondRegion);
    } else {
      regions = Tuple2(secondRegion, firstRegion);
    }
  }
}

/// Connects disparate regions within a [RegionMap] so that all regions are
/// interconnected.
class RegionConnector {
  static const testDirs = [Direction.n, Direction.s, Direction.e, Direction.w];
  final int _mainRegion;
  final RegionMap _regionMap;

  final _connectedRegions = <int>[];
  final _connections = <_Connection>[];
  // final _connectionsByRegion = <int, List<Vec2>>{};

  List<Vec2> get connections => _connections.map((e) => e.position).toList();

  RegionConnector(this._mainRegion, this._regionMap) {
    // for (var r = 0; r < _regionMap.regions; r++) {
    //   _connectionsByRegion[r] = [];
    // }
  }

  /// Carve connections in the region map until all regions are interconnected.
  /// Will open at least one connection between adjacent regions.
  Iterable<Vec2> carveConnections() sync* {
    for (var i = 0; i < _regionMap.regions; i++) {
      // get all connections for the current region, starting with the main one
      var regionId = (_mainRegion + i) % _regionMap.regions;
      var regionConnections = _connectionsForRegion(regionId);
      if (regionConnections.isEmpty) continue;

      // select a random connection to open
      var carved = <Vec2>[];
      var carvedConnection = rng.item(regionConnections);
      carved.add(carvedConnection.position);

      print('CONN carved ${carvedConnection.position}');

      // remove connection from lists
      regionConnections.remove(carvedConnection);
      _connections.remove(carvedConnection);

      // get all other connections that link the same regions
      var dupConnections = regionConnections.where((e) =>
          e.region1 == carvedConnection.region1 &&
          e.region2 == carvedConnection.region2);

      for (var dupConn in dupConnections) {
        // some small chance to carve valid duplicate connections up
        if (!_isNearby(dupConn.position, carved) && rng.oneIn(50)) {
          carved.add(dupConn.position);
          print('CONN dup carved ${dupConn.position}');
        }
        _connections.remove(dupConn);
      }

      // mark regions as merged
      _connectedRegions
          .addAll([carvedConnection.region1, carvedConnection.region2]);

      // need to rethink this!

      // var regConnected = _regionsForConnection(carved);
      // _connectedRegions.addAll(regConnected);

      // for (var r in regConnected) {
      //   _connectionsByRegion[r]!.
      // }

      for (var c in carved) {
        yield c;
      }
    }
  }

  /// Finds all of the regional connections in the region map. A regional
  /// connection is a position that doesn't belong to any region that has two
  /// adjacent positions of different regions.
  void findConnections() {
    for (var y = 1; y < _regionMap.height - 1; y++) {
      for (var x = 1; x < _regionMap.width - 1; x++) {
        var pos = Vec2(x, y);
        if (_regionMap.isVisited(pos)) continue;

        int? lastRegion;

        for (var dir in testDirs) {
          var region = _regionMap[pos + dir];
          if (lastRegion == null && region != null) {
            lastRegion = region;
          } else if (region != null && region != lastRegion) {
            // this is a connection!
            _connections.add(_Connection(region, lastRegion!, pos));
            // _connectionsByRegion[lastRegion]!.add(pos);
            // _connectionsByRegion[region]!.add(pos);
            break;
          }
          // else same region
        }
      }
    }
  }

  List<_Connection> _connectionsForRegion(int region) => _connections
      .where((e) => e.region1 == region || e.region2 == region)
      .toList();

  bool _isNearby(Vec2 position, List<Vec2> candidates) {
    for (var test in candidates) {
      var distance = position - test;
      if (distance.lengthSquared <= 4) return true;
    }
    return false;
  }

  // List<int> _regionsForConnection(Vec2 conn) {
  //   var regions = <int>[];
  //   for (var k in _connectionsByRegion.keys) {
  //     if (_connectionsByRegion[k]!.contains(conn)) regions.add(k);
  //   }
  //   return regions;
  // }
}
