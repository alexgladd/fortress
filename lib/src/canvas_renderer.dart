import 'dart:html' as html;
import 'dart:math' as math;

import 'canvas_terminal.dart';
import 'char.dart';
import 'color.dart';
import 'renderer.dart';
import 'vector.dart';

enum CanvasRendererType {
  font,
  glyph,
}

abstract class CanvasRenderer extends Renderer {
  final int _scale;
  final html.CanvasRenderingContext2D _ctx;

  int get scale => _scale;
  html.CanvasRenderingContext2D get ctx => _ctx;

  /// The width in pixels of a single rendered character (before scaling)
  int get charWidth;

  /// The height in pixels of a single rendered character (before scaling)
  int get charHeight;

  /// Whether the renderer is ready to render
  bool get ready;

  CanvasRenderer(this._scale, this._ctx) {
    // help us get pixel-perfect rendering
    _ctx.imageSmoothingEnabled = false;
    // make things more consistent with how we think of things on the screen
    _ctx.translate(0.5, 0.5);
  }
}

/// Renders characters to a [CanvasTerminal] using bitmap glyphs. The renderer must be supplied with
/// a mapping between supported characters and the glyphs. This renderer works best when supplied
/// with an appropriate pixel density scale.
class GlyphRenderer extends CanvasRenderer {
  /// Default set of glyphs covering the code page 437 content.
  /// Shout out to https://github.com/munificent/malison
  static const dosVga437GlyphsSrc = 'packages/fortress/dos-vga-437.png';
  static const dosVga437CharWidth = 9;
  static const dosVga437CharHeight = 16;

  final Vec2 _charSize;
  final html.ImageElement _glyphs;
  final Map<Color, html.CanvasElement> _glyphColorCache = {};

  bool _glyphsLoaded = false;

  @override
  int get charWidth => _charSize.x;

  @override
  int get charHeight => _charSize.y;

  @override
  bool get ready => _glyphsLoaded;

  /// Create a [GlyphRenderer] using the default built-in Code Page 437 glyph set
  factory GlyphRenderer.dosVga437(html.CanvasRenderingContext2D context, [int? scale]) {
    scale ??= html.window.devicePixelRatio.toInt();
    var glyphsImg = html.ImageElement(src: dosVga437GlyphsSrc);
    var charSize = Vec2(dosVga437CharWidth, dosVga437CharHeight);

    return GlyphRenderer._(glyphsImg, charSize, context, scale);
  }

  GlyphRenderer._(this._glyphs, this._charSize, html.CanvasRenderingContext2D context, int scale)
      : super(scale, context) {
    _glyphs.onLoad.listen((_) {
      _glyphsLoaded = true;
    });

    _glyphs.onError.listen((_) => throw StateError('Failed to load glyphs from ${_glyphs.src}'));

    print('CHAR width ${_charSize.x}, height ${_charSize.y}');
  }

  @override
  void renderChar(int x, int y, Char char) {
    if (!_glyphsLoaded) return;

    // fill the background
    ctx.fillStyle = char.background.cssColor;
    ctx.fillRect(
        x * charWidth * scale, y * charHeight * scale, charWidth * scale, charHeight * scale);

    // skip rendering empty characters
    if (char.charCode == 0 || char.charCode == 0x20 || char.charCode == 0xA0) return;

    // index into the glyph array
    var gx = (char.charCode % 32) * charWidth;
    var gy = (char.charCode ~/ 32) * charHeight;

    // render the glyph
    var colorGlyphs = _getColorGlyphs(char.foreground);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImageScaledFromSource(colorGlyphs, gx, gy, charWidth, charHeight, x * charWidth * scale,
        y * charHeight * scale, charWidth * scale, charHeight * scale);
  }

  /// Retrieve a shadow canvas containing the glyphs rendered in the given [Color] from cache,
  /// creating and drawing the canvas if necessary.
  html.CanvasElement _getColorGlyphs(Color color) {
    var cached = _glyphColorCache[color];
    if (cached != null) return cached;

    // create a new canvas and draw the glyphs
    var canvas = html.CanvasElement(width: _glyphs.width, height: _glyphs.height);
    canvas.style.imageRendering = 'pixelated';
    var ctx = canvas.context2D;
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(_glyphs, 0, 0);

    // tint the glyphs the given color
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = color.cssColor;
    ctx.fillRect(0, 0, canvas.width!, canvas.height!);

    _glyphColorCache[color] = canvas;

    return canvas;
  }
}

/// Renders characters to a [CanvasTerminal] using normal fonts and text drawing. Can draw any
/// character supported by the supplied font. This renderer works best if you keep the scale at 1
/// and instead adjust the pixel size of the supplied font string based on the device pixel density.
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
    var metrics = context.measureText(String.fromCharCode(0x2588));

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

  @override
  bool get ready => true;

  FontRenderer(html.CanvasRenderingContext2D context, [int scale = 1, String? font])
      : font = font ?? (scale < 2 ? cssFont : cssFont2x),
        charSize = measureText(context, font ?? (scale < 2 ? cssFont : cssFont2x)),
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
    ctx.fillText(String.fromCharCode(char.charCode), x * charWidth, y * charHeight, charWidth);
  }
}
