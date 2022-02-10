import 'dart:math' as math;

import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

const _backgroundColors = [
  Color.lightOrange,
  Color.orange,
  Color.darkOrange,
];

const _borderColors = [
  Color.white,
  Color.aqua,
  Color.gold,
  Color.green,
  Color.lightBlue,
  Color.purple,
  Color.red,
  Color.yellow,
];

final _borders = PanelBorder.values.sublist(1);

const _aboutText =
    'Modals render as a transparent layer over existing content.';

class Modals extends Layer<Input> {
  var _background = Array2<Char>(1, 1, Char.nill);
  String? _lastResult;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void render(Terminal terminal) {
    for (var y = 0; y < _background.height; y++) {
      for (var x = 0; x < _background.width; x++) {
        terminal.drawChar(x, y, _background.get(x, y));
      }
    }

    String pText;
    if (_lastResult == null) {
      pText = 'No results yet. Choose a modal to get started.';
    } else {
      pText = 'Your modal result was $_lastResult!';
    }

    var resultPanel = Panel.forContent(
        math.max(pText.length, _aboutText.length), 3,
        padding: 2, background: Color.darkOrange);
    resultPanel.contentRenderer = (terminal) {
      terminal.drawTextCenter(
          0, _aboutText, terminal.foreground, resultPanel.background);
      terminal.drawTextCenter(
          2, pText, terminal.foreground, resultPanel.background);
    };
    resultPanel.render(terminal.childRect(
        terminal.bounds.centerRect(resultPanel.width, resultPanel.height)));

    terminal.drawTextCenter(
        terminal.height - 1,
        '[1] OK modal. [2] OK/Cancel modal. [3] Yes/No modal.   '
        'Press [esc] to go back.',
        Color.gray);
  }

  @override
  void onActive(Layer<Input> popped, Object? result) {
    if (popped is! Modal || result == null || result is! String) return;

    _lastResult = result;
  }

  @override
  bool onKeyDown(String key, String code,
      {required bool shift,
      required bool altOpt,
      required bool ctrl,
      required bool meta}) {
    bool handled = true;

    Modal<Input>? m;
    switch (code) {
      case KeyCode.digit1:
        m = Modal<Input>.ok('This is a simple OK modal.',
            okResult: 'OK',
            borderType: rng.item(_borders),
            borderColor: rng.item(_borderColors),
            actionTextColor: Color.gray,
            padding: 2);
        break;

      case KeyCode.digit2:
        m = Modal<Input>.ok('This is a simple OK/Cancel modal.',
            showCancel: true,
            okResult: 'OK',
            cancelResult: 'Cancel',
            borderType: rng.item(_borders),
            borderColor: rng.item(_borderColors),
            actionTextColor: Color.gray,
            padding: 2);
        break;

      case KeyCode.digit3:
        m = Modal<Input>.yesNo('This is a simple Yes/No modal',
            yesResult: 'Yes',
            noResult: 'No',
            borderType: rng.item(_borders),
            borderColor: rng.item(_borderColors),
            actionTextColor: Color.gray,
            padding: 2);
        break;

      default:
        handled = false;
    }

    if (m != null) ui.push(m);

    return handled;
  }

  @override
  bool onInput(Input input) {
    bool handled = true;

    switch (input) {
      case Input.cancel:
        ui.pop();
        break;

      default:
        handled = false;
    }

    return handled;
  }

  @override
  void onResize(Vec2 size) {
    _background = Array2<Char>(size.x, size.y - 2, Char.clear);

    for (var y = 0; y < _background.height; y++) {
      for (var x = 0; x < _background.width; x++) {
        if (rng.percent(10)) {
          _background.set(x, y,
              Char.create(CharCode.mediumShade, rng.item(_backgroundColors)));
        }
      }
    }
  }
}
