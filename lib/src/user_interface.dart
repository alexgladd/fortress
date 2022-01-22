// a logical user interface for the game (one per game)
// composed of a series of layers in a stack, each of which can be opaque or transparent
// each layer can handle user input independently
// eventually make a special layer called Scene which can be used for core game rendering

import 'input.dart';
import 'key_bindings.dart';
import 'terminal.dart';

/// Logical modal user interface that maintains a stack of UI [Layer]s and writes them to a
/// [Terminal]. The UI manages the main game loop and renders as efficiently as possible based on
/// the state of the [Layer] stack.
///
/// The UI also provides for input handling, which [Layer]s can opt into if needed.
class UserInterface<T extends InputBase> {
  /// Keyboard input bindings that this UI consumes and handles
  final keyBinds = KeyBindings<T>();

  /// Whether the UI's game loop is running and rendering frames. Initially off.
  bool get running => _running;

  /// Set to true to start the game loop for the UI and all of its [Layer]s. Leave this set to false
  /// if you want to manually manage updating and rendering the UI yourself.
  set running(bool value) {
    _running = value;

    if (_running) {} // TODO: start game loop
  }

  final _layers = <Layer<T>>[];

  RenderableTerminal? _terminal;
  bool _dirty = true;
  bool _running = false;
}

abstract class Layer<T extends InputBase> {}
