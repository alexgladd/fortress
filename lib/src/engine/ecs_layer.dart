import 'package:fortress/web.dart';

import 'ecs.dart';
import '../util/input.dart';
import '../web/user_interface.dart';

/// A [Layer] implementation that adds [EntityComponentSystem] functionality.
abstract class EcsLayer<T extends InputBase> extends Layer<T> {
  /// The [EntityComponentSystem] for the layer
  final ecs = EntityComponentSystem();

  /// Updates the [ecs]. Recommend overriding [preUpdate] or [postUpdate] if you
  /// want to implement extra functionality during the layer's update step. If
  /// you need to override [update], make sure you call super.update(ds).
  @override
  void update(double ds) {
    preUpdate(ds);
    ecs.update(ds);
    postUpdate(ds);
  }

  /// Called once per frame just before updating the [ecs]. The provided [ds]
  /// value is the number of (fractional) seconds elapsed since the last update.
  void preUpdate(double ds) {}

  /// Called once per frame just after updating the [ecs]. The provided [ds]
  /// value is the number of (fractional) seconds elapsed since the last update.
  void postUpdate(double ds) {}
}
