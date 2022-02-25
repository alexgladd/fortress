import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import '../input.dart';
import 'action.dart';
import 'turn_based.dart';

class Hero extends TurnBasedActor {
  Hero() : super(HeroController()) {
    add(InputHandler<Input>());
    renderer.set(char: '@', foreground: Color.gold);
  }
}

/// Input-driven turn-based controller
///
/// Automatically adds an [InputHandler].
class HeroController extends TurnController {
  // late final InputHandler inputs;

  @override
  Action? getTurnAction() {
    var inputs = gameObject.get<InputHandler<Input>>()!;

    Action? action;
    if (inputs.hasInput(Input.n)) action = MoveAction(Direction.n);
    if (inputs.hasInput(Input.e)) action = MoveAction(Direction.e);
    if (inputs.hasInput(Input.s)) action = MoveAction(Direction.s);
    if (inputs.hasInput(Input.w)) action = MoveAction(Direction.w);

    if (action != null) gameObject.dirty();

    return action;
  }
}
