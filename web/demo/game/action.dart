import 'dart:math' as math;

import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';

import 'actor.dart';
import 'game.dart';
import 'hero.dart';
import 'item.dart';

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
  void performOnActor(Actor actor);

  @override
  void perform(GameObject gameObject) {
    try {
      var actor = gameObject as Actor;
      performOnActor(actor);
    } catch (_) {
      throw StateError('ActorAction cannot perform on non-Actors: $gameObject');
    }
  }
}

/// An action that expects to be [perform]ed on a [Hero]
abstract class HeroAction extends Action {
  /// Perform the action on the given [hero]
  void performOnHero(Hero hero);

  @override
  void perform(GameObject gameObject) {
    try {
      var hero = gameObject as Hero;
      performOnHero(hero);
    } catch (_) {
      throw StateError('HeroAction cannot perform on non-Heros: $gameObject');
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

/// An action that consumes a turn to heal the [Actor]
class RestAction extends ActorAction {
  @override
  void performOnActor(Actor actor) {
    var preHealth = actor.health.current;

    actor.health.heal(1);

    if (actor == game.hero &&
        actor.health.current == actor.health.max &&
        preHealth < actor.health.max) {
      game.log.msg('${actor.subject} feel fully rested');
    }
  }
}

/// An action that continues to move the [Hero] in the given direction until
/// either hitting unwalkable terrain or seeing a monster
class RunAction extends HeroAction {
  final Direction dir;

  RunAction(this.dir);

  @override
  void performOnHero(Hero hero) {
    // move
    hero.position += dir;
    hero.dirty();

    // check surroundings for visible monsters
    final monsters = hero.visibleMonsters;
    if (monsters.isNotEmpty) {
      // a monster has come into view; stop running
      game.log.msg('${hero.subject} stop running after seeing '
          '${monsters[0].subject.toLowerCase()}');
      return;
    }

    // queue next run
    if (game.level.isWalkable(hero.position + dir)) {
      hero.controller.queueAction(RunAction(dir));
    }
  }
}

/// An action that equips an [Item] or [GameItem] on the [Hero]
class EquipAction extends HeroAction {
  final GameItem? _gameItem;
  final Item? _item;

  EquipAction(Object item)
      : _gameItem = item is GameItem ? item : null,
        _item = item is Item ? item : null;

  @override
  void performOnHero(Hero hero) {
    if (_gameItem != null) _equipGameItem(hero, _gameItem!);
    if (_item != null) _equipItem(hero, _item!);
  }

  void _equipGameItem(Hero hero, GameItem gameItem) {
    // assume this was a pickup from the map
    final oldItem = hero.equip(gameItem.item);
    game.ecs.remove(gameItem);
    game.level.items.remove(gameItem);

    if (oldItem != null) {
      if (hero.hasInventorySpace) {
        // put back into inventory
        hero.inventory.add(oldItem);
      } else {
        // drop
        game.dropItem(oldItem, hero.position);
      }
    }
  }

  void _equipItem(Hero hero, Item item) {
    // assume this was equipped from inventory
    if (!hero.inventory.remove(item)) return;

    final oldItem = hero.equip(item);
    if (oldItem != null) {
      hero.inventory.add(oldItem);
    }
  }
}

class UseAction extends HeroAction {
  final GameItem? _gameItem;
  final Item? _item;

  UseAction(Object item)
      : _gameItem = item is GameItem ? item : null,
        _item = item is Item ? item : null;

  @override
  void performOnHero(Hero hero) {
    if (_gameItem != null) _useGameItem(hero, _gameItem!);
    if (_item != null) _useItem(hero, _item!);
  }

  void _useGameItem(Hero hero, GameItem gameItem) {
    // assume this was used directly from the map
    hero.use(gameItem.item);
    game.ecs.remove(gameItem);
    game.level.items.remove(gameItem);
  }

  void _useItem(Hero hero, Item item) {
    // assume this was used from inventory
    if (!hero.inventory.remove(item)) return;
    hero.use(item);
  }
}

class PickupAction extends HeroAction {
  final GameItem item;

  PickupAction(this.item);

  @override
  void performOnHero(Hero hero) {
    if (hero.pickup(item.item)) {
      game.ecs.remove(item);
      game.level.items.remove(item);
    } else {
      game.log.msg('${hero.subject} are unable to carry more items');
    }
  }
}

class DropAction extends HeroAction {
  final Item item;

  DropAction(this.item);

  @override
  void performOnHero(Hero hero) {
    if (hero.drop(item)) game.dropItem(item, hero.position);
  }
}

/// An action that attacks a [target]
class AttackAction extends ActorAction {
  final Actor target;

  AttackAction(this.target);

  @override
  void performOnActor(Actor attacker) {
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
