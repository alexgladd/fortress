import 'package:fortress/web.dart';

import '../input.dart';
import 'game.dart';
import 'level.dart';

class LoadingScreen extends Layer<Input> {
  final Level _level;
  // final _timer = Stopwatch();
  final _panel = BorderPanel.forContent(50, 3,
      border: PanelBorder.solid, borderColor: Color.gold, padding: 1);
  late final Iterator<String> _buildSteps;

  String? _loadTxt;

  @override
  bool get isHandlingInput => false;

  @override
  bool get isTransparent => true;

  LoadingScreen(int level)
      : _level = Level(Game.levelSize.x, Game.levelSize.y, level) {
    _panel.contentRenderer = (terminal) {
      var text = _loadTxt ?? 'Preparing...';
      terminal.drawTextCenter(
          0, 'Loading Level ${_level.level}', Color.lightGold);
      terminal.drawTextCenter(2, text);
    };
  }

  @override
  void start() {
    _buildSteps = _level.build().iterator;
    // _timer.start();
  }

  @override
  void update(double ds) {
    // this effectively builds one step per frame
    if (_buildSteps.moveNext()) {
      // still building
      _loadTxt = _buildSteps.current;
      dirty();
    } else {
      // done
      ui.pop(_level);
      // _timer.stop();
    }

    // this implementation loads too fast!
    // _timer.reset();
    // while (_timer.elapsedMilliseconds < 5) {
    //   if (_buildSteps.moveNext()) {
    //     // still building
    //     _loadTxt = _buildSteps.current;
    //     dirty();
    //   } else {
    //     // done
    //     ui.pop(_level);
    //     _timer.stop();
    //     break;
    //   }
    // }
  }

  @override
  void render(Terminal terminal) {
    var panelRect = terminal.bounds.centerRect(_panel.width, _panel.height);
    var panelTerm = terminal.childRect(panelRect);
    _panel.render(panelTerm);
  }
}
