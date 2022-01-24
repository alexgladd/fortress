// a logical user interface for the game (one per game)
// composed of a series of layers in a stack, each of which can be opaque or transparent
// each layer can handle user input independently
// eventually make a special layer called Scene which can be used for core game rendering

import 'dart:async';
import 'dart:html' as html;

import 'util/input.dart';
import 'key_bindings.dart';
import 'terminal.dart';
import 'util/vector.dart';

/// Logical modal user interface that maintains a stack of UI [Layer]s and writes them to a
/// [Terminal]. The UI manages the main game loop and renders as efficiently as possible based on
/// the state of the [Layer] stack.
///
/// The UI also provides for input handling, which [Layer]s can opt into if needed.
class UserInterface<T extends InputBase> {
  final _layers = <Layer<T>>[];

  StreamSubscription<html.KeyboardEvent>? _keyDownSubscription;
  StreamSubscription<html.KeyboardEvent>? _keyUpSubscription;
  RenderableTerminal? _terminal;
  bool _dirty = true;
  bool _running = false;
  bool _handlingKeyInput = false;

  /// Keyboard input bindings that this UI consumes and handles.
  ///
  /// Note that bound inputs are triggered on key down events.
  final keyBinds = KeyBindings<T>();

  /// Whether the UI's game loop is running and rendering frames. Initially off.
  bool get running => _running;

  /// Set to true to start the game loop for the UI and all of its [Layer]s. Leave this set to false
  /// if you want to manually manage updating and rendering the UI yourself.
  set running(bool value) {
    _running = value;

    if (_running) html.window.requestAnimationFrame(_onTick);
  }

  /// Set to true to have the [UserInterface] begin handling keyboard input events and delegating
  /// them to its layers based on the current [keyBinds]. Set to false to cancel all keyboard event
  /// handling within this UI.
  ///
  /// Note that only the top [Layer] on the stack will recieve keyboard input events.
  set handlingKeyInput(bool value) {
    if (value == _handlingKeyInput) return;
    _handlingKeyInput = value;

    if (value) {
      _keyDownSubscription = html.document.body!.onKeyDown.listen(_onKeyDown);
      _keyUpSubscription = html.document.body!.onKeyUp.listen(_onKeyUp);
    } else {
      _keyDownSubscription?.cancel();
      _keyDownSubscription = null;

      _keyUpSubscription?.cancel();
      _keyUpSubscription = null;
    }
  }

  // TODO: mouse input handling

  /// Assign a new [RenderableTerminal] to this UI.
  set terminal(RenderableTerminal terminal) {
    var resized = _terminal == null || _terminal!.size != terminal.size;

    _terminal = terminal;

    if (resized) {
      for (var layer in _layers) {
        layer.onResize(terminal.size);
      }
    }

    dirty();
  }

  UserInterface([this._terminal]);

  /// Push a new [Layer] onto the top of the stack.
  void push(Layer<T> layer) {
    layer._bindUi(this);
    _layers.add(layer);
    dirty();
  }

  /// Pop the top-most [Layer] off of the stack and activate the one below it (if there is one),
  /// passing the optional [result] value.
  void pop([Object? result]) {
    if (_layers.isEmpty) return;

    var layer = _layers.removeLast();
    layer._unbindUi();

    // activate the new top layer if there is one
    if (_layers.isNotEmpty) _layers.last.onActive(layer, result);

    dirty();
  }

  /// Swap the top-most [Layer] on the stack for the given [layer].
  ///
  /// This is equivalent to a [pop] followed by a [push].
  void swap(Layer<T> layer) {
    if (_layers.isNotEmpty) {
      var top = _layers.removeLast();
      top._unbindUi();
    }

    layer._bindUi(this);
    _layers.add(layer);
    dirty();
  }

  /// Update all of the [Layer]s currently bound to the UI, regardless of whether
  /// they're currently visible or not. The provided value, [dt], is the elapsed time in
  /// milliseconds since the last call to [update]. You can use this value to provide consistent
  /// animations or game flow regardless of the underlying framerate.
  void update(num dt) {
    for (var i = 0; i < _layers.length; i++) {
      _layers[i].update(dt);
    }
  }

  /// Renders the current game state to the current terminal, if one is currently bound to this UI.
  /// If manually calling [render], you can request that the UI render regardless of the current
  /// dirty state by setting [ignoreDirty] to true.
  void render([bool ignoreDirty = false]) {
    if (!ignoreDirty && !_dirty) return;

    // grab a ref to the current terminal so we can use it for this entire render step even if it
    // changes
    var term = _terminal;

    // nothing to render if there is no bound terminal
    if (term == null) return;

    term.clear();

    // find the first opaque layer
    var i = _layers.length - 1;
    while (i >= 0) {
      if (!_layers[i].isTransparent) break;
      i--;
    }

    if (i < 0) i = 0;

    // render the top opaque layer and all above it
    for (; i < _layers.length; i++) {
      _layers[i].render(term);
    }

    term.render();
    _dirty = false;
  }

  /// Require the UI to render during the next [render] call.
  void dirty() {
    _dirty = true;
  }

  /// The primary game loop, driven by the browser's [html.Window.requestAnimationFrame].
  void _onTick(num dt) {
    update(dt);
    render();

    if (running) html.window.requestAnimationFrame(_onTick);
  }

  /// Internal key down event handler; use key down events to trigger bound inputs
  void _onKeyDown(html.KeyboardEvent event) {
    // not sure if this ever even happens?
    if (event.code == null) return;

    var input = keyBinds.find(event.code!,
        shift: event.shiftKey, ctrl: event.ctrlKey, altOpt: event.altKey, meta: event.metaKey);

    // always consume the event for bound inputs
    if (input != null) event.preventDefault();

    // nothing else to do if there are no layers
    if (_layers.isEmpty) return;

    var layer = _layers.last;

    // check if the layer is handling input
    if (!layer.isHandlingInput) return;
    // check if the layer consumed the high-level input
    if (input != null && layer.onInput(input)) return;

    // finally, fire the low-level handler and consume the event if needed
    if (layer.onKeyDown(event.key!, event.code!,
        shift: event.shiftKey, ctrl: event.ctrlKey, altOpt: event.altKey, meta: event.metaKey)) {
      event.preventDefault();
    }
  }

  /// Internal key up event handler
  void _onKeyUp(html.KeyboardEvent event) {
    // nothing to do if there are no layers
    if (_layers.isEmpty) return;
    // not sure if this ever even happens?
    if (event.code == null) return;

    var layer = _layers.last;

    if (layer.onKeyUp(event.key!, event.code!,
        shift: event.shiftKey, ctrl: event.ctrlKey, altOpt: event.altKey, meta: event.metaKey)) {
      event.preventDefault();
    }
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

  /// Should return true if this layer wants to handle input when it is the active (top-most) layer.
  /// Returns false if any bound [UserInterface] should not pass any input to the layer.
  bool get isHandlingInput;

  /// Update the state of this [Layer]. The provided value, [dt], is the elapsed time in
  /// milliseconds since the last call to [update].
  void update(num dt);

  /// Render the [Layer] using the given [Terminal].
  void render(Terminal terminal);

  /// Called by the UI when the [Layer] above this one has been popped, making this layer the
  /// top-most in the bound [UserInterface]. If a result value was passed to [UserInterface.pop], it
  /// is provided here as [result].
  void onActive(Layer<T> popped, Object? result) {}

  /// Called whenever this [Layer] is bound to a new [UserInterface] or the [Terminal] assigned to
  /// the bound UI changes.
  void onResize(Vec2 size) {}

  /// If one is bound, the [UserInterface] will pass all bound input events to this [Layer] if it is
  /// the active (top-most) layer. If this method returns false (the default ), the respective
  /// lower-level input handler will be called.
  ///
  /// See [UserInterface.keyBinds]
  ///
  /// See ...
  bool onInput(T input) => false;

  /// If this [Layer] is active (top-most) and accepting inputs, any keyboard key down events not
  /// handled by the higher-level [Layer.onInput] handler will be passed here by the bound
  /// [UserInterface].
  ///
  /// The given [key] is the value of the key that's down, taking into consideration all of the
  /// modifiers that are also active ([shift], [altOpt], [ctrl], and [meta]). The given [code] is
  /// the value of the physical keyboard key that's down, ignoring keyboard layout and modifiers.
  ///
  /// Return true to indicate that this layer consumed the key down event.
  bool onKeyDown(String key, String code,
          {required bool shift, required bool altOpt, required bool ctrl, required bool meta}) =>
      false;

  /// If this [Layer] is active (top-most) and accepting inputs, all keyboard key up events will be
  /// passed here by the bound [UserInterface].
  ///
  /// The given [key] is the value of the key that's down, taking into consideration all of the
  /// modifiers that are also active ([shift], [altOpt], [ctrl], and [meta]). The given [code] is
  /// the value of the physical keyboard key that's down, ignoring keyboard layout and modifiers.
  ///
  /// Return true to indicate that this layer consumed the key up event.
  bool onKeyUp(String key, String code,
          {required bool shift, required bool altOpt, required bool ctrl, required bool meta}) =>
      false;

  /// Inform the bound [UserInterface] that this [Layer] needs to be rendered during the next
  /// [UserInterface.render] call.
  void dirty() {
    if (isBound) ui.dirty();
  }

  // Bind this layer to the given UI
  void _bindUi(UserInterface<T> ui) {
    _ui = ui;
    if (ui._terminal != null) onResize(ui._terminal!.size);
  }

  // Unbind this layer from its current UI
  void _unbindUi() {
    if (_ui != null) _ui = null;
  }
}
