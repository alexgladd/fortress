import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'ai.dart';
import 'combat.dart';
import 'monster.dart';

class MinMax extends Tuple2<int, int> {
  static const zero = MinMax(0, 0);

  int get min => first;
  int get max => second;
  int get value => rng.rangeInclusive(min, max);

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
    speed: MinMax(25, 34),
    attack: MinMax(2, 4),
    accuracy: MinMax(0, 4),
    dodge: MinMax(-4, -2),
    vision: MinMax.fixed(10),
    affinity: LocationAffinity.corridor,
    disposition: Disposition.defensive,
    intelligence: Intelligence.medium,
  );

  static const ghoul = Breed(
    name: 'Ghoul',
    symbol: 'g',
    attackVerb: 'bites',
    color: Color.green,
    health: MinMax(4, 6),
    speed: MinMax.fixed(10),
    attack: MinMax(3, 6),
    accuracy: MinMax(-4, 0),
    dodge: MinMax(-10, -8),
    vision: MinMax.fixed(6),
    disposition: Disposition.aggressive,
    intelligence: Intelligence.low,
  );

  static const imp = Breed(
    name: 'Imp',
    symbol: 'i',
    attackVerb: 'claws',
    color: Color.lightPurple,
    health: MinMax(6, 8),
    speed: MinMax.fixed(34),
    attack: MinMax(3, 6),
    accuracy: MinMax(0, 3),
    dodge: MinMax(-2, 0),
    vision: MinMax.fixed(10),
    disposition: Disposition.defensive,
    intelligence: Intelligence.medium,
  );

  static const lesserDemon = Breed(
    name: 'Lesser Demon',
    symbol: 'd',
    attackVerb: 'slashes',
    color: Color.lightRed,
    health: MinMax(10, 12),
    speed: MinMax(30, 40),
    attack: MinMax(5, 8),
    accuracy: MinMax(1, 4),
    vision: MinMax.fixed(10),
    disposition: Disposition.aggressive,
    intelligence: Intelligence.medium,
  );

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
  final MinMax vision;
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
    this.vision = MinMax.zero,
    this.affinity = LocationAffinity.none,
    this.disposition = Disposition.passive,
    this.intelligence = Intelligence.low,
  });

  Monster create() {
    return Monster(
        this,
        AiController(
            affinity, disposition, intelligence, speed.value, vision.value),
        health.value,
        CombatStats(
            attack: attack.value,
            defense: defense.value,
            accuracy: accuracy.value,
            dodge: dodge.value));
  }
}
