import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'hero.dart';

class StatsPanel extends Frame {
  final Hero _hero;

  StatsPanel(Rect bounds, Hero hero)
      : _hero = hero,
        super(bounds, 'Your Stats',
            titleColor: Color.lightGold, borderColor: Color.gold, padding: 1);

  @override
  void renderContent(Terminal terminal) {
    terminal.drawText(0, 0, 'Health:');
    terminal.drawText(8, 0, '${_hero.health.current} / ${_hero.health.max}',
        Color.lightGreen);

    var speedPct = _hero.actionsPerTurn.clamp(0.0, 1.0) * 100.0;
    terminal.drawText(0, 2, 'Speed:');
    terminal.drawText(
        8, 2, '${speedPct.toStringAsPrecision(3)}%', Color.yellow);

    terminal.drawText(
        0,
        4,
        'ATK:  ${_hero.stats.attack} (d${_hero.stats.attackBase} '
        '${_bonus(_hero.stats.attackBonus)})');

    terminal.drawText(
        0,
        5,
        'DEF:  ${_hero.stats.defense} (d${_hero.stats.defenseBase} '
        '${_bonus(_hero.stats.defenseBonus)})');

    terminal.drawText(0, 6, 'ACC: ${_bonus(_hero.stats.accuracy)}');
    terminal.drawText(0, 7, 'DGE: ${_bonus(_hero.stats.dodge)}');

    terminal.drawText(0, 9, 'Weapon: Dagger');
    terminal.drawText(0, 10, 'Armor:  -');

    terminal.drawText(0, 12, 'Inventory: 0 / 10');
  }

  String _bonus(int value) => value >= 0 ? '+$value' : value.toString();
}
