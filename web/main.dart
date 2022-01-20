import 'dart:html' as html;
import 'dart:math' as math;

import 'package:fortress/src/canvas_renderer.dart';
// import 'package:fortress/src/canvas_terminal.dart';
import 'package:fortress/src/char.dart';
import 'package:fortress/src/color.dart';

void main() {
  var scale = html.window.devicePixelRatio.toInt();
  var gameDiv = html.querySelector('#game')!;
  var canvas = html.CanvasElement();

  var renderer = FontRenderer(canvas.context2D, scale);

  var screenCols = math.max<int>(gameDiv.clientWidth ~/ renderer.charWidth, 40);
  var screenRows = math.max<int>(gameDiv.clientHeight ~/ renderer.charHeight, 20);

  var cWidth = renderer.charWidth * screenCols;
  var cHeight = renderer.charHeight * screenRows;

  canvas.width = cWidth * scale;
  canvas.height = cHeight * scale;

  canvas.style.width = '${cWidth}px';
  canvas.style.height = '${cHeight}px';

  gameDiv.append(canvas);

  canvas.context2D.fillStyle = 'rgb(128, 128, 128)';
  canvas.context2D.fillRect(0, 0, canvas.width!, canvas.height!);

  renderer.renderChar(0, 0, Char.create('A'));
  renderer.renderChar(1, 0, Char.create('B'));
  renderer.renderChar(2, 0, Char.create('Q'));
  renderer.renderChar(3, 0, Char.create('j'));
  renderer.renderChar(4, 0, Char.create('@'));

  renderer.renderChar(10, 10, Char.create(0x2588, Color.brown));
  renderer.renderChar(10, 11, Char.create(0x2593, Color.darkBrown));
  renderer.renderChar(10, 12, Char.create(0x2591, Color.lightBrown));
  renderer.renderChar(11, 10, Char.create(0x25D9, Color.yellow));
  renderer.renderChar(11, 11, Char.create(0x263A, Color.gold));
  renderer.renderChar(11, 12, Char.create(0x2588));
  renderer.renderChar(12, 10, Char.create(0x2588));
  renderer.renderChar(12, 11, Char.create(0x2588));
  renderer.renderChar(12, 12, Char.create(0x2588));
}
