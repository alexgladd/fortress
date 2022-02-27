import 'package:fortress/engine.dart';

import 'action.dart';

/// Base controller component for a turn-based entity
abstract class TurnController extends Component {
  int _initiative;

  /// Amount of initiative required to take a turn
  int get initiativeRequired => 100;

  /// Amount of initiative gained per idle turn
  int get initiativePerTurn => 10;

  /// True if there is enough accumulated initiative to take a turn
  bool get canTakeTurn => _initiative >= initiativeRequired;

  /// Create a turn controller with the given starting [initiative]
  TurnController([int initiative = 0]) : _initiative = initiative;

  /// Perform no action this turn; accumulate [initiativePerTurn] initiative
  void idleTurn() => _initiative += initiativePerTurn;

  /// Spends [initiativeRequired] initiative to take an [Action] this turn
  Action? takeTurn() {
    var action = getTurnAction();
    if (action == null) return null;

    _initiative -= initiativeRequired;
    return action;
  }

  /// Get the [Action] to perform this turn
  Action? getTurnAction();
}

/// A turn-based [GameObject]
abstract class TurnBasedObject extends GameObject {
  /// Reference to our turn controller
  final TurnController turnController;

  TurnBasedObject(this.turnController) {
    add(turnController);
  }
}

/// Process turn-based entities. Default [System.priority] is 200.
///
/// Component order is shuffled each turn step.
class TurnBasedSystem extends System<TurnController> {
  final TurnBasedObject _controlledActor;

  int _turn = 0;

  /// The current turn that the game is on
  int get turn => _turn;

  @override
  int get priority => 200;

  /// Create a new turn-based system that monitors the given [controlledActor],
  /// which is usually the main human-controlled actor in the game
  TurnBasedSystem(TurnBasedObject controlledActor)
      : _controlledActor = controlledActor;

  @override
  void update(double ds, List<TurnController> components) {
    // let the AI process their turns
    while (!_controlledActor.turnController.canTakeTurn) {
      _runTurn(components);
    }

    // only proceed if human-controlled actor is ready
    if (_controlledActor.turnController.getTurnAction() != null) {
      _runTurn(components);
    }
  }

  void _runTurn(List<TurnController> tcs) {
    _turn++;
    // print('TURN SYS turn $turn');

    tcs.shuffle();
    for (var tc in tcs) {
      _processComponent(tc);
    }
  }

  void _processComponent(TurnController tc) {
    if (tc.canTakeTurn) {
      var action = tc.takeTurn();
      if (action != null) action.perform(tc.gameObject);
    } else {
      tc.idleTurn();
    }
  }
}