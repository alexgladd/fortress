import 'dart:html' as html;
import 'dart:math' as math;

import 'canvas_renderer.dart';
import 'char.dart';
import 'renderer.dart';
import 'terminal.dart';
import 'vector.dart';

class CanvasTerminal extends RenderableTerminal<CanvasRenderer> {
  final html.CanvasElement _canvas;

  /// The [html.CanvasElement] being used by this [CanvasTerminal]
  html.CanvasElement get canvas => _canvas;

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

    return CanvasTerminal._(canvas, renderer, cols, rows);
  }

  factory CanvasTerminal.withParent(html.Element parent, CanvasRendererType rendererType,
      {int? scale, String? font}) {
    scale ??= html.window.devicePixelRatio.toInt();
    CanvasRenderer renderer;
    var canvas = html.CanvasElement();

    // do our best to get pixel-perfect rendering
    canvas.style.imageRendering = 'pixelated';
    canvas.style.fontSmoothing = 'none';

    switch (rendererType) {
      case CanvasRendererType.font:
        renderer = FontRenderer(canvas.context2D, scale, font);
        break;

      case CanvasRendererType.glyph:
        renderer = GlyphRenderer.dosVga437(canvas.context2D, scale);
        break;
    }

    parent.append(canvas);
    return CanvasTerminal.withCanvas(canvas, renderer, parent.clientWidth, parent.clientHeight);
  }

  CanvasTerminal._(this._canvas, CanvasRenderer renderer, int columns, int rows)
      : super(columns, rows, renderer);

  @override
  void render() {
    if (!renderer.ready) return;
    super.render();
  }

  @override
  Vec2 pixelsToPosition(Vec2 pixels) {
    var col = pixels.x ~/ renderer.charWidth;
    var row = pixels.y ~/ renderer.charHeight;
    return Vec2(col, row);
  }
}
