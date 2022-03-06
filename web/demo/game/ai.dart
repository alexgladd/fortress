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

    Action? aiAction;

    aiAction = _getAttackAction();
    if (aiAction != null) return aiAction;

    aiAction = _getMoveAction();
    if (aiAction != null) return aiAction;

    return NoAction();
  }

  Action? _getAttackAction() {
    // TODO: process all dispositions
    if (_disposition == Disposition.passive && actor.lastAttacker != null) {
      return _tryRunFromAttacker();
    }

    return null;
  }

  Action? _tryRunFromAttacker() {
    if (actor.lastAttacker == null) return null;

    if (!game.level.hasLos(gameObject.position, actor.lastAttacker!.position)) {
      // TODO: maybe make this depend on intelligence?
      actor.lastAttacker = null;
      return null;
    }

    var line = Line(actor.lastAttacker!.position, gameObject.position, true);

    // run directly away from attacker
    Vec2 nextPos = Vec2.zero;
    var iter = line.iterator;
    while (iter.moveNext()) {
      if (iter.current == gameObject.position) {
        iter.moveNext();
        nextPos = iter.current;
        break;
      }
    }

    if (_isOpenMove(nextPos)) {
      // direct route is open
      var delta = nextPos - gameObject.position;
      return MoveAction(delta.toDirection());
    } else {
      // try to move adjacent to the direct route
      var possibleDirs = Direction.cardinals.toList();
      var attempts = 1;
      if (_intelligence == Intelligence.medium) attempts = 2;
      if (_intelligence == Intelligence.high) attempts = 4;

      for (var i = 0; i < attempts; i++) {
        var dir = rng.item(possibleDirs);
        possibleDirs.remove(dir);

        var testPos = nextPos + dir;
        if (testPos == gameObject.position) continue;

        var moveDir = (testPos - gameObject.position).toDirection();
        var nextNextPos = gameObject.position + moveDir;
        if (_isOpenMove(nextNextPos)) {
          return MoveAction(moveDir);
        }
      }
    }

    return null;
  }

  Action? _getMoveAction() {
    // TODO: process all affinities

    var possibleDirs = Direction.cardinals.toList();
    var attempts = 1;
    if (_intelligence == Intelligence.medium) attempts = 2;
    if (_intelligence == Intelligence.high) attempts = 4;

    for (var i = 0; i < attempts; i++) {
      var dir = rng.item(possibleDirs);
      possibleDirs.remove(dir);

      var testPos = gameObject.position + dir;

      if (_isOpenMove(testPos)) {
        return MoveAction(dir);
      }
    }

    return null;
  }

  bool _isOpenMove(Vec2 position) =>
      game.level.isWalkable(position) &&
      game.hero.position != position &&
      game.getMonsterAt(position) == null;
}
