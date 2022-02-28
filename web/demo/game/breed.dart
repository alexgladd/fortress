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
      health: MinMax(5, 10),
      speed: MinMax(25, 34),
      disposition: Disposition.defensive);

  final String name;
  final String symbol;
  final String attackVerb;
  final Color color;
  final MinMax health;
  final MinMax speed;
  final LocationAffinity affinity;
  final Disposition disposition;

  const Breed({
    this.name = 'Unknown Breed',
    this.symbol = '?',
    this.attackVerb = 'attacks',
    this.color = Color.white,
    this.health = const MinMax(100, 100),
    this.speed = const MinMax(0, 100),
    this.affinity = LocationAffinity.none,
    this.disposition = Disposition.passive,
  });

  Monster create() {
    return Monster(
        this,
        AiController(
            affinity, disposition, rng.rangeInclusive(speed.min, speed.max)),
        rng.rangeInclusive(health.min, health.max));
  }
}
