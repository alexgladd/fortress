import 'package:fortress/util.dart';

import 'action.dart';
import 'actor.dart';
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

/// How an AI makes decisions
enum Intelligence {
  low,
  medium,
  high,
}

class AiController extends TurnController {
  final LocationAffinity _affinity;
  final Disposition _disposition;
  final Intelligence _intelligence;
  final int _speed;

  @override
  int get initiativePerTurn => _speed;

  /// AI should always be attached to an [Actor]
  Actor get actor => gameObject as Actor;

  AiController(LocationAffinity affinity, Disposition disposition,
      Intelligence intelligence, int speed,
      [int? startInitiative])
      : _affinity = affinity,
        _disposition = disposition,
        _intelligence = intelligence,
        _speed = speed,
        super(startInitiative ??
            rng.range(0, TurnController.initiativeForAction));

  /// Get the AI's [Action]. This should never return null.
  @override
  Action? getTurnAction() {
    // no action if dead
    if (actor.health.isDead) return NoAction();

    // TODO: process disposition

    return _getMove();
  }

  Action? _getMove() {
    // TODO: process affinity

    var possibleDirs = Direction.cardinals.toList();
    var attempts = 1;
    if (_intelligence == Intelligence.medium) attempts = 2;
    if (_intelligence == Intelligence.high) attempts = 4;

    for (var i = 0; i < attempts; i++) {
      var dir = rng.item(possibleDirs);
      possibleDirs.remove(dir);

      var testPos = gameObject.position + dir;

      if (game.level.isWalkable(testPos) &&
          game.getMonsterAt(testPos) == null &&
          game.hero.position != testPos) {
        return MoveAction(dir);
      }
    }

    return NoAction();
  }
}
