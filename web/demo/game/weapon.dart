import 'package:fortress/web.dart';

import 'effect.dart';
import 'item.dart';

class Weapon extends Item {
  static final dagger = Weapon(
    name: 'Dagger',
    attackVerb: 'stab',
    onEquip: [BaseAttackEffect(5)],
  );

  static final shortSword = Weapon(
    name: 'Short Sword',
    color: Color.green,
    onEquip: [BaseAttackEffect(8)],
  );

  final String attackVerb;

  const Weapon({
    String name = 'Unknown Weapon',
    String symbol = '‼',
    Color color = Color.white,
    List<Effect> onPickup = const [],
    List<Effect> onEquip = const [],
    this.attackVerb = 'attack',
  }) : super(
          name: name,
          symbol: symbol,
          color: color,
          onPickup: onPickup,
          onEquip: onEquip,
        );
}
