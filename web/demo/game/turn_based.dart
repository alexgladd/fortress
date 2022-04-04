import 'package:fortress/engine.dart';

import 'action.dart';

/// Base controller component for a turn-based entity
abstract class TurnController extends Component {
  /// Amount of initiative required to take an action during a turn
  static const initiativeForAction = 100;

  int _initiative;
  int _initiativePerTurn;

  /// Amount of initiative gained per idle turn (0 - [initiativeForAction])
  int get initiativePerTurn => _initiativePerTurn;

  /// Set the amount of initiative gained per idle turn
  set initiativePerTurn(int value) =>
      _initiativePerTurn = value.clamp(0, initiativeForAction);

  /// True if there is enough accumulated initiative to take a turn
  bool get canTakeAction => _initiative >= initiativeForAction;

  /// Create a turn controller with the given starting [initiative]
  TurnController([int initiative = 0, int initiativePerTurn = 10])
      : _initiative = initiative,
        _initiativePerTurn = initiativePerTurn;

  /// Modify [initiativePerTurn] by the given [amount]
  void modInitiativePerTurn(int amount) =>
      initiativePerTurn = initiativePerTurn + amount;

  /// Perform no action this turn; accumulate [initiativePerTurn] initiative
  void idleTurn() => _initiative += initiativePerTurn;

  /// Spends [initiativeForAction] initiative to take an [Action] this turn if
  /// the attached entity is ready
  Action? takeAction() {
    if (!canTakeAction) {
      throw StateError('$this is not able to take an action yet');
    }

    var action = getTurnAction();
    if (action == null) return null;

    _initiative -= initiativeForAction;
    return action;
  }

  /// Get the [Action] to perform this turn. Returning null signals that the
  /// attached [Entity] is not yet ready to perform its action this turn. Use
  /// [NoAction] to consume initiative but effectively skip a turn.
  Action? getTurnAction();
}

/// A turn-based [GameObject]
abstract class TurnBasedObject extends GameObject {
  /// Reference to our turn controller
  final TurnController turnController;

  /// The number of turns it takes for this object to be able to take an action
  /// (lower is better)
  double get turnsPerAction =>
      TurnController.initiativeForAction / turnController.initiativePerTurn;

  /// The number of actions per turn (generally between 0.0 and 1.0). This can
  /// be used to show a normalized "speed" value.
  double get actionsPerTurn =>
      turnController.initiativePerTurn / TurnController.initiativeForAction;

  TurnBasedObject(this.turnController) {
    add(turnController);
  }

  /// Modify the actor's speed (initiative per turn) by [amount]
  void modifyInitiative(int amount) =>
      turnController.modInitiativePerTurn(amount);
}

/// Process turn-based entities. Default [System.priority] is 200.
class TurnBasedSystem extends System<TurnController> {
  final turnPending = <TurnController>[];

  int _turn = 0;

  /// The current turn that the game is on
  int get turn => _turn;

  @override
  int get priority => 200;

  @override
  void update(double ds) {
    // shortcut: nothing to do if there are no components in the ECS
    if (components.isEmpty) return;

    // check if we've finished a turn
    if (turnPending.isEmpty) {
      _turn++;
      turnPending.addAll(components);
    }

    var finished = <TurnController>[];

    for (var tc in turnPending) {
      if (_processComponent(tc)) {
        finished.add(tc);
      } else {
        break;
      }
    }

    finished.forEach(turnPending.remove);
  }

  /// Returns true if the controller successfully processed the turn
  bool _processComponent(TurnController tc) {
    // safety check since we're caching turn controller components
    if (!tc.isBound) return true;

    if (tc.canTakeAction) {
      var action = tc.takeAction();
      if (action != null) {
        action.perform(tc.gameObject);
        return true;
      } else {
        return false;
      }
    } else {
      tc.idleTurn();
      return true;
    }
  }
}
