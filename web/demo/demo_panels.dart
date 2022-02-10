import 'dart:math' as math;

import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

final _rand = math.Random(DateTime.now().millisecondsSinceEpoch);

const _panelColors = [
  Color.white,
  Color.gray,
  Color.aqua,
  Color.lightPurple,
  Color.lightRed,
  Color.gold,
  Color.orange,
  Color.yellow,
  Color.blue,
  Color.lightGreen,
  Color.lightBrown,
];

Color get _randomColor {
  var idx = _rand.nextInt(_panelColors.length);
  return _panelColors[idx];
}

class DemoPanel extends BorderPanel {
  final PanelBorder _type;

  DemoPanel(Rect bounds, PanelBorder type, [Color? borderColor])
      : _type = type,
        super(bounds, border: type, borderColor: borderColor);

  @override
  void renderContent(Terminal terminal) {
    String bType;
    switch (_type) {
      case PanelBorder.none:
        bType = 'none';
        break;
      case PanelBorder.single:
        bType = 'single';
        break;
      case PanelBorder.double:
        bType = 'double';
        break;
      case PanelBorder.frame:
        bType = 'frame';
        break;
      case PanelBorder.solid:
        bType = 'solid';
        break;
    }

    var txt = 'This is a $bType border Panel!';

    terminal.drawText(
        (terminal.width - txt.length) ~/ 2, terminal.height ~/ 2, txt);
  }
}

class DemoFrame extends Frame {
  static const _text = 'This is a Frame!';

  DemoFrame(Rect bounds, [Color? borderColor])
      : super(bounds, 'Demo Frame', borderColor: borderColor);

  @override
  void renderContent(Terminal terminal) {
    terminal.drawText(
        (terminal.width - _text.length) ~/ 2, terminal.height ~/ 2, _text);
  }
}

class Panels extends Layer<Input> {
  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void render(Terminal terminal) {
    var pTerm = terminal.childRect(terminal.bounds.shrink(1));
    var midX = pTerm.size.x ~/ 2;
    var midY = pTerm.size.y ~/ 2;

    var singlePanel = DemoPanel(
        Rect.sides(0, midX, midY, 0), PanelBorder.single, _randomColor);
    var doublePanel = DemoPanel(Rect.sides(0, pTerm.size.x, midY, midX + 1),
        PanelBorder.double, _randomColor);
    var solidPanel = DemoPanel(Rect.sides(midY + 1, midX, pTerm.size.y, 0),
        PanelBorder.solid, _randomColor);
    var frame = DemoFrame(
        Rect.sides(midY + 1, pTerm.size.x, pTerm.size.y, midX + 1),
        _randomColor);

    singlePanel.render(pTerm);
    doublePanel.render(pTerm);
    solidPanel.render(pTerm);
    frame.render(pTerm);

    var help = 'Press [enter] to randomize colors. Press [esc] to go back.';
    terminal.drawText((terminal.width - help.length) ~/ 2, 0, help, Color.gray);
  }

  @override
  bool onInput(Input input) {
    var handled = true;
    switch (input) {
      case Input.cancel:
        ui.pop();
        break;

      case Input.ok:
        dirty();
        break;

      default:
        handled = false;
    }

    return handled;
  }
}
