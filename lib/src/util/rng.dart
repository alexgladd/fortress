import 'dart:math' as math;

/// Globally available random number generator; uses a new seed each startup
final rng = Rng(DateTime.now().millisecondsSinceEpoch);

class Rng {
  final math.Random _random;

  Rng(int seed) : _random = math.Random(seed);

  /// Get a traditional random number, from 0.0 inclusive to 1.0 exclusive
  double rand() => _random.nextDouble();

  /// Get a random number between 0 inclusive and [max] exclusive
  T next<T extends num>(T max) {
    if (T is int) return nextInt(max as int) as T;
    if (T is double) return nextDouble(max as double) as T;
    return max;
  }

  /// Get a random integer between 0 inclusive and [max] exclusive
  int nextInt(int max) => _random.nextInt(max);

  /// Get a random floating point number between 0.0 inclusive and [max] exclusive
  double nextDouble(double max) => _random.nextDouble() * max;

  /// Get a random boolean value
  bool nextBool() => _random.nextBool();

  /// Returns true [chance] percent of the time
  bool percent(int chance) => nextInt(100) < chance;

  /// Return a random item from the list of [items]
  T item<T>(List<T> items) => items[nextInt(items.length)];
}
