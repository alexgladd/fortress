import 'ecs.dart';
import '../util/input.dart';

/// Exposes inputs to entities
class InputHandler<T extends InputBase> extends Component {
  final _inputs = <T>{};

  /// The [Set] of all inputs the system captured during the current update
  /// cycle (current frame)
  Set<T> get inputs => _inputs;

  /// Returns true if the input system captured the given input during the
  /// current update cycle (current frame)
  bool hasInput(T input) => _inputs.contains(input);

  /// Set the inputs for the current update cycle
  void _setInputs(Iterable<T> inputs) {
    _inputs.clear();
    _inputs.addAll(inputs);
  }
}

/// Processes inputs (implementations of [InputBase]). Default [System.priority]
/// is 100.
class InputSystem<T extends InputBase> extends System<InputHandler<T>> {
  final _inputs = <T>{};

  @override
  int get priority => 100;

  /// Add an [input] for the current update cycle
  void addInput(T input) {
    _inputs.add(input);
  }

  @override
  void update(double ds, List<InputHandler<T>> components) {
    for (var c in components) {
      c._setInputs(_inputs);
    }

    _inputs.clear();
  }
}
