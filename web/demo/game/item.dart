import 'package:fortress/engine.dart';
import 'package:fortress/web.dart';

import 'effect.dart';

class Item {
  static const rarityNormal = Color.white;
  static const rarityUncommon = Color.lightGreen;
  static const rarityRare = Color.lightPurple;
  static const rarityUnique = Color.orange;

  static const elixerHealth = Item(
    name: 'Elixer of Health',
    onUse: [HealEffect(10)],
  );

  static const elixerHealWounds = Item(
    name: 'Elixer of Heal Wounds',
    color: rarityUncommon,
    onUse: [HealthEffect(0, restoreHealth: true)],
  );

  final String name;
  final String symbol;
  final Color color;
  final List<Effect> onPickup;
  final List<Effect> onEquip;
  final List<Effect> onUse;

  // consider the item usable if it has use effects
  bool get isUsable => onUse.isNotEmpty;

  // consider the item equipable if it has equip effects
  bool get isEquipable => onEquip.isNotEmpty;

  const Item({
    this.name = 'Unknown Item',
    this.symbol = '*',
    this.color = rarityNormal,
    this.onPickup = const [],
    this.onEquip = const [],
    this.onUse = const [],
  });

  GameItem create() => GameItem(this);
}

class GameItem extends GameObject {
  final Item item;

  Type get type => item.runtimeType;
  String get name => item.name;

  GameItem(this.item) : super() {
    renderer.set(char: item.symbol, foreground: item.color, order: 0);
  }
}
