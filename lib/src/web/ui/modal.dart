import 'dart:math' as math;

import '../color.dart';
import '../key_code.dart';
import '../terminal.dart';
import '../user_interface.dart';
import '../../util/input.dart';
import '../../util/rect.dart';
import 'panel.dart';

abstract class BaseModal<T extends InputBase> extends Layer<T> {
  final Panel panel;

  BaseModal(this.panel);

  @override
  void render(Terminal terminal) {
    panel.render(terminal);
  }
}

class Modal<T extends InputBase> extends BaseModal<T> {
  static const _okText = 'OK [enter]';
  static const _okCancelText = '$_okText   Cancel [esc]';
  static const _yesNoText = 'Yes [y]   No [n]';

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => true;

  /// The handler to call for OK (enter key) actions
  void Function() onOk = _doNothing;

  /// The handler to call for Cancel (esc key) actions
  void Function() onCancel = _doNothing;

  /// Creates a simple modal with "OK" (enter key) and optionally "Cancel" (esc key) actions. The
  /// modal panel will be rendered in the center of the [Terminal] that is used to [render] the
  /// modal's [Layer].
  factory Modal.ok(String panelText,
      {bool showCancel = false,
      PanelBorder borderType = PanelBorder.single,
      Color? panelTextColor,
      Color? actionTextColor,
      Color? backgroundColor,
      Color? borderColor,
      Object? okResult,
      Object? cancelResult}) {
    var actionText = showCancel ? _okCancelText : _okText;
    // add 4 here for border + padding on each side
    var minWidth = math.max(panelText.length, actionText.length) + 4;
    // one like for panel text, one empty line, one line for action text, plus 4 for border/padding
    var minHeight = 4 + 3;
    var panel = BorderPanel(Rect.atOrigin(minWidth, minHeight),
        border: borderType, borderColor: borderColor, background: backgroundColor, padding: 1);

    panel.contentRenderer = (terminal) {
      terminal.drawTextCenter(0, panelText, panelTextColor);
      terminal.drawTextCenter(2, actionText, actionTextColor);
    };

    var modal = Modal<T>(panel);

    modal.onOk = () {
      modal.ui.pop(okResult);
    };

    if (showCancel) {
      modal.onCancel = () {
        modal.ui.pop(cancelResult);
      };
    }

    return modal;
  }

  Modal(Panel panel) : super(panel);

  @override
  void render(Terminal terminal) {
    if (!terminal.bounds.contains(panel.bounds)) {
      // need to re-size the panel
      panel.bounds = terminal.bounds;
    }

    var panelTerm = terminal.childRect(terminal.bounds.centerRect(panel.width, panel.height));
    panel.render(panelTerm);
  }

  @override
  bool onKeyDown(String key, String code,
      {required bool shift, required bool altOpt, required bool ctrl, required bool meta}) {
    bool handled = true;

    switch (code) {
      case KeyCode.enter:
        onOk();
        break;
      case KeyCode.escape:
        onCancel();
        break;
      default:
        handled = false;
    }

    return handled;
  }

  static void _doNothing() {
    // default empty handler
  }
}
