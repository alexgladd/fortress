import 'dart:html' as html;

import 'package:fortress/web.dart';
import 'package:fortress/util.dart';

class DemoInput extends InputBase {
  static const north = DemoInput('north');
  static const east = DemoInput('east');
  static const south = DemoInput('south');
  static const west = DemoInput('west');

  const DemoInput(String name) : super(name);
}

class DemoLayer extends Layer<DemoInput> {
  Vec2 heroPos = Vec2.zero;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void render(Terminal terminal) {
    print('DEMO LAYER RENDER');
    terminal.drawText(0, 0, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    terminal.drawText(0, 1, 'abcdefghijklmnopqrstuvwxyz');
    terminal.drawText(0, 2, '01234567890');
    terminal.drawText(0, 3, '!@#\$%^&*()_+');
    terminal.drawChar(0, 4, Char.create('A', Color.gold));
    terminal.drawCharCode(0, 5, CharCode.whiteSmilingFace, Color.yellow);
    terminal.drawCharCode(0, 6, CharCode.lightShade, Color.brown);
    terminal.drawCharCode(1, 6, CharCode.mediumShade, Color.brown);
    terminal.drawCharCode(2, 6, CharCode.darkShade, Color.brown);

    terminal.drawChar(heroPos.x, heroPos.y, Char.create('@', Color.gold));
  }

  @override
  void update(num dt) {}

  @override
  bool onInput(DemoInput input) {
    var moved = true;

    if (input == DemoInput.north) {
      heroPos += Direction.n;
    } else if (input == DemoInput.south) {
      heroPos += Direction.s;
    } else if (input == DemoInput.east) {
      heroPos += Direction.e;
    } else if (input == DemoInput.west) {
      heroPos += Direction.w;
    } else {
      moved = false;
    }

    if (moved) {
      heroPos = ui.renderRect.clamp(heroPos);
      dirty();
      return true;
    } else {
      return false;
    }
  }

  @override
  void onResize(Vec2 size) {
    print('DEMO LAYER RESIZE');
    heroPos = Rect.atOrigin(size.x, size.y).clamp(heroPos);
  }
}

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

  await terminal.loaded;

  print('TERM cols ${terminal.width}, rows ${terminal.height}');

  var ui = UserInterface<DemoInput>(terminal);
  ui.handlingKeyInput = true;
  ui.keyBinds.bind(DemoInput.north, KeyCode.arrowUp);
  ui.keyBinds.bind(DemoInput.east, KeyCode.arrowRight);
  ui.keyBinds.bind(DemoInput.south, KeyCode.arrowDown);
  ui.keyBinds.bind(DemoInput.west, KeyCode.arrowLeft);
  ui.push(DemoLayer());
  ui.running = true;

  // terminal.drawText(0, 0, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  // terminal.drawText(0, 1, 'abcdefghijklmnopqrstuvwxyz');
  // terminal.drawText(0, 2, '01234567890');
  // terminal.drawText(0, 3, '!@#\$%^&*()_+');
  // terminal.drawChar(0, 4, Char.create('A', Color.gold));
  // terminal.drawCharCode(0, 5, CharCode.whiteSmilingFace, Color.yellow);
  // terminal.drawCharCode(0, 6, CharCode.lightShade, Color.brown);
  // terminal.drawCharCode(1, 6, CharCode.mediumShade, Color.brown);
  // terminal.drawCharCode(2, 6, CharCode.darkShade, Color.brown);

  // terminal.render();

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

  // void tick(num dt) {
  //   terminal.render();
  //   html.window.requestAnimationFrame(tick);
  // }

  // html.window.requestAnimationFrame(tick);
}
