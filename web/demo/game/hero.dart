import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import '../input.dart';
import 'action.dart';
import 'game.dart';
import 'turn_based.dart';

class Hero extends TurnBasedObject {
  Hero() : super(HeroController()) {
    add(InputHandler<Input>());
    renderer.set(char: '@', foreground: Color.gold);
  }
}

/// Input-driven turn-based controller for the [Hero]
class HeroController extends TurnController {
  static const movement = {Input.n, Input.e, Input.s, Input.w};

  @override
  int get initiativePerTurn => 50;

  /// Get the attached entity as a [Hero]
  Hero get hero => gameObject as Hero;

  HeroController() : super(100);

  @override
  Action? getTurnAction() {
    var inputs = gameObject.get<InputHandler<Input>>()!;

    if (inputs.hasAny(movement)) return _handleInput(inputs);

    return null;
  }

  Action? _handleInput(InputHandler<Input> inputs) {
    Action? action;

    if (inputs.has(Input.n)) action = _tryMovement(Direction.n);
    if (inputs.has(Input.e)) action = _tryMovement(Direction.e);
    if (inputs.has(Input.s)) action = _tryMovement(Direction.s);
    if (inputs.has(Input.w)) action = _tryMovement(Direction.w);

    if (action != null) gameObject.dirty();

    return action;
  }

  Action? _tryMovement(Direction dir) {
    var position = gameObject.position + dir;

    if (game.level!.map[position].isOpen) {
      // TODO: check if there is something to attack or interact with
      return MoveAction(dir);
    }

    return null;
  }
}
