import 'actor.dart';
import 'ai.dart';
import 'breed.dart';

class Monster extends Actor {
  final Breed breed;

  Monster(this.breed, AiController ai, int maxHealth)
      : super(ai, maxHealth: maxHealth) {
    renderer.set(char: breed.symbol, foreground: breed.color);
  }
}
