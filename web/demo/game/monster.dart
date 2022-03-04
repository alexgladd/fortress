import 'actor.dart';
import 'ai.dart';
import 'breed.dart';
import 'combat.dart';

class Monster extends Actor {
  final Breed breed;

  Monster(this.breed, AiController ai, int maxHealth, CombatStats stats)
      : super(ai, maxHealth: maxHealth, stats: stats) {
    renderer.set(char: breed.symbol, foreground: breed.color);
  }

  @override
  String get subject => 'The ${breed.name.toLowerCase()}';

  @override
  String get attackVerb => breed.attackVerb;

  @override
  String toString() => 'Monster($id)';
}
