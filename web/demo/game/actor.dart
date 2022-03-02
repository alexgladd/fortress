import 'package:fortress/engine.dart';

import 'combat.dart';
import 'game.dart';
import 'turn_based.dart';

/// Health for an [Actor]
class Health extends Component {
  int max;
  int current;

  bool get isDead => current <= 0;

  double get health => current / max;

  Health(this.current, this.max);

  void heal(int amount) => current += amount;

  void damage(int amount) => current -= amount;
}

/// An game object that takes turn-based actions with health
abstract class Actor extends TurnBasedObject {
  /// Reference to health component
  final Health health;

  /// Combat stats
  final CombatStats stats;

  Actor? lastAttacker;

  /// Roll a hit chance, taking into account the actor's [CombatStats.accuracy]
  int get hitChance => game.roll.chance(stats.accuracy);

  /// Roll a dodge chance, taking into account the actor's [CombatStats.dodge]
  int get dodgeChance => game.roll.chance(stats.dodge);

  /// Roll for attack using the actor's [CombatStats.attack] roll
  int get attackPower => game.roll.dN(stats.attack);

  /// Roll for defense using the actor's [CombatStats.defense] roll
  int get defensePower => game.roll.dN(stats.defense);

  /// The actor represented as the subject of a sentence
  String get subject => 'The actor';

  /// How to represent the actor's attacks as a conjugated verb
  String get attackVerb => 'attacks';

  /// How to represent the actor's misses as a conjugated verb
  String get missVerb => 'misses';

  Actor(TurnController turnController,
      {int? health,
      int maxHealth = 100,
      int? attack,
      int? defense,
      int? dodge,
      int? accuracy})
      : health = Health(health ?? maxHealth, maxHealth),
        stats = CombatStats(
            attack: attack, accuracy: accuracy, dodge: dodge, defense: defense),
        super(turnController) {
    add(this.health);
  }

  @override
  String toString() => 'Actor($id)';
}
