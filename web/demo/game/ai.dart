import 'package:fortress/util.dart';

import 'action.dart';
import 'game.dart';
import 'turn_based.dart';

enum LocationAffinity {
  none,
  room,
  corridor,
  position,
}

enum Disposition {
  passive,
  defensive,
  aggressive,
}

class AiController extends TurnController {
  @override
  Action? getTurnAction() {
    var dir = rng.item(Direction.cardinals);

    if (game.level!.map[gameObject.position + dir].isOpen) {
      gameObject.dirty();
      return MoveAction(dir);
    }

    return null;
  }
}
