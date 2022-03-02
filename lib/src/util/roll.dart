import 'rng.dart' show Rng;

class Roll {
  static const criticalSuccess = 999;
  static const criticalFailure = 0;

  final Rng _rng;

  Roll([int? seed]) : _rng = Rng(seed ?? DateTime.now().millisecondsSinceEpoch);

  /// The most generic roll. Rolls an [m]-sided die [n] times and returns the
  /// sum of the rolls. Returns 0 if [m] or [n] are less than 1.
  int nDM(int n, int m) {
    if (n < 1 || m < 1) return 0;

    var result = 0;

    for (var i = 0; i < n; i++) {
      result += _rng.rangeInclusive(1, m);
    }

    return result;
  }

  /// Rolls an [n]-sided die and returns the result
  int dN(int n) => nDM(1, n);

  /// Rolls a d20 and returns the result
  int d20() => nDM(1, 20);

  /// Rolls a d20 and applies the given [bonus]. Rolling a natural 20 returns
  /// [criticalSuccess] and rolling a natural 1 returns [criticalFailure]. The
  /// result is always clamped between 0 and 20 (inclusive).
  int chance([int bonus = 0]) {
    var roll = d20();

    if (roll == 20) return Roll.criticalSuccess;
    if (roll == 1) return Roll.criticalFailure;

    return (roll + bonus).clamp(0, 20);
  }
}
