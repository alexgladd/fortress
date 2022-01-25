import 'dart:html' as html;

import 'canvas_renderer.dart';
import 'font_renderer.dart';
import 'glyph_renderer.dart';
import 'terminal.dart';
import '../util/vector.dart';

/// A [RenderableTerminal] that uses an HTML5 [html.CanvasElement] to render the underlying
/// [Terminal] using an implementation of [CanvasRenderer].
class CanvasTerminal extends RenderableTerminal<CanvasRenderer> {
  final html.CanvasElement _canvas;

  /// The [html.CanvasElement] being used by this [CanvasTerminal]
  html.CanvasElement get canvas => _canvas;

  /// Returns a [Future] that resolves whenever the underlying [CanvasRenderer] is fully loaded and
  /// the terminal is actually ready to render. Calling [render] on this terminal before waiting for
  /// this future to resolve may result in undefined behavior.
  Future<void> get loaded => renderer.loaded;

  /// Builds a [CanvasTerminal] using the given [html.CanvasElement] and a pre-configured
  /// [CanvasRenderer]. Will update the canvas to fit into the supplied pixel dimensions using the
  /// given or current [scale].
  factory CanvasTerminal.withCanvas(
      html.CanvasElement canvas, CanvasRenderer renderer, int pixelWidth, int pixelHeight,
      [int? scale]) {
    scale ??= html.window.devicePixelRatio.toInt();
    var cols = pixelWidth ~/ renderer.charWidth;
    var rows = pixelHeight ~/ renderer.charHeight;

    var cWidth = cols * renderer.charWidth;
    var cHeight = rows * renderer.charHeight;

    canvas.width = cWidth * scale;
    canvas.height = cHeight * scale;
    canvas.style.width = '${cWidth}px';
    canvas.style.height = '${cHeight}px';

    // do our best to get pixel-perfect rendering
    canvas.style.imageRendering = 'pixelated';
    canvas.style.fontSmoothing = 'none';

    return CanvasTerminal._(canvas, renderer, cols, rows);
  }

  /// Builds a [CanvasTerminal] using a new [html.CanvasElement] so that it fills the dimensions of
  /// the given [html.Element]. Creates a default [CanvasRenderer] of the requested type for the
  /// [CanvasTerminal].
  factory CanvasTerminal.withParent(html.Element parent, CanvasRendererType rendererType,
      {int? scale, String? font}) {
    scale ??= html.window.devicePixelRatio.toInt();
    CanvasRenderer renderer;
    var canvas = html.CanvasElement();

    switch (rendererType) {
      case CanvasRendererType.font:
        renderer = FontRenderer(canvas.context2D, scale, font);
        break;

      case CanvasRendererType.glyph:
        renderer = GlyphRenderer.dosVga437(canvas.context2D, scale);
        break;
    }

    parent.append(canvas);
    return CanvasTerminal.withCanvas(
        canvas, renderer, parent.clientWidth, parent.clientHeight, scale);
  }

  CanvasTerminal._(this._canvas, CanvasRenderer renderer, int columns, int rows)
      : super(columns, rows, renderer);

  @override
  void render() {
    super.render();
  }

  @override
  Vec2 pixelsToPosition(Vec2 pixels) {
    var col = pixels.x ~/ renderer.charWidth;
    var row = pixels.y ~/ renderer.charHeight;
    return Vec2(col, row);
  }
}
