import 'package:fortress/engine.dart';
import 'package:fortress/util.dart';

/// An action that can be [perform]ed on a [GameObject]
abstract class Action {
  void perform(GameObject gameObject);
}

class MoveAction extends Action {
  final Direction dir;

  MoveAction(this.dir);

  @override
  void perform(GameObject gameObject) {
    gameObject.position += dir;
  }
}
