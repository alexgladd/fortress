import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'ai.dart';
import 'monster.dart';

class MinMax extends Tuple2<int, int> {
  static const zero = MinMax(0, 0);

  int get min => first;
  int get max => second;
  const MinMax.fixed(int value) : super(value, value);
  const MinMax(int min, int max) : super(min, max);
}

class Breed {
  static const rat = Breed(
      name: 'Rat',
      symbol: 'r',
      attackVerb: 'bites',
      color: Color.gray,
      health: MinMax(2, 4),
      speed: MinMax(25, 25),
      disposition: Disposition.defensive,
      intelligence: Intelligence.medium);

  final String name;
  final String symbol;
  final String attackVerb;
  final Color color;
  final MinMax health;
  final MinMax speed;
  final MinMax attack;
  final MinMax defense;
  final MinMax accuracy;
  final MinMax dodge;
  final LocationAffinity affinity;
  final Disposition disposition;
  final Intelligence intelligence;

  const Breed({
    this.name = 'Unknown Breed',
    this.symbol = '?',
    this.attackVerb = 'attacks',
    this.color = Color.white,
    this.health = const MinMax.fixed(100),
    this.speed = const MinMax.fixed(10),
    this.attack = const MinMax.fixed(1),
    this.defense = MinMax.zero,
    this.accuracy = MinMax.zero,
    this.dodge = MinMax.zero,
    this.affinity = LocationAffinity.none,
    this.disposition = Disposition.passive,
    this.intelligence = Intelligence.low,
  });

  Monster create() {
    return Monster(
        this,
        AiController(affinity, disposition, intelligence,
            rng.rangeInclusive(speed.min, speed.max)),
        rng.rangeInclusive(health.min, health.max));
  }
}
