import '../char.dart';
import '../color.dart';
import '../terminal.dart';
import '../user_interface.dart';
import '../../util/char_code.dart';
import '../../util/rect.dart';

abstract class Panel {
  final int _padding;

  Rect _bounds;
  Rect _contentBounds;

  Color? background;

  Rect get bounds => _bounds;
  Rect get contentBounds => _contentBounds;

  set bounds(Rect newBounds) {
    _bounds = newBounds;
    _contentBounds = _bounds.shrink(_padding);
  }

  Panel(this._bounds, {this.background, int padding = 0})
      : _padding = padding,
        _contentBounds = _bounds.shrink(padding);

  /// Render the panel and its contents. This should be called from within [Layer.render].
  void render(Terminal terminal) {
    // render a background if we have one
    if (background != null) {
      var bc = Char.create(CharCode.space, terminal.foreground, background);
      for (var point in bounds.getPoints()) {
        terminal.drawChar(point.x, point.y, bc);
      }
    }

    // render the panel contents
    renderContent(terminal.childRect(contentBounds));
  }

  /// Render content within the panel. The provided [terminal] is already set up such that it
  /// represents the full extent of the available content area of this [Panel].
  void renderContent(Terminal terminal);
}

enum PanelBorder {
  none,
  single,
  double,
  frame,
  solid,
}

enum BorderChars {
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

abstract class BorderPanel extends Panel {
  final PanelBorder _border;

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
      terminal.drawChar(x, bounds.top, _getBorderChar(BorderChars.top, fColor, bColor));
      terminal.drawChar(x, bounds.bottom - 1, _getBorderChar(BorderChars.bottom, fColor, bColor));
    }

    // left & right
    for (var y = bounds.top + 1; y < bounds.bottom - 1; y++) {
      terminal.drawChar(bounds.left, y, _getBorderChar(BorderChars.left, fColor, bColor));
      terminal.drawChar(bounds.right - 1, y, _getBorderChar(BorderChars.right, fColor, bColor));
    }

    // corners
    terminal.drawChar(
        bounds.topLeft.x, bounds.topLeft.y, _getBorderChar(BorderChars.topLeft, fColor, bColor));
    terminal.drawChar(bounds.topRight.x - 1, bounds.topRight.y,
        _getBorderChar(BorderChars.topRight, fColor, bColor));
    terminal.drawChar(bounds.bottomRight.x - 1, bounds.bottomRight.y - 1,
        _getBorderChar(BorderChars.bottomRight, fColor, bColor));
    terminal.drawChar(bounds.bottomLeft.x, bounds.bottomLeft.y - 1,
        _getBorderChar(BorderChars.bottomLeft, fColor, bColor));
  }

  Char _getBorderChar(BorderChars bc, Color foreground, Color background) {
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

abstract class Frame extends BorderPanel {
  final String _title;

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
    panelTerm.drawText(2, 0, ' $_title ');
  }
}
