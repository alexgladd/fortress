import 'dart:html' as html;

import 'renderer.dart';

enum CanvasRendererType {
  font,
  glyph,
}

/// Base class for a renderer that draws on an HTML5 [html.CanvasElement]
abstract class CanvasRenderer extends Renderer {
  final int _scale;
  final html.CanvasRenderingContext2D _ctx;

  int get scale => _scale;
  html.CanvasRenderingContext2D get ctx => _ctx;

  /// The width in pixels of a single rendered character (before scaling)
  int get charWidth;

  /// The height in pixels of a single rendered character (before scaling)
  int get charHeight;

  /// Returns a [Future] that resolves whenever the underlying assets used by
  /// the renderer are fully loaded and the renderer is actually ready to
  /// render. Calling [renderChar] before waiting for this future to resolve may
  /// result in undefined behavior.
  Future<void> get loaded;

  CanvasRenderer(this._scale, this._ctx) {
    // help us get pixel-perfect rendering
    _ctx.imageSmoothingEnabled = false;
    // make things more consistent with how we think of things on the screen
    _ctx.translate(0.5, 0.5);
  }
}
