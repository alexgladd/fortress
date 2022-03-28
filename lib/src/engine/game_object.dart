import 'components.dart';
import 'dirty.dart';
import 'ecs.dart';
import '../util/vector.dart';

/// An [Entity] that always has a [Transform], [CharRenderer], and a
/// [DirtySignal]. Meant to serve as the base class for things that exist in the
/// game world.
class GameObject extends Entity {
  // hold a reference to our position component
  final Transform _transform = Transform();
  // hold a reference to our renderer component
  final CharRenderer _renderer = CharRenderer();
  // hold a reference to our dirty signal component
  final DirtySignal _dirtySignal = DirtySignal();

  /// The game object's [Transform]
  Transform get transform => _transform;

  /// The game object's [CharRenderer]
  CharRenderer get renderer => _renderer;

  /// Shortcut to get the game object's [Transform.position]
  Vec2 get position => transform.position;

  /// Shortcut to set the game object's [Transform.position]
  set position(Vec2 next) => transform.position = next;

  /// Creates a new [GameObject] placed at the given [position]
  factory GameObject.positioned(Vec2 position) {
    var go = GameObject();
    go.position = position;
    return go;
  }

  /// Creates a new [GameObject] positioned at the origin (0, 0) that renders
  /// as an empty character with a black background.
  GameObject() {
    addAll([_transform, _renderer, _dirtySignal]);
  }

  /// Signal that the [GameObject] needs to be re-rendered
  void dirty() => _dirtySignal.dirty();

  /// The distance to the [other] game object. By default, [round]s to an
  /// integer result.
  num distanceTo(GameObject other, [bool round = true]) {
    var delta = other.position - position;
    var distance = delta.length;
    if (round) return distance.round();
    return distance;
  }

  /// The squared distance to the [other] game object. Useful for doing distance
  /// comparisons where the true distance is not relevant. More performant than
  /// [distanceTo].
  int sqDistanceTo(GameObject other) {
    final delta = other.position - position;
    return delta.lengthSquared;
  }

  @override
  String toString() => 'GameObject($id)';
}
