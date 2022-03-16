import 'dart:collection';

import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import '../input.dart';
import 'action.dart';
import 'actor.dart';
import 'combat.dart';
import 'game.dart';
import 'item.dart';
import 'turn_based.dart';
import 'weapon.dart';

final _defaultHeroStats = CombatStats(
  attack: 2,
  accuracy: 2,
  defense: 2,
  dodge: 2,
  vision: 10,
);

class Hero extends Actor {
  static const inventorySize = 10;

  final inventory = <Item>[];

  Weapon? weapon;

  HeroController get controller => turnController as HeroController;

  bool get hasInventorySpace => inventory.length < inventorySize;
  bool get isInventoryFull => !hasInventorySpace;

  @override
  String get subject => 'You';

  @override
  String get attackVerb => weapon == null ? 'punch' : weapon!.attackVerb;

  @override
  String get missVerb => 'miss';

  Hero()
      : super(
          HeroController(),
          maxHealth: 100,
          stats: _defaultHeroStats.cloneBase(),
        ) {
    add(InputHandler<Input>());
    renderer.set(char: '@', foreground: Color.gold, order: 2);
  }

  Item? equip(Item item) {
    Item? oldItem;

    if (item is Weapon) {
      oldItem = weapon;
      if (oldItem != null) {
        game.log.msg('$subject unequip the ${oldItem.name}');
        oldItem.onEquip.forEach(undo);
      }

      weapon = item;
      game.log.msg('$subject equip the ${item.name}');
      item.onEquip.forEach(apply);
    }

    return oldItem;
  }

  bool use(Item item) {
    if (inventory.remove(item)) {
      game.log.msg('$subject use the ${item.name}');
      item.onUse.forEach(apply);
      return true;
    }

    return false;
  }

  bool pickup(Item item) {
    if (hasInventorySpace) {
      inventory.add(item);
      game.log.msg('$subject pick up the ${item.name}');
      item.onPickup.forEach(apply);
      return true;
    }

    return false;
  }

  bool drop(Item item) {
    if (inventory.remove(item)) {
      game.log.msg('$subject drop the ${item.name}');
      item.onPickup.forEach(undo);
      return true;
    }

    return false;
  }

  void queueAction(Action action) => controller.queueAction(action);

  @override
  void onDeath() {
    if (lastAttacker != null) {
      game.log.combat('$subject were killed by ${lastAttacker!.subject}');
    } else {
      game.log.combat('$subject died');
    }
  }

  @override
  String toString() => 'Hero($id)';
}

/// Input-driven turn-based controller for the [Hero]
class HeroController extends TurnController {
  static const directionInputs = {Input.n, Input.e, Input.s, Input.w};
  static const itemInputs = {Input.equip, Input.pickup};

  final actionQueue = Queue<Action>();

  InputHandler<Input>? _inputs;

  InputHandler<Input> get inputs => _inputs!;

  /// Get the attached entity as a [Hero]
  Hero get hero => gameObject as Hero;

  HeroController() : super(TurnController.initiativeForAction, 50);

  void queueAction(Action action) => actionQueue.add(action);

  @override
  Action? getTurnAction() {
    _inputs ??= gameObject.get<InputHandler<Input>>()!;

    // check action queue
    if (actionQueue.isNotEmpty) return actionQueue.removeFirst();

    // movement / attack / interact
    if (inputs.hasAny(directionInputs)) return _handleDirections();

    // equip
    if (inputs.hasAny(itemInputs)) return _handleItemInputs();

    // rest
    if (inputs.has(Input.rest)) return RestAction();

    return null;
  }

  Action? _handleDirections() {
    if (inputs.has(Input.n)) return _tryDirection(Direction.n);
    if (inputs.has(Input.e)) return _tryDirection(Direction.e);
    if (inputs.has(Input.s)) return _tryDirection(Direction.s);
    if (inputs.has(Input.w)) return _tryDirection(Direction.w);

    return null;
  }

  Action? _tryDirection(Direction dir) {
    final position = gameObject.position + dir;

    // check if there is something to attack
    final monster = game.getMonsterAt(position);
    if (monster != null) return AttackAction(monster);

    // TODO: check if there is somthing to interact with

    // check if we can move
    if (game.level.isWalkable(position)) return MoveAction(dir);

    return null;
  }

  Action? _handleItemInputs() {
    final item = game.getItemAt(gameObject.position);
    if (item == null) return null;

    if (inputs.has(Input.equip)) {
      if (item.item.isEquipable) return EquipAction(item);
      game.log.msg('${hero.subject} you cannot equip the ${item.name}');
    } else if (inputs.has(Input.pickup)) {
      if (hero.hasInventorySpace) return PickupAction(item);
      game.log.msg('${hero.subject} are unable to carry more items');
    }

    return null;
  }
}
