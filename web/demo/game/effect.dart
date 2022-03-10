import 'actor.dart';

/// An effect that can be applied to to an [Actor]
abstract class Effect {
  const Effect();

  /// Apply the effect to the [actor]
  void doEffect(Actor actor);

  /// Reverse the effect on the [actor]
  void undoEffect(Actor actor);
}

class HealEffect extends Effect {
  final int healAmount;

  const HealEffect(this.healAmount);

  @override
  void doEffect(Actor actor) => actor.health.heal(healAmount);

  @override
  void undoEffect(Actor actor) {}
}

class HealthEffect extends Effect {
  final int maxHealthMod;
  final bool restoreHealth;

  const HealthEffect(this.maxHealthMod, {this.restoreHealth = false});

  @override
  void doEffect(Actor actor) {
    actor.health.buff(maxHealthMod);
    if (restoreHealth) actor.health.current = actor.health.max;
  }

  @override
  void undoEffect(Actor actor) {
    actor.health.nerf(maxHealthMod);
  }
}

/// Set the actor's base attack (e.g., from a weapon)
class BaseAttackEffect extends Effect {
  final int attack;

  const BaseAttackEffect(this.attack);

  @override
  void doEffect(Actor actor) => actor.stats.setAttack(attack);

  @override
  void undoEffect(Actor actor) => actor.stats.resetAttack();
}

/// Set the actor's base defense (e.g., from armor)
class BaseDefenseEffect extends Effect {
  final int defense;

  const BaseDefenseEffect(this.defense);

  @override
  void doEffect(Actor actor) => actor.stats.setDefense(defense);

  @override
  void undoEffect(Actor actor) => actor.stats.resetDefense();
}

/// Buff the actor's stat bonuses
class BuffEffect extends Effect {
  final int attack;
  final int defense;
  final int accuracy;
  final int dodge;
  final int vision;

  const BuffEffect({
    this.attack = 0,
    this.defense = 0,
    this.accuracy = 0,
    this.dodge = 0,
    this.vision = 0,
  });

  @override
  void doEffect(Actor actor) {
    actor.stats.modAttack(attack);
    actor.stats.modDefense(defense);
    actor.stats.modAccuracy(accuracy);
    actor.stats.modDodge(dodge);
    actor.stats.modVision(vision);
  }

  @override
  void undoEffect(Actor actor) {
    actor.stats.modAttack(-attack);
    actor.stats.modDefense(-defense);
    actor.stats.modAccuracy(-accuracy);
    actor.stats.modDodge(-dodge);
    actor.stats.modVision(-vision);
  }
}

/// Nerf the actor's stat bonuses
class NerfEffect extends Effect {
  final int attack;
  final int defense;
  final int accuracy;
  final int dodge;
  final int vision;

  const NerfEffect({
    this.attack = 0,
    this.defense = 0,
    this.accuracy = 0,
    this.dodge = 0,
    this.vision = 0,
  });

  @override
  void doEffect(Actor actor) {
    actor.stats.modAttack(-attack);
    actor.stats.modDefense(-defense);
    actor.stats.modAccuracy(-accuracy);
    actor.stats.modDodge(-dodge);
    actor.stats.modVision(-vision);
  }

  @override
  void undoEffect(Actor actor) {
    actor.stats.modAttack(attack);
    actor.stats.modDefense(defense);
    actor.stats.modAccuracy(accuracy);
    actor.stats.modDodge(dodge);
    actor.stats.modVision(vision);
  }
}
