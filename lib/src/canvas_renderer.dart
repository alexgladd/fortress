import 'dart:html' as html;
import 'dart:math' as math;

import 'char.dart';
import 'renderer.dart';
import 'vector.dart';

abstract class CanvasRenderer extends Renderer {
  final int _scale;
  final html.CanvasRenderingContext2D _ctx;

  int get scale => _scale;
  html.CanvasRenderingContext2D get ctx => _ctx;

  /// The width in pixels of a single rendered character (before scaling)
  int get charWidth;

  /// The height in pixels of a single rendered character (before scaling)
  int get charHeight;

  CanvasRenderer(this._scale, this._ctx);
}

class FontRenderer extends CanvasRenderer {
  /// Default font string for standard scale
  static const cssFont = 'normal 12 "Menlo", "Courier", monospace';

  /// Default font string for high pixel density scale
  static const cssFont2x = 'normal 24px "Menlo", "Courier", monospace';

  /// Measure the size of the given [text] (or a single character by default) in pixels using the
  /// given 2D [context] and the given CSS [font] string.
  static Vec2 measureText(html.CanvasRenderingContext2D context, String font, [String? text]) {
    text ??= 'a';
    context.textBaseline = 'top';
    context.font = font;
    var metrics = context.measureText('a');

    // get the width
    int left = metrics.actualBoundingBoxLeft?.round() ?? 0;
    int right = metrics.actualBoundingBoxRight?.round() ?? 0;
    int width = math.max(metrics.width?.round() ?? 0, left.abs() + right.abs());

    // get the height
    int ascent = metrics.actualBoundingBoxAscent?.round() ?? 0;
    int descent = metrics.actualBoundingBoxDescent?.round() ?? 0;
    int height = ascent.abs() + descent.abs();

    print('MEASURE: left $left, right $right, ascent $ascent, descent $descent');
    print('CHAR width $width, height $height');

    return Vec2(width, height);
  }

  final String font;
  final Vec2 charSize;

  @override
  int get charHeight => charSize.y;

  @override
  int get charWidth => charSize.x;

  FontRenderer(html.CanvasRenderingContext2D context, [int scale = 1, String? font])
      : font = font ?? (scale < 2 ? cssFont : cssFont2x),
        charSize = measureText(context, font ?? (scale < 2 ? cssFont : cssFont2x)),
        super(scale, context);

  @override
  void renderChar(int x, int y, Char char) {
    // first render the background
    ctx.fillStyle = char.background.cssColor;
    ctx.fillRect(x * charWidth, y * charHeight, charWidth, charHeight);

    // then render the character
    ctx.textBaseline = 'top';
    ctx.font = font;
    ctx.fillStyle = char.foreground.cssColor;
    ctx.fillText(String.fromCharCode(char.charCode), x * charWidth, y * charHeight);
  }

  // Vec2 _measureText(String text) {
  //   return measureText(ctx, font, text);
  // }
}
