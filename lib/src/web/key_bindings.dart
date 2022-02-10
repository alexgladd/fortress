import 'dart:html' as html;

import '../util/input.dart';
import 'key_code.dart';

/// Set of key bindings that map a particular keyboard input (including modifiers) to some logical
/// input.
///
/// See [KeyCode] for available keyboard codes.
class KeyBindings<T extends InputBase> {
  final _bindings = <_KeyBinding, T>{};

  /// Bind the given keyboard input to the given logical input.
  ///
  /// The given [keyCode] should be a recognized code from a browser
  /// [html.KeyboardEvent]. See [KeyCode] for a defined set of codes.
  void bind(T input, String keyCode,
      {bool shift = false,
      bool ctrl = false,
      bool altOpt = false,
      bool meta = false}) {
    var kb = _KeyBinding(keyCode,
        shift: shift, ctrl: ctrl, altOpt: altOpt, meta: meta);
    _bindings[kb] = input;
  }

  /// Find and return a logical input for the given keyboard input, if it
  /// exists.
  T? find(String keyCode,
      {bool shift = false,
      bool ctrl = false,
      bool altOpt = false,
      bool meta = false}) {
    var kb = _KeyBinding(keyCode,
        shift: shift, ctrl: ctrl, altOpt: altOpt, meta: meta);
    return _bindings[kb];
  }
}

class _KeyBinding {
  /// The key code for this binding
  final String keyCode;

  /// The shift modifier
  final bool shift;

  /// The control modifier
  final bool ctrl;

  /// The alt/opt modifier
  final bool altOpt;

  /// The meta modifier (Command on macOS)
  final bool meta;

  _KeyBinding(this.keyCode,
      {required this.shift,
      required this.ctrl,
      required this.altOpt,
      required this.meta});

  @override
  bool operator ==(Object other) {
    if (other is _KeyBinding) {
      return keyCode == other.keyCode &&
          shift == other.shift &&
          altOpt == other.altOpt &&
          meta == other.meta;
    }

    return false;
  }

  @override
  int get hashCode =>
      keyCode.hashCode ^ shift.hashCode ^ altOpt.hashCode ^ meta.hashCode;

  @override
  String toString() {
    var result = 'KEY($keyCode';
    if (shift) result += ' shift';
    if (altOpt) result += ' alt/opt';
    if (meta) result += ' win/cmd';
    return result + ')';
  }
}
