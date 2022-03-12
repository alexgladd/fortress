import 'package:fortress/engine.dart';
import 'package:fortress/web.dart';

import 'effect.dart';

class Item {
  final String name;
  final String symbol;
  final Color color;
  final List<Effect> onPickup;
  final List<Effect> onEquip;
  final List<Effect> onUse;

  const Item({
    this.name = 'Unknown Item',
    this.symbol = '!',
    this.color = Color.white,
    this.onPickup = const [],
    this.onEquip = const [],
    this.onUse = const [],
  });

  GameItem create() => GameItem(this);
}

class GameItem extends GameObject {
  final Item item;

  GameItem(this.item) : super() {
    renderer.set(char: item.symbol, foreground: item.color, order: 0);
  }
}
