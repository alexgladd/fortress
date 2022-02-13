abstract class TileBase {
  /// true if the tile is open (generally, things can move through it)
  bool get isOpen;

  const TileBase();
}

/// The differenty types of [LevelTile]s available
enum LevelTileType {
  solid,
  room,
  corridor,
  connector,
  duplicateConnector,
}

/// Tile used when generating maps meant to be used for individual levels (e.g.,
/// dungeons or caverns).
class LevelTile extends TileBase {
  /// Solid ground/stone/rock; impassible
  static const solid = LevelTile(LevelTileType.solid, false);

  /// Part of a contiguous room or larger open space
  static const room = LevelTile(LevelTileType.room, true);

  /// Narrow space between two or more larger spaces (e.g., hallways between
  /// rooms)
  static const corridor = LevelTile(LevelTileType.corridor, true);

  /// Connection between two distinct regions (e.g., between a room and a
  /// corridor)
  static const connector = LevelTile(LevelTileType.connector, true);

  /// Duplicate connection between two distinct regions that have already been
  /// connected by a [connector].
  static const duplicateConnector =
      LevelTile(LevelTileType.duplicateConnector, true);

  final LevelTileType type;
  final bool _isOpen;

  @override
  bool get isOpen => _isOpen;

  const LevelTile(this.type, this._isOpen);
}
