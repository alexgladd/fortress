import 'dart:html' as html;
import 'dart:math' as math;

import 'canvas_renderer.dart';
import 'canvas_terminal.dart';
import 'char.dart';
import '../util/vector.dart';

/// Renders characters to a [CanvasTerminal] using normal fonts and text
/// drawing. Can draw any character supported by the supplied font. This
/// renderer works best if you keep the scale at 1 and instead adjust the pixel
/// size of the supplied font string based on the device pixel density.
class FontRenderer extends CanvasRenderer {
  /// Default font string for standard scale
  static const cssFont = 'normal 12 "Menlo", "Courier", monospace';

  /// Default font string for high pixel density scale
  static const cssFont2x = 'normal 24px "Menlo", "Courier", monospace';

  /// Measure the size of the given [text] (or a single character by default) in
  /// pixels using the given 2D [context] and the given CSS [font] string.
  static Vec2 measureText(html.CanvasRenderingContext2D context, String font,
      [String? text]) {
    text ??= 'a';
    context.textBaseline = 'top';
    context.font = font;
    var metrics = context.measureText(String.fromCharCode(0x2588));

    // get the width
    int left = metrics.actualBoundingBoxLeft?.round() ?? 0;
    int right = metrics.actualBoundingBoxRight?.round() ?? 0;
    int width = math.max(metrics.width?.round() ?? 0, left.abs() + right.abs());

    // get the height
    int ascent = metrics.actualBoundingBoxAscent?.round() ?? 0;
    int descent = metrics.actualBoundingBoxDescent?.round() ?? 0;
    int height = ascent.abs() + descent.abs();

    print(
        'MEASURE: left $left, right $right, ascent $ascent, descent $descent');
    print('CHAR width $width, height $height');

    return Vec2(width, height);
  }

  final String font;
  final Vec2 charSize;

  @override
  int get charHeight => charSize.y;

  @override
  int get charWidth => charSize.x;

  // TODO: maybe revisit this when handling custom font loads
  @override
  Future<void> get loaded => Future<void>.value();

  FontRenderer(html.CanvasRenderingContext2D context,
      [int scale = 1, String? font])
      : font = font ?? (scale < 2 ? cssFont : cssFont2x),
        charSize =
            measureText(context, font ?? (scale < 2 ? cssFont : cssFont2x)),
        super(scale, context);

  @override
  void renderChar(int x, int y, Char char) {
    // setup
    ctx.textBaseline = 'top';
    ctx.font = font;

    // first render the background as a full block
    ctx.fillStyle = char.background.cssColor;
    ctx.fillText(String.fromCharCode(0x2588), x * charWidth, y * charHeight);

    // then render the character
    ctx.fillStyle = char.foreground.cssColor;
    ctx.fillText(String.fromCharCode(char.charCode), x * charWidth,
        y * charHeight, charWidth);
  }
}
