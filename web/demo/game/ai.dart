import 'package:fortress/util.dart';

import 'action.dart';
import 'game.dart';
import 'turn_based.dart';

/// How an AI moves
enum LocationAffinity {
  /// Goes anywhere
  none,

  /// Prefers to stay in rooms
  room,

  /// Prefers to stay in corridors
  corridor,

  /// Prefers to stay near a particular position
  position,
}

/// How an AI acts
enum Disposition {
  /// Won't attack; runs from attackers
  passive,

  /// Won't attack; attacks attackers
  defensive,

  /// Attacks the hero on sight; attacks attackers
  aggressive,

  /// Attacks anything on sight
  crazed,
}

class AiController extends TurnController {
  final LocationAffinity _affinity;
  final Disposition _disposition;
  final int _speed;

  @override
  int get initiativePerTurn => _speed;

  AiController(LocationAffinity affinity, Disposition disposition, int speed,
      [int? startInitiative])
      : _affinity = affinity,
        _disposition = disposition,
        _speed = speed,
        super(startInitiative ??
            rng.range(0, TurnController.initiativeForAction));
  @override
  Action? getTurnAction() {
    // TODO: process disposition

    return _getMove();
  }

  Action? _getMove() {
    // TODO: process affinity
    var dir = rng.item(Direction.cardinals);

    if (game.level.map[gameObject.position + dir].isOpen) {
      gameObject.dirty();
      return MoveAction(dir);
    }

    return null;
  }
}
