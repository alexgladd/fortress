import 'actor.dart';

/// An effect that can be applied to to an [Actor]
abstract class Effect {
  /// The description of the effect
  String get description;

  const Effect();

  /// Apply the effect to the [actor]
  void doEffect(Actor actor);

  /// Reverse the effect on the [actor]
  void undoEffect(Actor actor);

  @override
  String toString() => description;
}

class HealEffect extends Effect {
  final int healAmount;

  @override
  String get description => 'Heals $healAmount HP';

  const HealEffect(this.healAmount);

  @override
  void doEffect(Actor actor) => actor.health.heal(healAmount);

  @override
  void undoEffect(Actor actor) {}
}

class HealthEffect extends Effect {
  final int maxHealthMod;
  final bool restoreHealth;

  @override
  String get description {
    var result = '';
    if (maxHealthMod > 0) result += '+';

    result += '$maxHealthMod max HP';

    if (restoreHealth) result += ' (full heal)';

    return result;
  }

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

class SpeedEffect extends Effect {
  final int speedMod;

  @override
  String get description => '${speedMod > 0 ? '+' : ''}$speedMod speed';

  SpeedEffect(this.speedMod);

  @override
  void doEffect(Actor actor) => actor.modifyInitiative(speedMod);

  @override
  void undoEffect(Actor actor) => actor.modifyInitiative(-speedMod);
}

/// Set the actor's base attack (e.g., from a weapon)
class BaseAttackEffect extends Effect {
  final int attack;

  @override
  String get description => '${attack}d attack';

  const BaseAttackEffect(this.attack);

  @override
  void doEffect(Actor actor) => actor.stats.setAttack(attack);

  @override
  void undoEffect(Actor actor) => actor.stats.resetAttack();
}

/// Set the actor's base defense (e.g., from armor)
class BaseDefenseEffect extends Effect {
  final int defense;

  @override
  String get description => '${defense}d defense';

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

  @override
  String get description {
    var desc = '';
    if (attack != 0) desc += '+$attack attack\n';
    if (defense != 0) desc += '+$defense defense\n';
    if (accuracy != 0) desc += '+$accuracy accuracy\n';
    if (dodge != 0) desc += '+$dodge dodge\n';
    if (vision != 0) desc += '+$vision vision\n';
    return desc.trim();
  }

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

  @override
  String get description {
    var desc = '';
    if (attack != 0) desc += '-$attack attack\n';
    if (defense != 0) desc += '-$defense defense\n';
    if (accuracy != 0) desc += '-$accuracy accuracy\n';
    if (dodge != 0) desc += '-$dodge dodge\n';
    if (vision != 0) desc += '-$vision vision\n';
    return desc.trim();
  }

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
