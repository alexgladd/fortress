import 'ecs.dart';

/// Provides the ability to add a custom behavior to an [Entity]. Use with a
/// [BehaviorSystem].
abstract class Behavior extends Component {
  var _started = false;

  /// Can be overridden to perform one-time initialization
  void start() {}

  /// Can be overridden to perform once-per-frame updates. The provided [ds]
  /// value is the number of (fractional) seconds since the last call to
  /// [update].
  void update(double ds) {}
}

/// Processes [Behavior] components. Default [System.priority] is 500.
class BehaviorSystem extends System<Behavior> {
  @override
  int get priority => 500;

  @override
  void update(double ds, List<Behavior> components) {
    for (var behavior in components) {
      if (!behavior._started) {
        behavior.start();
        behavior._started = true;
      }

      behavior.update(ds);
    }
  }
}
