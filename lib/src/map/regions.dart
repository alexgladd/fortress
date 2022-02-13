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

enum ConnectorType {
  normal,
  duplicate,
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

/// A connection between two regions
class Connector extends Tuple2<Vec2, ConnectorType> {
  Vec2 get position => first;
  ConnectorType get type => second;
  Connector(Vec2 position, ConnectorType type) : super(position, type);
}

/// Connects disparate regions within a [RegionMap] so that all regions are
/// interconnected.
class RegionConnector {
  static const testDirs = [Direction.n, Direction.s, Direction.e, Direction.w];
  final RegionMap _regionMap;
  final double _dupConnectionChance;

  /// Initialize a [RegionConnector] with the given [regions] map. The
  /// [extraConnectionChance] controls how often more than one connection will
  /// be opened between adjacent regions (0.0 == never, 1.0 == always). The
  /// default [extraConnectionChance] value represents a 1-in-50 chance.
  RegionConnector(RegionMap regions, [double extraConnectionChance = 0.02])
      : _regionMap = regions,
        _dupConnectionChance = extraConnectionChance;

  /// Carve connections in the region map until all regions are interconnected.
  /// Will open at least one connection between adjacent regions. Each value in
  /// the returned [Iterable] is one [Connector] that has been carved open.
  Iterable<Connector> carveConnections() sync* {
    var connections = _findConnections();
    var startRegion = rng.item(connections).region1;
    var connectedRegions = [startRegion];

    while (connections.isNotEmpty) {
      var carved = <_Connection>[];
      var result = <Connector>[];

      // pick a random connection to carve open
      var connsToMain = _findConnectionsToMain(connections, connectedRegions);
      var carvedConnection = rng.item(connsToMain);

      // if both regions are already connected, skip
      if (connectedRegions.contains(carvedConnection.region1) &&
          connectedRegions.contains(carvedConnection.region2)) {
        connections.remove(carvedConnection);
        continue;
      }

      // carve
      connsToMain.remove(carvedConnection);
      connections.remove(carvedConnection);
      carved.add(carvedConnection);
      result.add(Connector(carvedConnection.position, ConnectorType.normal));

      // remove all duplicate connections, with a chance to open up duplicates
      // that aren't nearby any other already opened ones
      var dupConnections = _findDuplicates(carvedConnection, connsToMain);
      for (var conn in dupConnections) {
        if (!_isNearby(conn, carved) && rng.rand() < _dupConnectionChance) {
          carved.add(conn);
          result.add(Connector(conn.position, ConnectorType.duplicate));
        }
        connections.remove(conn);
      }

      // mark regions as connected
      if (!connectedRegions.contains(carvedConnection.region1)) {
        connectedRegions.add(carvedConnection.region1);
      }
      if (!connectedRegions.contains(carvedConnection.region2)) {
        connectedRegions.add(carvedConnection.region2);
      }

      for (var c in result) {
        yield c;
      }
    }
  }

  /// Finds all of the regional connections in the region map. A regional
  /// connection is a position that doesn't belong to any region that has two
  /// adjacent positions of different regions.
  List<_Connection> _findConnections() {
    var conns = <_Connection>[];

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
            conns.add(_Connection(region, lastRegion!, pos));
            break;
          }
          // else same region
        }
      }
    }

    return conns;
  }

  List<_Connection> _findConnectionsToMain(
      List<_Connection> conns, List<int> main) {
    var ctm = <_Connection>[];
    for (var conn in conns) {
      if (main.contains(conn.region1) || main.contains(conn.region2)) {
        ctm.add(conn);
      }
    }
    return ctm;
  }

  /// Finds connections in the given list that connect the same two regions as
  /// the given connection.
  List<_Connection> _findDuplicates(
      _Connection conn, List<_Connection> connList) {
    var dups = <_Connection>[];
    for (var other in connList) {
      if (other.region1 == conn.region1 && other.region2 == conn.region2) {
        dups.add(other);
      }
    }
    return dups;
  }

  bool _isNearby(_Connection conn, List<_Connection> candidates) {
    for (var test in candidates) {
      var distance = conn.position - test.position;
      if (distance.lengthSquared <= 4) return true;
    }
    return false;
  }
}
