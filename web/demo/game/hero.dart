import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import '../input.dart';
import 'action.dart';
import 'actor.dart';
import 'game.dart';
import 'turn_based.dart';

class Hero extends Actor {
  Hero() : super(HeroController()) {
    add(InputHandler<Input>());
    renderer.set(char: '@', foreground: Color.gold);
  }
}

/// Input-driven turn-based controller for the [Hero]
class HeroController extends TurnController {
  static const directions = {Input.n, Input.e, Input.s, Input.w};

  @override
  int get initiativePerTurn => 50;

  /// Get the attached entity as a [Hero]
  Hero get hero => gameObject as Hero;

  HeroController() : super(100);

  @override
  Action? getTurnAction() {
    var inputs = gameObject.get<InputHandler<Input>>()!;

    if (inputs.hasAny(directions)) return _handleDirections(inputs);

    return null;
  }

  Action? _handleDirections(InputHandler<Input> inputs) {
    Action? action;

    if (inputs.has(Input.n)) action = _tryDirection(Direction.n);
    if (inputs.has(Input.e)) action = _tryDirection(Direction.e);
    if (inputs.has(Input.s)) action = _tryDirection(Direction.s);
    if (inputs.has(Input.w)) action = _tryDirection(Direction.w);

    if (action != null) gameObject.dirty();

    return action;
  }

  Action? _tryDirection(Direction dir) {
    var position = gameObject.position + dir;

    // TODO: check if there is something to attack or interact with

    // check if we can move
    if (game.level!.map[position].isOpen) return MoveAction(dir);

    return null;
  }
}
