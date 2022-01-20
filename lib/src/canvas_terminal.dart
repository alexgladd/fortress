import 'dart:html' as html;
import 'dart:math' as math;

import 'canvas_renderer.dart';
import 'char.dart';
import 'renderer.dart';
import 'terminal.dart';
import 'vector.dart';

class CanvasTerminal extends RenderableTerminal<CanvasRenderer> {
  final html.CanvasElement _canvas;

  factory CanvasTerminal.withCanvas(
      html.CanvasElement canvas, CanvasRenderer renderer, int pixelWidth, int pixelHeight,
      [int? scale]) {
    scale ??= html.window.devicePixelRatio.toInt();
    var cols = pixelWidth * scale ~/ renderer.charWidth;
    var rows = pixelHeight * scale ~/ renderer.charHeight;

    canvas.width = cols * renderer.charWidth;
    canvas.height = rows * renderer.charHeight;
    canvas.style.width = '${pixelWidth}px';
    canvas.style.height = '${pixelHeight}px';

    return CanvasTerminal._(canvas, renderer, cols, rows);
  }

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
        throw UnimplementedError('Glyph renderer is not implemented yet');
    }

    parent.append(canvas);
    return CanvasTerminal.withCanvas(canvas, renderer, parent.clientWidth, parent.clientHeight);
  }

  CanvasTerminal._(this._canvas, CanvasRenderer renderer, int columns, int rows)
      : super(columns, rows, renderer);
}
