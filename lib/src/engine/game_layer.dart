import 'behavior.dart';
import 'dirty.dart';
import 'ecs.dart';
import 'ecs_layer.dart';
import 'game_object.dart';
import 'inputs.dart';
import 'systems.dart';
import '../util/input.dart';
import '../util/rect.dart';
import '../web/terminal.dart';

/// GameLayer is a concrete [EcsLayer] implementation that is intended to operate
/// purely on [GameObject]s. By default, a GameLayer uses a [BehaviorSystem],
/// [CharRenderingSystem], [InputSystem], and a [DirtySignalSystem].
class GameLayer<T extends InputBase> extends EcsLayer<T> {
  final _inputSys = InputSystem<T>();
  final _renderingSys = CharRenderingSystem();

  /// When this is null (the default), the layer will render all [GameObject]s
  /// within the [Terminal.bounds]. You can use this [Rect] to clip
  /// [GameObject]s that are outside of its bounds.
  Rect? get clippingRect => null;

  @override
  bool get isHandlingInput => true;

  @override
  bool get isTransparent => false;

  @override
  void start() {
    addSystem(_inputSys);
    addSystem(_renderingSys);
    addSystem(BehaviorSystem());
    addSystem(DirtySignalSystem(this));
  }

  /// Renders all [GameObject]s currently within the [clippingRect].
  @override
  void render(Terminal terminal) {
    _renderingSys.render(terminal, clippingRect);
  }

  @override
  bool onInput(T input) {
    _inputSys.addInput(input);
    // return false so that we always get lower-level input events, too
    return false;
  }

  /// Add the given [gameObject] to the layer's ECS
  void add(GameObject gameObject) => ecs.addEntity(gameObject);

  /// Remove the given [gameObject] from the layer's ECS
  void remove(GameObject gameObject) => ecs.removeEntity(gameObject);

  /// Add the given [system] to the layer's ECS
  void addSystem(System system) => ecs.addSystem(system);

  /// Remove the given [system] from the layer's ECS
  void removeSystem(System system) => ecs.removeSystem(system);
}
