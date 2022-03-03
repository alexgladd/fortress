import 'dart:math' as math;

import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';

import 'actor.dart';
import 'game.dart';

/// An action that can be [perform]ed on a [GameObject]
abstract class Action {
  /// Perform the action on the given [gameObject]
  void perform(GameObject gameObject);

  @override
  String toString() => runtimeType.toString();
}

/// An action that expects to be [perform]ed on an [Actor]
abstract class ActorAction extends Action {
  /// Perform the action on the given [actor]
  void performActor(Actor actor);

  @override
  void perform(GameObject gameObject) {
    try {
      var actor = gameObject as Actor;
      performActor(actor);
    } catch (_) {
      throw StateError('ActorAction cannot perform on non-Actors: $gameObject');
    }
  }
}

/// An action that does nothing. Use when something should use their initiative
/// but take no action (e.g., a less intelligent creature that can't decide
/// what to do).
class NoAction extends Action {
  @override
  void perform(GameObject gameObject) {}
}

/// An action that moves a [GameObject] in one [Direction]
class MoveAction extends Action {
  final Direction dir;

  MoveAction(this.dir);

  @override
  void perform(GameObject gameObject) {
    gameObject.position += dir;
    gameObject.dirty();
  }
}

/// An action that attacks a [target]
class AttackAction extends ActorAction {
  final Actor target;

  AttackAction(this.target);

  @override
  void performActor(Actor attacker) {
    target.lastAttacker = attacker;

    final hit = attacker.hitChance;

    if (hit == Roll.criticalSuccess) {
      // always hit
      _attackHit(attacker, hit);
    } else if (hit == Roll.criticalFailure) {
      // always miss
      _attackMiss(attacker, hit);
    } else {
      final dodge = target.dodgeChance;

      if (dodge == Roll.criticalSuccess) {
        // always dodge
        _attackMiss(attacker, hit, dodge);
      } else if (dodge == Roll.criticalFailure) {
        // always hit
        _attackHit(attacker, hit, dodge);
      } else if (hit >= dodge) {
        // hit
        _attackHit(attacker, hit, dodge);
      } else {
        // dodge
        _attackMiss(attacker, hit, dodge);
      }
    }
  }

  void _attackHit(Actor attacker, int hit, [int? dodge]) {
    var atkPower = attacker.attackPower;
    final defPower = target.defensePower;

    if (hit == Roll.criticalSuccess) atkPower *= 2;

    final damage = math.max(atkPower - defPower, 0);

    target.health.damage(damage);

    print('ATTACK HIT $attacker -> $target for $damage '
        '(${target.health.current}hp) [hit: $hit, dodge: '
        '${dodge ?? 'none'}, atk: $atkPower, def: $defPower');

    game.log.combat('${attacker.subject} ${attacker.attackVerb} '
        '${target.subject.toLowerCase()} for $damage damage');
  }

  void _attackMiss(Actor attacker, int hit, [int? dodge]) {
    print('ATTACK MISS $attacker -> $target (${target.health.current}hp) '
        '[hit: $hit, dodge: ${dodge ?? 'none'}]');

    game.log.combat('${attacker.subject} ${attacker.missVerb} '
        '${target.subject.toLowerCase()}');
  }
}
