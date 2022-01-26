import 'package:fortress/web.dart';

import 'input.dart';

const _titleChars = [
  r'██████                                                   ██████',
  r' ████                                                     ████',
  r' ████   ████  ████  ████  ████   ████  ████  ████  ████   ████',
  r'███████████████████████████████████████████████████████████████',
  r' ██████                                                 ██████',
  r' ██████ █████ █████ █████ █████ █████ █████ █████ █████ ██████',
  r' ██████ █     █   █ █   █   █   █   █ █     █     █     ██████',
  r' ██████ ███   █   █ ████    █   ████  ███   █████ █████ ██████',
  r' ██████ █     █   █ █  █    █   █  █  █         █     █ ██████',
  r' ██████ █     █████ █   █   █   █   █ █████ █████ █████ ██████',
  r' ██████                                                 ██████',
  r'███████████████████████████████████████████████████████████████',
  r'▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
  r'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
];

const _titleColors = [
  r'GGGGGG                                                   GGGGGG',
  r' GGGG                                                     GGGG',
  r' GGGG   GGGG  GGGG  GGGG  GGGG   GGGG  GGGG  GGGG  GGGG   GGGG',
  r'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',
  r' GGGGGG                                                 GGGGGG',
  r' GGGGGG RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR GGGGGG',
  r' GGGGGG R     R   R R   R   R   R   R R     R     R     GGGGGG',
  r' GGGGGG RRR   R   R RRRR    R   RRRR  RRR   RRRRR RRRRR GGGGGG',
  r' GGGGGG R     R   R R  R    R   R  R  R         R     R GGGGGG',
  r' GGGGGG R     RRRRR R   R   R   R   R RRRRR RRRRR RRRRR GGGGGG',
  r' GGGGGG                                                 GGGGGG',
  r'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  r'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  r'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
];

const _charColors = {
  'G': Color.gray,
  'B': Color.brown,
  'R': Color.darkRed,
};

class MainMenu extends Layer<Input> {
  static int get titleWidth {
    int maxWidth = 0;
    for (var y = 0; y < titleHeight; y++) {
      if (_titleChars[y].length > maxWidth) maxWidth = _titleChars[y].length;
    }
    return maxWidth;
  }

  static int get titleHeight => _titleChars.length;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void render(Terminal terminal) {
    // center the title
    var titleTerm = terminal.child((terminal.width - titleWidth) ~/ 2,
        (terminal.height - titleHeight) ~/ 2, titleWidth, titleHeight);

    for (var y = 0; y < titleHeight; y++) {
      for (var x = 0; x < _titleChars[y].length; x++) {
        var color = _charColors[_titleColors[y][x]];
        var char = Char.create(_titleChars[y][x], color, terminal.background);
        titleTerm.drawChar(x, y, char);
      }
    }
  }

  @override
  void update(num dt) {}
}
