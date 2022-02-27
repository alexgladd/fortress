import 'package:fortress/src/engine/ecs.dart';

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

  Actor(TurnController turnController, {int? health, int maxHealth = 100})
      : health = Health(health ?? maxHealth, maxHealth),
        super(turnController) {
    add(this.health);
  }
}
