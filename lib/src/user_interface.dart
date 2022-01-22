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

  /// Update the UI state, including all [Layer]s currently binded to the UI, regardless of whether
  /// they're currently visible or not. The provided value, [dt], is the elapsed time in
  /// milliseconds since the last call to [update]. You can use this value to provide consistent
  /// animations or game flow regardless of the underlying framerate.
  void update(num dt) {}

  /// Renders the current game state to the current terminal, if one is currently bound to this UI.
  /// If manually calling [render], you can request that the UI render regardless of the current
  /// dirty state by setting [ignoreDirty] to true.
  void render([bool ignoreDirty = false]) {}

  /// Require the UI to render during the next [render] call.
  void dirty() {
    _dirty = true;
  }
}

/// Each [Layer] in the [UserInterface] can manage different aspects of the overall game. For
/// instance, one layer for the game map, one layer for an information side panel, another layer
/// for each different pop-up, etc. Layers can be opaque or transparent to control how far down the
/// [UserInterface]'s stack of Layers the game gets rendered.
///
/// Each [Layer] has its own [update] and [render] methods that the bound [UserInterface] will
/// call automatically. [Layer]s can also manage their own input handling.
abstract class Layer<T extends InputBase> {
  UserInterface<T>? _ui;

  /// The [UserInterface] that this [Layer] is bound to.
  /// Throws an exception if the layer is not currently bound.
  UserInterface<T> get ui {
    if (_ui != null) return _ui!;
    throw StateError('Attempted to access Layer.ui while Layer is unbound');
  }

  /// Returns true if the layer is currently bound to a [UserInterface].
  bool get isBound => _ui != null;

  /// Should true if this layer is transparent, allowing the layer below it to render. Returns
  /// false if this layer is opaque.
  bool get isTransparent;

  /// Update the state of this [Layer]. The provided value, [dt], is the elapsed time in
  /// milliseconds since the last call to [update].
  void update(num dt);

  /// Render the [Layer] using the given [Terminal].
  void render(Terminal terminal);

  /// Called by the UI when the [Layer] above this one has been popped, making this layer the
  /// top-most in the bound [UserInterface]. If a result value was passed to [UserInterface.pop], it
  /// is provided here as [result].
  void onTopLayer(Layer<T> popped, Object? result) {}

  /// Inform the bound [UserInterface] that this [Layer] needs to be rendered during the next
  /// [UserInterface.render] call.
  void dirty() {
    if (isBound) ui.dirty();
  }
}
