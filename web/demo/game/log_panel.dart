import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'game.dart';
import 'log.dart';

class LogPanel extends Frame {
  LogPanel(Rect bounds)
      : super(bounds, 'Log',
            titleColor: Color.gold, borderColor: Color.darkGold, padding: 1);

  @override
  void renderContent(Terminal terminal) {
    var lines = terminal.height;
    var logs = game.log.getLogs(lines);

    for (var i = 0; i < logs.length; i++) {
      // TODO: word-wrap log panel text
      terminal.drawText(0, i, logs[i].msg, _textColor(logs[i].type));
    }
  }

  Color _textColor(LogType type) {
    switch (type) {
      case LogType.message:
        return Color.gray;
      case LogType.combat:
        return Color.white;
    }
  }
}
