import 'package:fortress/util.dart';

import 'hero.dart';
import 'level.dart';
import 'log.dart';
import 'monster.dart';

final game = Game._instance;

class Game {
  static const levelSize = Vec2(115, 35);
  static const levelBounds = Rect(Vec2.zero, levelSize);
  static final _instance = Game();

  final log = GameLog();
  final roll = Roll();

  Rng rng = Rng(DateTime.now().millisecondsSinceEpoch);

  Level? _level;
  Hero? _hero;

  /// The current game [Level]
  Level get level => _level!;

  /// Set the current game [Level]
  set level(Level level) => _level = level;

  /// Whether a [Level] has been set
  bool get hasLevel => _level != null;

  /// The game [Hero]
  Hero get hero => _hero!;

  /// Set the game [Hero]
  set hero(Hero hero) => _hero = hero;

  int get dungeonLevel => hasLevel ? level.level : -1;

  List<Monster> get monsters => level.monsters;

  Game();

  /// Resets all game state to default values (erases all progress).
  void reset() {
    log.clear();
    if (_level != null) _level!.monsters.clear();
    _level = null;
    _hero = null;
  }

  /// Get the [Monster] at the given [position], if there is one
  Monster? getMonsterAt(Vec2 position) {
    for (var monster in monsters) {
      if (monster.position == position) return monster;
    }

    return null;
  }
}
