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
    final lines = terminal.height;
    final logs = game.log.getLogs(lines);
    var line = 0;

    for (var i = 0; i < logs.length; i++) {
      final msgLines = wordWrap(logs[i].msg, terminal.width - 2);
      final color = _textColor(logs[i].type);

      for (var n = 0; n < msgLines.length; n++) {
        if (line < lines) {
          terminal.drawText(
              0, line, n == 0 ? '» ${msgLines[n]}' : '  ${msgLines[n]}', color);
          line++;
        }
      }

      if (line >= lines) break;
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
