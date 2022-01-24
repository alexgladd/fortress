import 'vector.dart';

/// All standard compass directions that can be represented by "unit" vectors (ignoring the fact
/// that in an integer grid-based game, the intercardinal directions aren't true unit vectors). Also
/// includes a [none] direction for convenience.
enum CompassDirection {
  none,
  n,
  ne,
  e,
  se,
  s,
  sw,
  w,
  nw,
}

class Direction extends VectorBase {
  static const none = Direction(0, 0);
  static const n = Direction(0, -1);
  static const ne = Direction(1, -1);
  static const e = Direction(1, 0);
  static const se = Direction(1, 1);
  static const s = Direction(0, 1);
  static const sw = Direction(-1, 1);
  static const w = Direction(-1, 0);
  static const nw = Direction(-1, -1);

  /// Build a direction based on the given [CompassDirection].
  factory Direction.compass(CompassDirection direction) {
    switch (direction) {
      case CompassDirection.none:
        return Direction(0, 0);

      case CompassDirection.n:
        return Direction(0, -1);

      case CompassDirection.ne:
        return Direction(1, -1);

      case CompassDirection.e:
        return Direction(1, 0);

      case CompassDirection.se:
        return Direction(1, 1);

      case CompassDirection.s:
        return Direction(0, 1);

      case CompassDirection.sw:
        return Direction(-1, 1);

      case CompassDirection.w:
        return Direction(-1, 0);

      case CompassDirection.nw:
        return Direction(-1, -1);
    }
  }

  const Direction(int x, int y) : super(x, y);
}
