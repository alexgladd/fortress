import 'dart:math' as math;

import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import 'input.dart';

const _titleChars = [
  r'  ██████                                                   ██████',
  r'   ████                                                     ████',
  r'   ████   ████  ████  ████  ████   ████  ████  ████  ████   ████',
  r'  ███████████████████████████████████████████████████████████████',
  r'   ██████                                                 ██████',
  r'   ██████ █████ █████ █████ █████ █████ █████ █████ █████ ██████',
  r'   ██████ █     █   █ █   █   █   █   █ █     █     █     ██████',
  r'   ██████ ███   █   █ ████    █   ████  ███   █████ █████ ██████',
  r'   ██████ █     █   █ █  █    █   █  █  █         █     █ ██████',
  r'   ██████ █     █████ █   █   █   █   █ █████ █████ █████ ██████',
  r'   ██████                                                 ██████',
  r'  ███████████████████████████████████████████████████████████████',
  r' ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
  r'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
  r'                                                                   ',
  r'                                                                   ',
  r'                         D E M O   M E N U                         ',
  r'                                                                   ',
];

const _titleColors = [
  r'  GGGGGG                                                   GGGGGG',
  r'   GGGG                                                     GGGG',
  r'   GGGG   GGGG  GGGG  GGGG  GGGG   GGGG  GGGG  GGGG  GGGG   GGGG',
  r'  GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',
  r'   GGGGGG                                                 GGGGGG',
  r'   GGGGGG RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR RRRRR GGGGGG',
  r'   GGGGGG R     R   R R   R   R   R   R R     R     R     GGGGGG',
  r'   GGGGGG RRR   R   R RRRR    R   RRRR  RRR   RRRRR RRRRR GGGGGG',
  r'   GGGGGG R     R   R R  R    R   R  R  R         R     R GGGGGG',
  r'   GGGGGG R     RRRRR R   R   R   R   R RRRRR RRRRR RRRRR GGGGGG',
  r'   GGGGGG                                                 GGGGGG',
  r'  BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  r' BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  r'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
  r'                                                                   ',
  r'                                                                   ',
  r'                         W W W W   W W W W                         ',
  r'                                                                   ',
];

const _charColors = {
  'G': Color.gray,
  'B': Color.brown,
  'R': Color.darkRed,
  'W': Color.white,
};

const _menuItems = ['Minigame', 'Map generation', 'UI Panels', 'UI Modals', 'Help'];

class MainMenu extends Layer<Input> {
  static int _getMaxWidth(List<String> items) {
    int maxWidth = 0;
    for (var y = 0; y < items.length; y++) {
      if (items[y].length > maxWidth) maxWidth = items[y].length;
    }
    return maxWidth;
  }

  static int get titleWidth => _getMaxWidth(_titleChars);
  static int get titleHeight => _titleChars.length;
  static int get menuWidth => _getMaxWidth(_menuItems);
  static int get menuHeight => _menuItems.length;
  static int get width => math.max<int>(titleWidth, menuWidth);
  static int get height => titleHeight + menuHeight;
  static Vec2 get minSize => Vec2(width, height);

  int _selectedMenuItem = 0;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void render(Terminal terminal) {
    // center the title
    var titleTerm = terminal.child(
        (terminal.width - titleWidth) ~/ 2,
        (terminal.height - titleHeight - menuHeight) ~/ 2,
        math.max<int>(titleWidth, menuWidth),
        titleHeight + menuHeight);

    // render title
    for (var y = 0; y < titleHeight; y++) {
      for (var x = 0; x < _titleChars[y].length; x++) {
        var color = _charColors[_titleColors[y][x]];
        var char = Char.create(_titleChars[y][x], color, terminal.background);
        titleTerm.drawChar(x, y, char);
      }
    }

    // center the menu
    var menuTerm = titleTerm.child(
        (titleTerm.width - menuWidth - 2) ~/ 2, titleHeight, menuWidth + 2, menuHeight);

    // render menu
    for (var i = 0; i < _menuItems.length; i++) {
      var selected = i == _selectedMenuItem;
      var txtColor = selected ? Color.white : Color.gray;
      if (selected) menuTerm.drawText(0, i, '► ', Color.orange);
      menuTerm.drawText(2, i, _menuItems[i], txtColor);
    }
  }

  @override
  void update(num dt) {}

  @override
  bool onInput(Input input) {
    bool handled = true;
    switch (input) {
      case Input.n:
        _selectedMenuItem -= 1;
        break;

      case Input.s:
        _selectedMenuItem += 1;
        break;

      default:
        handled = false;
    }

    _selectedMenuItem = _selectedMenuItem.clamp(0, _menuItems.length - 1).toInt();

    if (handled) dirty();
    return handled;
  }
}
