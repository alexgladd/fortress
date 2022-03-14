import 'dart:html' as html;

import 'package:fortress/web.dart';

import 'demo/input.dart';
import 'demo/main_menu.dart';

final renderType = CanvasRendererType.glyph;
late final UserInterface<Input> _ui;

void main() async {
  var terminal = _makeTerminal();

  // ensure all renderer assets are loaded
  await terminal.loaded;

  print('TERM cols ${terminal.width}, rows ${terminal.height}');

  _ui = UserInterface<Input>(terminal);

  html.window.onResize.listen(_onResize);

  _ui.handlingKeyInput = true;
  _ui.keyBinds.bind(Input.n, KeyCode.arrowUp);
  _ui.keyBinds.bind(Input.e, KeyCode.arrowRight);
  _ui.keyBinds.bind(Input.s, KeyCode.arrowDown);
  _ui.keyBinds.bind(Input.w, KeyCode.arrowLeft);
  _ui.keyBinds.bind(Input.ok, KeyCode.enter);
  _ui.keyBinds.bind(Input.cancel, KeyCode.escape);
  _ui.keyBinds.bind(Input.rest, KeyCode.keyR);
  _ui.keyBinds.bind(Input.equip, KeyCode.keyE);
  _ui.keyBinds.bind(Input.pickup, KeyCode.keyP);
  _ui.keyBinds.bind(Input.inspect, KeyCode.keyV);
  _ui.keyBinds.bind(Input.inventory, KeyCode.keyI);
  _ui.push(MainMenu());
  _ui.running = true;

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

void _onResize(_) async {
  var terminal = _makeTerminal();
  await terminal.loaded;
  _ui.terminal = terminal;
}

CanvasTerminal _makeTerminal() {
  var scale = html.window.devicePixelRatio.toInt();
  var gameDiv = html.querySelector('#game')!;

  print('GAME width ${gameDiv.clientWidth}, height ${gameDiv.clientHeight}');

  switch (renderType) {
    case CanvasRendererType.font:
      return _makeFontTerminal(gameDiv, scale);

    case CanvasRendererType.glyph:
      return _makeGlyphTerminal(gameDiv, scale);
  }
}

CanvasTerminal _makeGlyphTerminal(html.Element gameDiv, int scale) {
  return CanvasTerminal.withParent(gameDiv, CanvasRendererType.glyph,
      scale: scale, minSize: MainMenu.minSize);
}

CanvasTerminal _makeFontTerminal(html.Element gameDiv, int scale) {
  const fontFamily = 'DOS VGA 437';

  // TODO: move this into the font renderer so that we can wait for loading
  // See https://github.com/CP437/PerfectDOSVGA437
  var font =
      html.FontFace(fontFamily, 'url(packages/fortress/PerfectDOSVGA437.ttf)');
  // this ensures that the font is loaded before we start rendering things
  font.load().then((value) => html.document.fonts!.add(value));

  return CanvasTerminal.withParent(gameDiv, CanvasRendererType.font,
      scale: 1,
      font: 'normal ${8 * scale}px "$fontFamily", monospace',
      minSize: MainMenu.minSize);
}
