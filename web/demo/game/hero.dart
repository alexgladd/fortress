import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import '../input.dart';
import 'action.dart';
import 'actor.dart';
import 'combat.dart';
import 'game.dart';
import 'turn_based.dart';

final _defaultHeroStats = CombatStats(
  attack: 5,
  accuracy: 2,
  defense: 2,
  dodge: 2,
);

class Hero extends Actor {
  Hero() : super(HeroController(), maxHealth: 100, stats: _defaultHeroStats) {
    add(InputHandler<Input>());
    renderer.set(char: '@', foreground: Color.gold);
  }

  @override
  String get subject => 'You';

  @override
  String get attackVerb => 'attack';

  @override
  String get missVerb => 'miss';

  @override
  void onDeath() {
    if (lastAttacker != null) {
      game.log.combat('$subject were killed by ${lastAttacker!.subject}');
    } else {
      game.log.combat('$subject died');
    }
  }

  @override
  String toString() => 'Hero($id)';
}

/// Input-driven turn-based controller for the [Hero]
class HeroController extends TurnController {
  static const directions = {Input.n, Input.e, Input.s, Input.w};

  @override
  int get initiativePerTurn => 50;

  /// Get the attached entity as a [Hero]
  Hero get hero => gameObject as Hero;

  HeroController() : super(TurnController.initiativeForAction);

  @override
  Action? getTurnAction() {
    var inputs = gameObject.get<InputHandler<Input>>()!;

    if (inputs.hasAny(directions)) return _handleDirections(inputs);

    return null;
  }

  Action? _handleDirections(InputHandler<Input> inputs) {
    if (inputs.has(Input.n)) return _tryDirection(Direction.n);
    if (inputs.has(Input.e)) return _tryDirection(Direction.e);
    if (inputs.has(Input.s)) return _tryDirection(Direction.s);
    if (inputs.has(Input.w)) return _tryDirection(Direction.w);

    return null;
  }

  Action? _tryDirection(Direction dir) {
    final position = gameObject.position + dir;

    // check if there is something to attack
    final monster = game.getMonsterAt(position);
    if (monster != null) return AttackAction(monster);

    // TODO: check if there is somthing to interact with

    // check if we can move
    if (game.level.isWalkable(position)) return MoveAction(dir);

    return null;
  }
}
