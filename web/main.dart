import 'dart:html' as html;
import 'dart:math' as math;

import 'package:fortress/src/canvas_renderer.dart';
import 'package:fortress/src/canvas_terminal.dart';
import 'package:fortress/src/char.dart';
import 'package:fortress/src/color.dart';

void main() async {
  const fontFamily = 'DOS VGA 437';
  var scale = html.window.devicePixelRatio.toInt();
  var gameDiv = html.querySelector('#game')!;
  // var canvas = html.CanvasElement();

  // Shout-out to https://github.com/CP437/PerfectDOSVGA437
  var font = html.FontFace(fontFamily, 'url(packages/fortress/PerfectDOSVGA437.ttf)');
  await font.load();
  html.document.fonts!.add(font);
  print('FONT family "${font.family}", status ${font.status},');

  // var renderer =
  //     FontRenderer(canvas.context2D, scale, 'normal ${8 * 2 * scale}px "$fontFamily", monospace');

  print('GAME width ${gameDiv.clientWidth}, height ${gameDiv.clientHeight}');

  var terminal = CanvasTerminal.withParent(gameDiv, CanvasRendererType.font,
      scale: html.window.devicePixelRatio.toInt(),
      font: 'normal ${8 * 2 * scale}px "$fontFamily", monospace');
  // var terminal =
  //     CanvasTerminal.withCanvas(canvas, renderer, gameDiv.clientWidth, gameDiv.clientHeight);
  // gameDiv.append(canvas);
  print('TERM cols ${terminal.width}, rows ${terminal.height}');

  terminal.drawText(0, 0, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  terminal.drawText(0, 1, 'abcdefghijklmnopqrstuvwxyz');
  terminal.drawText(0, 2, '01234567890');
  terminal.drawText(0, 3, '!@#\$%^&*()_+');

  terminal.drawChar(0, 5, Char.create('A', Color.gold));

  terminal.render();

  // var screenCols = math.max<int>(gameDiv.clientWidth ~/ renderer.charWidth, 20) * scale;
  // var screenRows = math.max<int>(gameDiv.clientHeight ~/ renderer.charHeight, 10) * scale;

  // print('TERM cols $screenCols, rows $screenRows');

  // var cWidth = renderer.charWidth * screenCols;
  // var cHeight = renderer.charHeight * screenRows;

  // canvas.width = cWidth;
  // canvas.height = cHeight;

  // canvas.style.width = '${cWidth / scale}px';
  // canvas.style.height = '${cHeight / scale}px';

  // gameDiv.append(canvas);

  // canvas.context2D.fillStyle = 'rgb(128, 128, 128)';
  // canvas.context2D.fillRect(0, 0, canvas.width!, canvas.height!);

  // renderer.renderChar(0, 0, Char.create('A'));
  // renderer.renderChar(1, 0, Char.create('B'));
  // renderer.renderChar(2, 0, Char.create('Q'));
  // renderer.renderChar(3, 0, Char.create('j'));
  // renderer.renderChar(4, 0, Char.create('@'));

  // renderer.renderChar(10, 10, Char.create(0x2588, Color.brown));
  // renderer.renderChar(10, 11, Char.create(0x2593, Color.darkBrown));
  // renderer.renderChar(10, 12, Char.create(0x2591, Color.lightBrown));
  // renderer.renderChar(11, 10, Char.create(0x25D9, Color.yellow));
  // renderer.renderChar(11, 11, Char.create(0x263A, Color.gold));
  // renderer.renderChar(11, 12, Char.create(0x2588));
  // renderer.renderChar(12, 10, Char.create(0x2588));
  // renderer.renderChar(12, 11, Char.create(0x2588));
  // renderer.renderChar(12, 12, Char.create(0x2588));

  // renderer.renderChar(32, 0, Char.create(0x263A, Color.gold));
}
