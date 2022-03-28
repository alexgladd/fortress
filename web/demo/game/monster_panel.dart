import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'hero.dart';
import 'monster.dart';

class MonsterPanel extends Frame {
  final Hero _hero;

  MonsterPanel(Rect bounds, Hero hero)
      : _hero = hero,
        super(bounds, 'Monsters',
            titleColor: Color.lightGold, borderColor: Color.gold, padding: 1);

  @override
  void renderContent(Terminal terminal) {
    final monsters = _hero.visibleMonsters..sort(_sortMonsters);

    if (monsters.isEmpty) {
      terminal.drawText(0, 0, 'None visible', Color.gray);
      return;
    }

    for (var i = 0; i < monsters.length; i++) {
      final monster = monsters[i];
      final text = '${monster.breed.symbol} ${monster.breed.name}';
      terminal.drawText(0, i, text, monsters[i].breed.color);
      terminal.drawChar(terminal.bounds.right - 1, i, _getThreat(monster));
    }
  }

  Char _getThreat(Monster m) {
    final atkDiff =
        (_hero.stats.attack - m.stats.attack) / _hero.stats.attack * 0.5;
    final defDiff =
        (_hero.stats.defense - m.stats.defense) / _hero.stats.defense * 0.5;
    final comp = atkDiff + defDiff;

    if (comp < -0.5) {
      return Char(CharCode.blackUpPointingTriangle, Color.red);
    } else if (comp >= -0.5 && comp <= 0.5) {
      return Char(CharCode.blackRectangle, Color.yellow);
    } else {
      return Char(CharCode.blackDownPointingTriangle, Color.green);
    }
  }

  int _sortMonsters(Monster a, Monster b) {
    final distanceA = _hero.sqDistanceTo(a);
    final distanceB = _hero.sqDistanceTo(b);
    return distanceA.compareTo(distanceB);
  }
}
