import '../web/user_interface.dart';
import 'ecs.dart';

/// Provides a way for entities to signal whether or not they should be
/// re-rendered. Starts as dirty by default.
class DirtySignal extends Component {
  bool _dirty;

  /// The current dirty signal status
  bool get isDirty => _dirty;

  DirtySignal([bool dirty = true]) : _dirty = dirty;

  /// Signal that the [Entity] this belongs to is dirty
  void dirty() => _dirty = true;
}

/// Processes [DirtySignal] components and signals its [Layer] when something
/// needs to be re-rendered. Default [System.priority] is 2000.
class DirtySignalSystem extends System<DirtySignal> {
  final Layer _layer;

  @override
  int get priority => 2000;

  DirtySignalSystem(this._layer);

  @override
  void update(double ds, List<DirtySignal> components) {
    if (components.any((d) {
      if (d.isDirty) {
        d._dirty = false;
        return true;
      }
      return false;
    })) _layer.dirty();
  }
}
