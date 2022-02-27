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
    terminal.drawText(
        0, 0, 'Health: ${_hero.health.current} / ${_hero.health.max}');

    var speedPct = _hero.actionsPerTurn.clamp(0.0, 1.0) * 100.0;
    terminal.drawText(0, 2, 'Speed: ${speedPct.toStringAsPrecision(3)}%');
  }
}
