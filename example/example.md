The following example demonstrates how to use various core components of Fortress to begin drawing
on an HTML canvas element.

First, we'll create a `CanvasTerminal` using the default `GlyphRenderer`.

```dart
import 'dart:html' as html;

import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

// get a reference to the container Element
var container = html.querySelector('#container')!;
// create the CanvasTerminal
var terminal = CanvasTerminal.withParent(container, CanvasRendererType.glyph,
    scale: html.window.devicePixelRatio.toInt());
```

You can use the terminal as-is to draw directly to the canvas...

```dart
// draw text centered in the top row of the terminal as rendered onto the canvas
terminal.drawTextCenter(0, 'Hello world!');
terminal.render();
```

...or leverage higher-level utilities like the `UserInterface` and custom `Layer`s to implement a
more complex game.

```dart
// implement your input handling
class Input extends InputBase {
  static const increment = Input('increment');
  const Input(String name) : super(name);
}

// create a UI
var ui = UserInterface<Input>(terminal);

// add bound inputs to the UI
ui.handlingKeyInput = true;
ui.keyBinds.bind(Input.increment, KeyCode.enter);

// implement a simple Layer
class MyLayer extends Layer<Input> {
  var count = 0;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void render(Terminal terminal) {
    terminal.drawTextCenter(0, 'You pressed [enter] $count times!');
  }

  @override
  bool onInput(Input input) {
    switch (input) {
      case Input.increment:
        count++;
        dirty(); // tell the UI that the layer should be rendered next frame
        return true;
      
      default:
        return false;
    }
  }
}

// push an instance of your layer onto the UI's layer stack
ui.push(MyLayer());

// tell the UI to start running the game loop, which will automatically update and render your layer
ui.running = true;
```

For a more complete example, see [main.dart](../web/main.dart) and the [demos](../web/demo) within
this package's web code. You can see these demos in action on the Fortress
[homepage](https://alexgladd.github.io/fortress/).
