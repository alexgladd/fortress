import 'package:fortress/engine.dart';

import 'combat.dart';
import 'effect.dart';
import 'game.dart';
import 'turn_based.dart';

/// Health for an [Actor]
class Health extends Component {
  int max;
  int current;

  bool get isDead => current <= 0;

  double get health => current / max;

  Health(this.current, this.max);

  void heal(int amount) => current = (current + amount).clamp(current, max);

  void damage(int amount) => current = (current - amount).clamp(0, max);

  void buff(int amount) {
    max += amount;
    if (max < 0) max = 0;
  }

  void nerf(int amount) {
    max -= amount;
    if (max < 0) max = 0;

    if (current > max) current = max;
  }
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
      {int maxHealth = 100, int? health, CombatStats? stats})
      : health = Health(health ?? maxHealth, maxHealth),
        stats = stats ?? CombatStats(),
        super(turnController) {
    add(this.health);
  }

  /// Apply the given [effect]
  void apply(Effect effect) => effect.doEffect(this);

  /// Remove the given [effect]
  void undo(Effect effect) => effect.undoEffect(this);

  /// Called when the actor is dying; just before it gets removed from the ECS
  void onDeath() {
    if (lastAttacker != null) {
      game.log.combat('${lastAttacker!.subject} kill ${subject.toLowerCase()}');
    } else {
      game.log.combat('$subject dies');
    }
  }

  @override
  String toString() => 'Actor($id)';
}

/// Collects dead [Actor]s. Default [System.priority] of 5000.
class ActorDeathSystem extends System<Health> {
  final _dead = <Actor>[];

  @override
  int get priority => 5000;

  List<Actor> get deadActors => _dead;

  @override
  void update(double ds) {
    _dead.clear();

    for (var health in components) {
      if (health.isDead && health.gameObject is Actor) {
        _dead.add(health.gameObject as Actor);
      }
    }
  }
}
