import 'dart:html' as html;

import 'package:fortress/src/canvas_renderer.dart';
import 'package:fortress/src/canvas_terminal.dart';
import 'package:fortress/src/char.dart';
import 'package:fortress/src/color.dart';
import 'package:fortress/src/vector.dart';

void main() async {
  const fontFamily = 'DOS VGA 437';
  var scale = html.window.devicePixelRatio.toInt();
  var gameDiv = html.querySelector('#game')!;
  // var canvas = html.CanvasElement();

  // Shout-out to https://github.com/CP437/PerfectDOSVGA437
  var font = html.FontFace(fontFamily, 'url(packages/fortress/PerfectDOSVGA437.ttf)');
  // this ensures that the font is loaded before we start rendering things
  await font.load();
  html.document.fonts!.add(font);

  print('GAME width ${gameDiv.clientWidth}, height ${gameDiv.clientHeight}');

  // var terminal = CanvasTerminal.withParent(gameDiv, CanvasRendererType.font,
  //     scale: 1, font: 'normal ${8 * scale}px "$fontFamily", monospace');

  var terminal = CanvasTerminal.withParent(gameDiv, CanvasRendererType.glyph, scale: scale);

  print('TERM cols ${terminal.width}, rows ${terminal.height}');

  terminal.drawText(0, 0, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  terminal.drawText(0, 1, 'abcdefghijklmnopqrstuvwxyz');
  terminal.drawText(0, 2, '01234567890');
  terminal.drawText(0, 3, '!@#\$%^&*()_+');
  terminal.drawCharCode(0, 4, 0x1, Color.yellow);
  terminal.drawChar(0, 5, Char.create('A', Color.gold));
  terminal.drawCharCode(0, 6, 0xB0, Color.brown);
  terminal.drawCharCode(1, 6, 0xB1, Color.brown);
  terminal.drawCharCode(2, 6, 0xB2, Color.brown);

  Vec2? lastPointer;
  terminal.canvas.onMouseMove.listen((event) {
    // we must offset the mouse position here because of how the canvas renders pixels
    var pixels = Vec2((event.offset.x - 0.5).toInt(), (event.offset.y - 0.5).toInt());
    var pos = terminal.pixelsToPosition(pixels);

    if (lastPointer != null) {
      terminal.drawChar(lastPointer!.x, lastPointer!.y, Char.clear);
    }

    lastPointer = pos;

    terminal.drawChar(pos.x, pos.y, Char.create(0xDB /*0x2588*/, Color.lightGreen));
  });

  terminal.canvas.onClick.listen((event) {
    // we must offset the mouse position here because of how the canvas renders pixels
    var pixels = Vec2((event.offset.x - 0.5).toInt(), (event.offset.y - 0.5).toInt());
    print('PIXELS x ${pixels.x}, y ${pixels.y}');
    var pos = terminal.pixelsToPosition(pixels);

    terminal.drawChar(pos.x, pos.y, Char.create(0xDB /*0x2588*/, Color.brown));
  });

  void tick(num dt) {
    terminal.render();
    html.window.requestAnimationFrame(tick);
  }

  html.window.requestAnimationFrame(tick);
}
