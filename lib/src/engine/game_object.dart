import 'package:fortress/web.dart';

import 'ecs.dart';
import 'components.dart';
import '../util/vector.dart';

/// An [Entity] that always has a [Transform] and a [CharRenderer]. Meant to
/// serve as the base class for things that exist in the game world.
class GameObject extends Entity {
  // hold a reference to our position component
  final Transform _transform;
  // hold a reference to our renderer component
  final CharRenderer _renderer;

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
  GameObject()
      : _transform = Transform(),
        _renderer = CharRenderer(),
        super() {
    addAll([_transform, _renderer]);
  }
}