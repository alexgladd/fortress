import 'package:fortress/util.dart';

import 'level.dart';
import 'log.dart';

final game = Game._instance;

class Game {
  static const levelSize = Vec2(115, 35);
  static const levelBounds = Rect(Vec2.zero, levelSize);
  static final _instance = Game();

  final log = GameLog();

  Level? level;

  int get dungeonLevel => level == null ? -1 : level!.level;

  Game();

  /// Resets all game state to default values (erases all progress).
  void reset() {
    log.clear();
  }
}
