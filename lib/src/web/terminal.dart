import 'char.dart';
import 'color.dart';
import 'renderer.dart';
import '../util/array.dart';
import '../util/char_code.dart';
import '../util/vector.dart';

/// A virtual terminal screen that can have character data written onto it
abstract class Terminal {
  /// The width of the terminal screen in columns of characters
  int get width;

  /// The height of the terminal screen in rows of characters
  int get height;

  /// The size of the terminal as a vector
  Vec2 get size;

  /// The default foreground color when none is specified
  Color foreground = Color.white;

  /// The default background color when none is specified
  Color background = Color.black;

  /// Most basic draw method for the terminal; draws the given [Char] at column [x], row [y] of this
  /// [Terminal].
  ///
  /// Must be implemented by subclasses.
  void drawChar(int x, int y, Char char);

  /// Draws a character at column [x], row [y] of this [Terminal] using its integer [charCode]
  /// using the given [foreground] and [background] [Color]s (or default colors).
  void drawCharCode(int x, int y, int charCode, [Color? foreground, Color? background]) {
    foreground ??= this.foreground;
    background ??= this.background;

    drawChar(x, y, Char.create(charCode, foreground, background));
  }

  /// Draws the string of characters in [text] starting at column [x], row [y] of this [Terminal]
  /// using the given [foreground] and [background] [Color]s (or default colors). The text will be
  /// truncated if it runs beyond the bounds of the terminal.
  void drawText(int x, int y, String text, [Color? foreground, Color? background]) {
    foreground ??= this.foreground;
    background ??= this.background;

    for (var i = 0; i < text.length; i++) {
      if (x + i >= width) break;
      drawChar(x + i, y, Char.create(text.codeUnits[i], foreground, background));
    }
  }

  /// Clears and fills the given rectangle with the given (or default) background [Color].
  void fill(final int x, int y, int width, int height, [Color? color]) {
    color ??= background;

    // fail fast
    boundsCheck(x, y);
    boundsCheck(x + width - 1, y + height - 1);

    var char = Char.create(CharCode.space, foreground, color);

    for (var fy = y; fy < y + height; fy++) {
      for (var fx = x; fx < x + width; fx++) {
        drawChar(fx, fy, char);
      }
    }
  }

  /// Clears the entire terminal with empty characters using the current [background] [Color].
  void clear() => fill(0, 0, width, height);

  /// Get a child [Terminal] within this one
  Terminal child(int x, int y, int width, int height) {
    boundsCheck(x, y);
    boundsCheck(x + width - 1, y + height - 1);
    return ChildTerminal(Vec2(x, y), Vec2(width, height), this);
  }

  /// Ensures that the given position [x], [y] is within the bounds of this [Terminal]
  void boundsCheck(int x, int y) {
    if (x < 0 || x >= width) throw RangeError.range(x, 0, width - 1);
    if (y < 0 || y >= height) throw RangeError.range(y, 0, height - 1);
  }
}

/// A [Terminal] representing a subset of a parent [Terminal]. Will always be fully-enclosed by the
/// parent terminal. Useful for drawing UI elements without needing to keep track of offsets.
class ChildTerminal extends Terminal {
  final Vec2 _position;
  final Vec2 _size;
  final Terminal _root;

  @override
  int get width => _size.x;

  @override
  int get height => _size.y;

  @override
  Vec2 get size => _size;

  ChildTerminal(this._position, this._size, this._root);

  @override
  void drawChar(int x, int y, Char char) {
    boundsCheck(x, y);
    _root.drawChar(_position.x + x, _position.y + y, char);
  }

  /// Flatten out child terminals to always draw onto the same root
  @override
  Terminal child(int x, int y, int width, int height) {
    boundsCheck(x, y);
    boundsCheck(x + width - 1, y + height - 1);
    return ChildTerminal(_position + Vec2(x, y), Vec2(width, height), _root);
  }
}

abstract class RenderableTerminal<T extends Renderer> extends Terminal {
  final TerminalState _state;
  final T _renderer;

  @override
  int get width => _state.width;

  @override
  int get height => _state.height;

  @override
  Vec2 get size => _state.size;

  /// The renderer used by this [RenderableTerminal]
  T get renderer => _renderer;

  RenderableTerminal(int columns, int rows, T renderer)
      : _state = TerminalState(columns, rows),
        _renderer = renderer;

  /// Renders the [RenderableTerminal]
  void render() {
    _state.render(renderer);
  }

  @override
  void drawChar(int x, int y, Char char) {
    boundsCheck(x, y);
    _state.setChar(x, y, char);
  }

  /// Converts the given position on the rendered display in pixels to a column/row position on this
  /// [RenderableTerminal].
  Vec2 pixelsToPosition(Vec2 pixels);
}

class TerminalState {
  /// The current terminal state (i.e., what was most recently rendered)
  final Array2<Char> _state;

  /// The updated terminal state (i.e., all changes that are due to be rendered)
  final Array2<Char?> _changedState;

  TerminalState(int width, int height)
      : _state = Array2(width, height, Char.nill),
        _changedState = Array2(width, height, Char.clear);

  int get width => _state.width;
  int get height => _state.height;
  Vec2 get size => _state.size;

  /// Requests that the character at position [x], [y] gets represented as [char] during the next
  /// render call
  void setChar(int x, int y, Char char) {
    if (_state.get(x, y) != char) {
      _changedState.set(x, y, char);
    } else {
      _changedState.set(x, y, null);
    }
  }

  /// Uses the given [renderer] to redraw every character in the terminal that has changed since the
  /// last [render] call
  void render(Renderer renderer) {
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var char = _changedState.get(x, y);
        if (char == null) continue;

        renderer.renderChar(x, y, char);

        // up to date now
        _state.set(x, y, char);
        _changedState.set(x, y, null);
      }
    }
  }
}
