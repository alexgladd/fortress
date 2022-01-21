import 'dart:html' as html;
import 'dart:math' as math;

import 'package:fortress/src/char_code.dart';

import 'canvas_renderer.dart';
import 'canvas_terminal.dart';
import 'char.dart';
import 'color.dart';
import 'unicode_map.dart';
import 'vector.dart';

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
  final Map<int, int> _charToGlyphIndex;
  final int _maxGlyphIndex;
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

    return GlyphRenderer(glyphsImg, defaultUnicodeMap, charSize, context, scale);
  }

  GlyphRenderer(this._glyphs, this._charToGlyphIndex, this._charSize,
      html.CanvasRenderingContext2D context, int scale)
      : _maxGlyphIndex = _charToGlyphIndex.values.reduce(math.max),
        super(scale, context) {
    // make sure the glyphs load
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
    if (char.charCode == CharCode.nullChar ||
        char.charCode == CharCode.space ||
        char.charCode == CharCode.nbsp) return;

    // index into the glyph array
    var glyphIndex = _charToGlyphIndex[char.charCode] ?? char.charCode;
    var gx = (glyphIndex % 32) * charWidth;
    var gy = (glyphIndex ~/ 32) * charHeight;

    // skip rendering out-of-bounds characters
    if (glyphIndex > _maxGlyphIndex) return;

    // print('GLYPH RNDR code ${char.charCode}, idx $glyphIndex, gx $gx, gy $gy');

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
