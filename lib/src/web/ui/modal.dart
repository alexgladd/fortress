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

  /// The handler to call for Yes (y key) actions
  void Function() onYes = _doNothing;

  /// The handler to call for No (n key) actions
  void Function() onNo = _doNothing;

  /// General builder factory for [Modal]s. You need to set the handler functions appropriately
  /// based on what you want to use the modal for.
  factory Modal.builder(String panelText, String actionText,
      {PanelBorder borderType = PanelBorder.single,
      int padding = 1,
      Color? panelTextColor,
      Color? actionTextColor,
      Color? backgroundColor,
      Color? borderColor}) {
    // for each of these, the padding size and 1 for the border on each side
    var minWidth = math.max<int>(panelText.length, actionText.length) + ((1 + padding) * 2);
    var minHeight = 3 + ((1 + padding) * 2);

    // create the panel at the origin, we'll use a child terminal to make sure it gets centered
    var panel = BorderPanel(Rect.atOrigin(minWidth, minHeight),
        border: borderType,
        borderColor: borderColor,
        background: backgroundColor,
        padding: padding);

    // add a renderer to draw the panel and action texts
    panel.contentRenderer = (terminal) {
      terminal.drawTextCenter(0, panelText, panelTextColor);
      terminal.drawTextCenter(2, actionText, actionTextColor);
    };

    return Modal<T>(panel);
  }

  /// Creates a simple modal with "OK" (enter key) and optionally "Cancel" (esc key) actions. The
  /// modal panel will be rendered in the center of the [Terminal] that is used to [render] the
  /// modal's [Layer].
  factory Modal.ok(String panelText,
      {bool showCancel = false,
      PanelBorder borderType = PanelBorder.single,
      int? padding,
      Color? panelTextColor,
      Color? actionTextColor,
      Color? backgroundColor,
      Color? borderColor,
      Object? okResult,
      Object? cancelResult}) {
    var actionText = showCancel ? _okCancelText : _okText;

    var modal = Modal<T>.builder(panelText, actionText,
        borderType: borderType,
        padding: padding ?? 1,
        panelTextColor: panelTextColor,
        actionTextColor: actionTextColor,
        backgroundColor: backgroundColor,
        borderColor: borderColor);

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

  /// Creates a simple modal with "Yes" (y key) and "No" (n key) actions. The modal panel will be
  /// rendered in the center of the [Terminal] that is used to [render] the modal's [Layer].
  factory Modal.yesNo(String panelText,
      {PanelBorder borderType = PanelBorder.single,
      int? padding,
      Color? panelTextColor,
      Color? actionTextColor,
      Color? backgroundColor,
      Color? borderColor,
      Object? yesResult,
      Object? noResult}) {
    var modal = Modal<T>.builder(panelText, _yesNoText,
        borderType: borderType,
        padding: padding ?? 1,
        panelTextColor: panelTextColor,
        actionTextColor: actionTextColor,
        backgroundColor: backgroundColor,
        borderColor: borderColor);

    modal.onYes = () {
      modal.ui.pop(yesResult);
    };

    modal.onNo = () {
      modal.ui.pop(noResult);
    };

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
      case KeyCode.keyY:
        onYes();
        break;
      case KeyCode.keyN:
        onNo();
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
