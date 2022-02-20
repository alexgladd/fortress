import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

const _text = "There doesn't seem to be anything here yet...";
const _help = '[↑↓←→]: Move   [esc]: Quit';

class HeroController extends Behavior {
  final Rect bounds;
  late final InputHandler<Input> input;

  HeroController(this.bounds);

  @override
  void start() {
    input = gameObject.get<InputHandler<Input>>()!;
    print('HeroController has input comp: $input');
  }

  @override
  void update(double ds) {
    var pos = gameObject.position;
    if (input.hasInput(Input.n)) gameObject.position += Direction.n;
    if (input.hasInput(Input.e)) gameObject.position += Direction.e;
    if (input.hasInput(Input.s)) gameObject.position += Direction.s;
    if (input.hasInput(Input.w)) gameObject.position += Direction.w;

    gameObject.position = bounds.clamp(gameObject.position);

    if (gameObject.position != pos) gameObject.dirty();
  }
}

class Minigame extends GameLayer<Input> {
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

    super.render(terminal);
  }

  @override
  void start() {
    super.start();

    add(hero);
    hero.add(InputHandler<Input>());
    hero.add(HeroController(ui.renderRect));
    hero.position = ui.renderRect.center;
    hero.renderer.set(char: '@', foreground: Color.gold);

    print('HERO $hero');

    print('ECS entities ${ecs.entities.length}');
    print('ECS components ${ecs.components.length}');
  }

  @override
  bool onInput(Input input) {
    super.onInput(input);

    if (input == Input.cancel) {
      ui.pop();
      return true;
    }

    return false;
  }

  @override
  void onResize(Vec2 size) {
    hero.position = ui.renderRect.clamp(hero.position);
  }
}
