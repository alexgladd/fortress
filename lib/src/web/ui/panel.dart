import '../char.dart';
import '../color.dart';
import '../terminal.dart';
import '../user_interface.dart';
import '../../util/char_code.dart';
import '../../util/rect.dart';

/// Base panel class, with no border and optional padding and background
class Panel {
  final int _padding;

  Rect _bounds;
  Rect _contentBounds;

  /// Optional background color; uses the [Terminal]'s background color by default
  Color? background;

  /// Set a [void Function(Terminal)] implementation to render content within the panel. The
  /// provided [Terminal] is already set up such that it represents the full extent of the available
  /// content area of this [Panel]. You can use this to draw panels without subclassing and
  /// overriding [renderContent].
  void Function(Terminal)? contentRenderer;

  /// Panel bounds
  Rect get bounds => _bounds;

  /// Bounds [Rect] for the area available for content inside this panel
  Rect get contentBounds => _contentBounds;

  /// The width of the panel
  int get width => bounds.width;

  // The height of the panel
  int get height => bounds.height;

  /// Update the panel bounds; automatically updates the [contentBounds]
  set bounds(Rect newBounds) {
    _bounds = newBounds;
    _contentBounds = _bounds.shrink(_padding);
  }

  Panel(this._bounds, {this.background, int padding = 0})
      : _padding = padding,
        _contentBounds = _bounds.shrink(padding);

  /// Render the panel and its contents. This should be called from within [Layer.render].
  void render(Terminal terminal) {
    // render a background
    var bc = Char.create(CharCode.space, terminal.foreground, background ?? terminal.background);
    for (var point in bounds.getPoints()) {
      terminal.drawChar(point.x, point.y, bc);
    }

    // render the panel contents
    renderContent(terminal.childRect(contentBounds));
  }

  /// Render content within the panel. The provided [terminal] is already set up such that it
  /// represents the full extent of the available content area of this [Panel]. By default, this
  /// method calls [contentRenderer] if it is defined.
  void renderContent(Terminal terminal) {
    if (contentRenderer != null) contentRenderer!(terminal);
  }
}

/// Panel border types
enum PanelBorder {
  none,
  single,
  double,
  frame,
  solid,
}

enum _BorderChars {
  top,
  bottom,
  left,
  right,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}

const _singleBorderChars = ['─', '─', '│', '│', '┌', '┐', '└', '┘'];
const _doubleBorderChars = ['═', '═', '║', '║', '╔', '╗', '╚', '╝'];
const _frameBorderChars = ['═', '─', '│', '│', '╒', '╕', '└', '┘'];
const _solidBorderChars = ['▀', '▄', '▌', '▐', '█', '█', '█', '█'];

/// [Panel] with a rendered border, which can be of several types (see [PanelBorder]).
class BorderPanel extends Panel {
  final PanelBorder _border;

  /// Optional border color; defaults to [Terminal.foreground]
  Color? borderColor;

  BorderPanel(Rect bounds,
      {PanelBorder border = PanelBorder.single,
      this.borderColor,
      Color? background,
      int padding = 0})
      : _border = border,
        super(bounds,
            background: background, padding: border == PanelBorder.none ? padding : padding + 1);

  @override
  void render(Terminal terminal) {
    super.render(terminal);

    var fColor = borderColor ?? terminal.foreground;
    var bColor = background ?? terminal.background;

    // draw the border
    // top & bottom
    for (var x = bounds.left + 1; x < bounds.right - 1; x++) {
      terminal.drawChar(x, bounds.top, _getBorderChar(_BorderChars.top, fColor, bColor));
      terminal.drawChar(x, bounds.bottom - 1, _getBorderChar(_BorderChars.bottom, fColor, bColor));
    }

    // left & right
    for (var y = bounds.top + 1; y < bounds.bottom - 1; y++) {
      terminal.drawChar(bounds.left, y, _getBorderChar(_BorderChars.left, fColor, bColor));
      terminal.drawChar(bounds.right - 1, y, _getBorderChar(_BorderChars.right, fColor, bColor));
    }

    // corners
    terminal.drawChar(
        bounds.topLeft.x, bounds.topLeft.y, _getBorderChar(_BorderChars.topLeft, fColor, bColor));
    terminal.drawChar(bounds.topRight.x - 1, bounds.topRight.y,
        _getBorderChar(_BorderChars.topRight, fColor, bColor));
    terminal.drawChar(bounds.bottomRight.x - 1, bounds.bottomRight.y - 1,
        _getBorderChar(_BorderChars.bottomRight, fColor, bColor));
    terminal.drawChar(bounds.bottomLeft.x, bounds.bottomLeft.y - 1,
        _getBorderChar(_BorderChars.bottomLeft, fColor, bColor));
  }

  Char _getBorderChar(_BorderChars bc, Color foreground, Color background) {
    switch (_border) {
      case PanelBorder.none:
        return Char.create(CharCode.space, foreground, background);
      case PanelBorder.single:
        return Char.create(_singleBorderChars[bc.index], foreground, background);
      case PanelBorder.double:
        return Char.create(_doubleBorderChars[bc.index], foreground, background);
      case PanelBorder.frame:
        return Char.create(_frameBorderChars[bc.index], foreground, background);
      case PanelBorder.solid:
        return Char.create(_solidBorderChars[bc.index], foreground, background);
    }
  }
}

/// Special type of [Panel] using a [PanelBorder.frame] border that renders a title near the
/// top-right corner.
class Frame extends BorderPanel {
  final String _title;

  /// Optional title color; defaults to [Terminal.foreground]
  Color? titleColor;

  Frame(Rect bounds, this._title,
      {this.titleColor, Color? borderColor, Color? background, int padding = 0})
      : super(bounds,
            border: PanelBorder.frame,
            borderColor: borderColor,
            background: background,
            padding: padding);

  @override
  void render(Terminal terminal) {
    super.render(terminal);

    // draw the frame title
    var panelTerm = terminal.childRect(bounds);
    panelTerm.drawText(
        2, 0, ' $_title ', titleColor ?? terminal.foreground, background ?? terminal.background);
  }
}
