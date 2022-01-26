import 'dart:html' as html;

import 'package:fortress/web.dart';

import 'demo/input.dart';
import 'demo/main_menu.dart';

void main() async {
  const fontFamily = 'DOS VGA 437';
  var scale = html.window.devicePixelRatio.toInt();
  var gameDiv = html.querySelector('#game')!;

  // TODO: move this into the font renderer
  // Shout-out to https://github.com/CP437/PerfectDOSVGA437
  var font = html.FontFace(fontFamily, 'url(packages/fortress/PerfectDOSVGA437.ttf)');
  // this ensures that the font is loaded before we start rendering things
  await font.load();
  html.document.fonts!.add(font);

  print('GAME width ${gameDiv.clientWidth}, height ${gameDiv.clientHeight}');

  // var terminal = CanvasTerminal.withParent(gameDiv, CanvasRendererType.font,
  //     scale: 1, font: 'normal ${8 * scale}px "$fontFamily", monospace', minSize: MainMenu.minSize);

  var terminal = CanvasTerminal.withParent(gameDiv, CanvasRendererType.glyph,
      scale: scale, minSize: MainMenu.minSize);

  // ensure all renderer assets are loaded
  await terminal.loaded;

  print('TERM cols ${terminal.width}, rows ${terminal.height}');

  var ui = UserInterface<Input>(terminal);
  ui.handlingKeyInput = true;
  ui.keyBinds.bind(Input.n, KeyCode.arrowUp);
  ui.keyBinds.bind(Input.s, KeyCode.arrowDown);
  ui.keyBinds.bind(Input.ok, KeyCode.enter);
  ui.push(MainMenu());
  ui.running = true;

  // Vec2? lastPointer;
  // terminal.canvas.onMouseMove.listen((event) {
  //   // we must offset the mouse position here because of how the canvas renders pixels
  //   var pixels = Vec2((event.offset.x - 0.5).toInt(), (event.offset.y - 0.5).toInt());
  //   var pos = terminal.pixelsToPosition(pixels);

  //   if (lastPointer != null) {
  //     terminal.drawChar(lastPointer!.x, lastPointer!.y, Char.clear);
  //   }

  //   lastPointer = pos;

  //   terminal.drawChar(pos.x, pos.y, Char.create(CharCode.fullBlock, Color.lightGreen));
  // });

  // terminal.canvas.onClick.listen((event) {
  //   // we must offset the mouse position here because of how the canvas renders pixels
  //   var pixels = Vec2((event.offset.x - 0.5).toInt(), (event.offset.y - 0.5).toInt());
  //   print('CLICK x ${pixels.x}, y ${pixels.y}');
  //   var pos = terminal.pixelsToPosition(pixels);

  //   terminal.drawChar(pos.x, pos.y, Char.create(CharCode.fullBlock, Color.brown));
  // });
}
