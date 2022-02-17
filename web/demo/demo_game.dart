import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

const _text = "There doesn't seem to be anything here yet...";
const _help = '[↑↓←→]: Move   [esc]: Quit';

class Minigame extends Layer<Input> {
  final hero = GameObject();

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

    terminal.drawChar(hero.transform.x, hero.transform.y, hero.renderer.char);
  }

  @override
  void start() {
    hero.position = ui.renderRect.center;
    hero.renderer.set(char: '@', foreground: Color.gold);

    print('HERO $hero');

    // print('ECS entities ${ecs.entities.length}');
    // print('ECS components ${ecs.components.length}');
  }

  @override
  bool onInput(Input input) {
    var moved = true;
    var handled = true;
    switch (input) {
      case Input.n:
        hero.position += Direction.n;
        break;

      case Input.e:
        hero.position += Direction.e;
        break;

      case Input.s:
        hero.position += Direction.s;
        break;

      case Input.w:
        hero.position += Direction.w;
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
      hero.position = ui.renderRect.clamp(hero.position);
      dirty();
    }

    return handled;
  }

  @override
  void onResize(Vec2 size) {
    hero.position = ui.renderRect.clamp(hero.position);
  }
}
