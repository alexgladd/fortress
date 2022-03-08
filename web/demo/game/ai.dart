import 'package:fortress/map.dart';
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
  final int _vision;

  @override
  int get initiativePerTurn => _speed;

  /// AI should always be attached to an [Actor]
  Actor get actor => gameObject as Actor;

  AiController(LocationAffinity affinity, Disposition disposition,
      Intelligence intelligence, int speed, int vision,
      [int? startInitiative])
      : _affinity = affinity,
        _disposition = disposition,
        _intelligence = intelligence,
        _speed = speed,
        _vision = vision,
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
    if (_disposition == Disposition.passive && actor.lastAttacker != null) {
      return _tryRunFromAttacker();
    }

    if (_disposition == Disposition.defensive && actor.lastAttacker != null) {
      return _tryAttack(actor.lastAttacker!);
    }

    if (_disposition == Disposition.aggressive) {
      if (actor.lastAttacker != null) return _tryAttack(actor.lastAttacker!);
      return _tryAttack(game.hero);
    }

    if (_disposition == Disposition.crazed) {
      return _tryAttackAnything();
    }

    return null;
  }

  Action? _tryAttackAnything() {
    var fov = Circle.filled(gameObject.position, _vision);

    // look for the closest other actor within FOV
    Actor? target;
    int targetDistance = 1000000000;
    for (var pos in fov) {
      // check hero
      if (game.hero.position == pos) {
        var distance = gameObject.distanceTo(game.hero);
        if (distance < targetDistance) {
          target = game.hero;
          targetDistance = distance.toInt();
        }
      }

      // check other monsters
      var monster = game.getMonsterAt(pos);
      if (monster == actor) continue;
      if (monster != null) {
        var distance = gameObject.distanceTo(monster);
        if (distance < targetDistance) {
          target = monster;
          targetDistance = distance.toInt();
        }
      }
    }

    // try to attack it if we found anything
    if (target != null) return _tryAttack(target);

    return null;
  }

  Action? _tryAttack(Actor target) {
    // target in vision range?
    if (gameObject.distanceTo(target) > _vision) {
      if (target == actor.lastAttacker) actor.lastAttacker = null;
      return null;
    }

    // target in view?
    if (!game.level.hasLos(gameObject.position, target.position)) {
      // TODO: maybe make this based on intelligence?
      if (target == actor.lastAttacker) actor.lastAttacker = null;
      return null;
    }

    // attack if close enough
    for (var dir in Direction.cardinals) {
      var pos = gameObject.position + dir;
      if (target.position == pos) {
        return AttackAction(target);
      }
    }

    // move towards
    var line = Line(gameObject.position, target.position);
    var nextPos = line.first;

    if (_isOpenMove(nextPos)) {
      return MoveAction((nextPos - gameObject.position).toDirection());
    }

    // else just move anywhere
    return _tryMoveAnywhere();
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
    }

    // else just try to move anywhere
    return _tryMoveAnywhere();
  }

  Action? _getMoveAction() {
    // TODO: special case for 'position' affinity

    // try moving nearby first
    Action? move = _tryMoveAnywhere(true);
    if (move != null) return move;

    // else look for desired affinity within vision and head that direction
    move = _tryFindAffinityLocation();
    if (move != null) return move;

    // else try to move anywhere disregarding affinity
    return _tryMoveAnywhere();
  }

  Action? _tryFindAffinityLocation() {
    var fov = Circle.filled(gameObject.position, _vision);

    // look for closest desire affinity within FOV
    Vec2? target;
    int targetDistance = 1000000000;
    for (var pos in fov) {
      if (pos == gameObject.position) continue;
      if (_isAffinityLocation(pos) &&
          game.level.hasLos(gameObject.position, pos)) {
        var distance = (pos - gameObject.position).length.round();
        if (distance < targetDistance) {
          target = pos;
          targetDistance = distance;
        }
      }
    }

    // nothing found
    if (target == null) return null;

    // move towards
    var line = Line(gameObject.position, target);
    var nextPos = line.first;

    if (_isOpenMove(nextPos)) {
      return MoveAction((nextPos - gameObject.position).toDirection());
    }

    return null;
  }

  Action? _tryMoveAnywhere([bool withAffinity = false]) {
    var possibleDirs = Direction.cardinals.toList();
    var attempts = 1;
    if (_intelligence == Intelligence.medium) attempts = 2;
    if (_intelligence == Intelligence.high) attempts = 4;

    for (var i = 0; i < attempts; i++) {
      var dir = rng.item(possibleDirs);
      possibleDirs.remove(dir);

      var testPos = gameObject.position + dir;

      if (withAffinity && !_isAffinityLocation(testPos)) continue;

      if (_isOpenMove(testPos)) {
        return MoveAction(dir);
      }
    }

    return null;
  }

  bool _isAffinityLocation(Vec2 position) {
    if (!game.level.isWalkable(position)) return false;
    if (_affinity == LocationAffinity.none) return true;

    var locType = game.level.map[position];

    if (_affinity == LocationAffinity.room && locType == LevelTile.room) {
      return true;
    }

    if (_affinity == LocationAffinity.corridor &&
        locType == LevelTile.corridor) {
      return true;
    }

    return false;
  }

  bool _isOpenMove(Vec2 position) =>
      game.level.isWalkable(position) &&
      game.hero.position != position &&
      game.getMonsterAt(position) == null;
}
