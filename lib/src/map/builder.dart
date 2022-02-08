import 'map.dart';
import 'tile.dart';

abstract class MapBuilder<T extends TileBase> {
  /// The [TileMap] that was built by this builder
  TileMap<T> get map;

  /// Build the map. Recommend that implementations use synchronous generators so that the building
  /// of complex maps can be driven incrementally by the game loop. For example: place one room at
  /// a time for a dungeon map. The string values emitted by the returned [Iterable] could be used
  /// to dynamically update a loading screen.
  Iterable<String> build();
}
