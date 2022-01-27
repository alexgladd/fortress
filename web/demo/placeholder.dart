import 'package:fortress/web.dart';

import 'input.dart';

const _text = 'Coming soon! Press [esc] to go back.';

class Placeholder extends Layer<Input> {
  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void render(Terminal terminal) {
    var term =
        terminal.child((terminal.width - _text.length) ~/ 2, terminal.height ~/ 2, _text.length, 1);
    term.drawText(0, 0, _text);
  }

  @override
  bool onInput(Input input) {
    switch (input) {
      case Input.cancel:
        ui.pop();
        return true;

      default:
        return false;
    }
  }
}
