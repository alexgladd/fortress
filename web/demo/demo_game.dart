import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

const _text = "There doesn't seem to be anything here yet...";
const _help = '[↑↓←→]: Move   [esc]: Quit';

class Minigame extends Layer<Input> {
  final hero = Char.create('@', Color.gold);
  bool firstRun = true;
  Vec2 heroPos = Vec2.zero;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void render(Terminal terminal) {
    var textTerm = terminal.child(
        (terminal.width - _text.length) ~/ 2, 10, _text.length, 1);
    textTerm.drawText(0, 0, _text);

    var helpTerm = terminal.child((terminal.width - _help.length) ~/ 2,
        terminal.height - 1, _help.length, 1);
    helpTerm.drawText(0, 0, _help, Color.gray);

    terminal.drawChar(heroPos.x, heroPos.y, hero);
  }

  @override
  bool onInput(Input input) {
    var moved = true;
    var handled = true;
    switch (input) {
      case Input.n:
        heroPos += Direction.n;
        break;

      case Input.e:
        heroPos += Direction.e;
        break;

      case Input.s:
        heroPos += Direction.s;
        break;

      case Input.w:
        heroPos += Direction.w;
        break;

      case Input.cancel:
        ui.pop();
        moved = false;
        break;

      default:
        moved = false;
        handled = false;
    }

    if (moved) {
      heroPos = ui.renderRect.clamp(heroPos);
      dirty();
    }

    return handled;
  }

  @override
  void onResize(Vec2 size) {
    if (firstRun) {
      heroPos = Vec2(size.x ~/ 2, size.y ~/ 2);
      firstRun = false;
      return;
    }

    heroPos = ui.renderRect.clamp(heroPos);
  }
}
