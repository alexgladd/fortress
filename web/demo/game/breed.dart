import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'ai.dart';
import 'monster.dart';

class MinMax extends Tuple2<int, int> {
  int get min => first;
  int get max => second;
  const MinMax(int min, int max) : super(min, max);
}

class Breed {
  static const rat = Breed(
      name: 'Rat',
      symbol: 'r',
      attackVerb: 'bites',
      color: Color.gray,
      health: MinMax(5, 10));

  final String name;
  final String symbol;
  final String attackVerb;
  final Color color;
  final MinMax health;

  const Breed({
    this.name = 'Unknown Breed',
    this.symbol = '?',
    this.attackVerb = 'attacks',
    this.color = Color.white,
    this.health = const MinMax(100, 100),
  });

  Monster create() {
    return Monster(
        this, AiController(), rng.rangeInclusive(health.min, health.max));
  }
}
