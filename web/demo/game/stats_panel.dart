import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'hero.dart';

class StatsPanel extends Frame {
  static const minHeight = 14 + 4;
  final Hero _hero;

  StatsPanel(Rect bounds, Hero hero)
      : _hero = hero,
        super(bounds, 'Your Stats',
            titleColor: Color.lightGold, borderColor: Color.gold, padding: 1);

  @override
  void renderContent(Terminal terminal) {
    terminal.drawText(0, 0, 'Health:');
    terminal.drawText(8, 0, '${_hero.health.current} / ${_hero.health.max}',
        _valueToColor(_hero.health.current, _hero.health.max));

    var speedPct = _hero.actionsPerTurn.clamp(0.0, 1.0) * 100.0;
    terminal.drawText(0, 2, 'Speed:');
    terminal.drawText(8, 2, '${speedPct.toStringAsPrecision(3)}%',
        _valueToColor(speedPct, 100));

    terminal.drawText(
      0,
      4,
      'ATK:  ${_hero.stats.attack} (d${_hero.stats.attackBase} '
      '${_bonus(_hero.stats.attackBonus)})',
    );

    terminal.drawText(
      0,
      5,
      'DEF:  ${_hero.stats.defense} (d${_hero.stats.defenseBase} '
      '${_bonus(_hero.stats.defenseBonus)})',
    );

    terminal.drawText(0, 6, 'ACC: ${_bonus(_hero.stats.accuracy)}');
    terminal.drawText(0, 7, 'DGE: ${_bonus(_hero.stats.dodge)}');
    terminal.drawText(0, 8, 'VIS:  ${_hero.stats.vision}');

    terminal.drawText(0, 10, 'Weapon: ${_hero.weapon?.name ?? '-'}');
    terminal.drawText(0, 11, 'Armor:  -');

    terminal.drawText(
        0, 13, 'Inventory: ${_hero.inventory.length} / ${Hero.inventorySize}');
  }

  String _bonus(int value) => value >= 0 ? '+$value' : value.toString();

  Color _valueToColor(
    num value,
    num max, {
    Color low = Color.red,
    Color medium = Color.yellow,
    Color high = Color.lightGreen,
  }) {
    var oneThird = max / 3.0;
    if (value <= oneThird) return low;
    if (value <= oneThird * 2) return medium;
    return high;
  }
}
