import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

enum _Drawing {
  rectangles,
  lines,
  circlesFilled,
  circlesEdges,
}

class Drawing extends Layer<Input> {
  static const _help =
      '[r/l/c] Rectangles/Lines/Circles  [enter] Start/end  [x] Clear  '
      '[esc] Quit';

  final cursorChar = Char(CharCode.fullBlock, Color.lightGreen);
  final markChar = Char(CharCode.fullBlock, Color.green);
  final rects = <Rect>[];
  final lines = <Line>[];
  final circles = <Circle>[];

  Vec2? first;
  Vec2? second;
  late Vec2 cursor;
  var drawing = _Drawing.rectangles;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void start() {
    cursor = ui.renderRect.center;
  }

  @override
  void render(Terminal terminal) {
    for (var rect in rects) {
      for (var p in rect.getPoints()) {
        terminal.drawChar(p.x, p.y, Char(CharCode.fullBlock, Color.red));
      }
    }

    for (var line in lines) {
      for (var p in line) {
        terminal.drawChar(p.x, p.y, Char(CharCode.fullBlock, Color.aqua));
      }
    }

    for (var circle in circles) {
      for (var p in circle) {
        if (!ui.renderRect.contains(p)) continue;
        terminal.drawChar(p.x, p.y, Char(CharCode.fullBlock, Color.purple));
      }
    }

    if (first != null) terminal.drawChar(first!.x, first!.y, markChar);
    terminal.drawChar(cursor.x, cursor.y, cursorChar);
    terminal.drawTextCenter(1, 'Drawing ${drawing.name}');
    terminal.drawTextCenter(terminal.height - 1, _help, Color.gray);
  }

  @override
  bool onInput(Input input) {
    switch (input) {
      case Input.ok:
        _place();
        return true;

      case Input.cancel:
        ui.pop();
        return true;

      case Input.n:
        cursor += Direction.n;
        dirty();
        return true;

      case Input.e:
        cursor += Direction.e;
        dirty();
        return true;

      case Input.s:
        cursor += Direction.s;
        dirty();
        return true;

      case Input.w:
        cursor += Direction.w;
        dirty();
        return true;

      default:
        return false;
    }
  }

  @override
  bool onKeyDown(String key, String code,
      {required bool shift,
      required bool altOpt,
      required bool ctrl,
      required bool meta}) {
    switch (code) {
      case KeyCode.keyR:
        drawing = _Drawing.rectangles;
        dirty();
        break;

      case KeyCode.keyL:
        drawing = _Drawing.lines;
        dirty();
        break;

      case KeyCode.keyC:
        if (drawing == _Drawing.circlesFilled) {
          drawing = _Drawing.circlesEdges;
        } else {
          drawing = _Drawing.circlesFilled;
        }
        dirty();
        break;

      case KeyCode.keyX:
        rects.clear();
        lines.clear();
        circles.clear();
        dirty();
        break;
    }

    return false;
  }

  void _place() {
    if (first == null) {
      first = cursor;
    } else {
      second = cursor;
      _draw();
    }

    dirty();
  }

  void _draw() {
    switch (drawing) {
      case _Drawing.rectangles:
        _drawRect();
        break;
      case _Drawing.lines:
        _drawLine();
        break;
      case _Drawing.circlesFilled:
        _drawCircle(true);
        break;
      case _Drawing.circlesEdges:
        _drawCircle(false);
        break;
    }

    first = second = null;
  }

  void _drawRect() {
    final size = second! - first!;
    final rect = Rect(first!, size);
    rects.add(rect);
  }

  void _drawLine() {
    final line = Line(first!, second!);
    lines.add(line);
  }

  void _drawCircle(bool filled) {
    var radius = (second! - first!).length.toInt();
    Circle circle;
    if (filled) {
      circle = Circle.filled(first!, radius);
    } else {
      circle = Circle.edge(first!, radius);
    }
    circles.add(circle);
  }
}
