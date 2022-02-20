import 'dart:collection';

import 'game_object.dart';

/// An Entity Component System (ECS) implementation. Manages sets of [Entity]s,
/// [Component]s, and [System]s and provides methods that supports interation
/// between them.
class EntityComponentSystem {
  final _entities = HashMap<int, Entity>();
  final _componentsByType = HashMap<Type, Set<Component>>();
  final _systemsByType = HashMap<Type, System>();

  var _sortedSystems = <System>[];

  /// Fixed length [List] of all [Entity]s currently active in the ECS
  List<Entity> get entities => _entities.values.toList(growable: false);

  /// Fixed length [List] of all [Component]s currently active in the ECS
  List<Component> get components {
    var comps = <Component>[];
    for (var compSet in _componentsByType.values) {
      comps.addAll(compSet);
    }
    return comps.toList(growable: false);
  }

  /// Get the [Entity] with the given [id], if it exists
  Entity? entity(int id) => _entities[id];

  /// Get the [Component] of type [T] for the [Entity] with the given [entityId]
  T? component<T extends Component>(int entityId) {
    if (_entities.containsKey(entityId)) {
      return _entities[entityId]!.get<T>();
    } else {
      return null;
    }
  }

  /// Fixed length [List] of all [Component]s that implement the given
  /// [system]'s [System.componentType] active in the ECS.
  List<Component> systemComponents(System system) {
    return system._filterComponents(components);
  }

  /// Fixed length [List] of all [Component]s of *runtime* type [T] currently
  /// active in the ECS
  List<T> runtimeTypeComponents<T extends Component>() {
    var comps = <T>[];
    var compSet = _componentsByType[T];
    if (compSet != null) comps.addAll(compSet as Iterable<T>);
    return comps.toList(growable: false);
  }

  /// Update the ECS. This should be called once per frame and [ds] should be
  /// the number of (fractional) seconds elapsed since the last call to
  /// [update]. When called, the ECS will automatically call [System.update] on
  /// all [System]s that have been added to the ECS so that they can operate on
  /// their respective [Component] types.
  ///
  /// Note that the ECS respects the [Component] type hierarchy when processing
  /// [System]s. Consider the hierarchy Component -> Foo -> Bar. A System<Foo>
  /// will process both Foo and Bar components.
  void update(double ds) {
    for (var system in _sortedSystems) {
      var systemComponents = system._filterComponents(components);
      if (systemComponents.isNotEmpty) {
        system.update(ds, systemComponents);
      }
    }
  }

  /// Add an [Entity] or [System] to the ECS. If [entityOrSystem] is an
  /// [Entity], all of its existing [Component]s will be added to the ECS.
  void add(Object entityOrSystem) {
    if (entityOrSystem is Entity) return addEntity(entityOrSystem);
    if (entityOrSystem is System) return addSystem(entityOrSystem);
    throw ArgumentError.value(
        entityOrSystem, 'o', 'ECS.add only accepts Entities and Systems');
  }

  /// Add an [Entity] to the ECS
  void addEntity(Entity entity) {
    // no duplicates
    if (_entities.containsKey(entity.id)) {
      throw StateError('ECS already contains $entity');
    }

    // add the entity
    entity._bind(this);
    _entities[entity.id] = entity;

    // add its components
    for (var c in entity.components) {
      _addComponent(c);
    }
  }

  /// Adds a [System] to the ECS
  void addSystem(System system) {
    system._bind(this);
    _systemsByType[system.componentType] = system;
    _updateSortedSystems();
  }

  /// Add a [Component] to the ECS. This should only be called internally.
  void _addComponent(Component component) {
    var compSet = _componentsByType[component.runtimeType];
    if (compSet == null) {
      _componentsByType[component.runtimeType] = <Component>{};
      compSet = _componentsByType[component.runtimeType];
    }

    if (!compSet!.add(component)) {
      throw StateError('ECS already contains $component');
    } else {
      component._bind(this);
    }
  }

  /// Remove an [Entity] or [System] from the ECS. If [entityOrSystem] is an
  /// [Entity], all of its [Component]s will be removed from the ECS.
  void remove(Object entityOrSystem) {
    if (entityOrSystem is Entity) return removeEntity(entityOrSystem);
    if (entityOrSystem is System) return removeSystem(entityOrSystem);
    throw ArgumentError.value(
        entityOrSystem, 'o', 'ECS.remove only accepts Entities and Systems');
  }

  /// Remove an [Entity] from the ECS
  void removeEntity(Entity entity) {
    // error check
    if (!_entities.containsKey(entity.id)) {
      throw StateError("ECS doesn't contain $entity");
    }

    // remove all of the entity's components
    for (var c in entity.components) {
      _removeComponent(c);
    }

    // remove the entity
    _entities.remove(entity.id);
    entity._unbind();
  }

  /// Remove a [System] from the ECS
  void removeSystem(System system) {
    if (_systemsByType.remove(system.componentType) != null) {
      _updateSortedSystems();
      system._unbind();
    }
  }

  /// Remove a [Component] from the ECS. This should only be called internally.
  void _removeComponent(Component component) {
    var compSet = _componentsByType[component.runtimeType];

    if (compSet == null) {
      throw StateError(
          'ECS has no tracking for Component type ${component.runtimeType}');
    }

    if (!compSet.remove(component)) {
      throw StateError("ECS doesn't contain $component");
    } else {
      component._unbind();
    }
  }

  void _updateSortedSystems() {
    _sortedSystems = _systemsByType.values.toList(growable: false)
      ..sort((a, b) => a.priority.compareTo(b.priority));
  }
}

/// Mixin for things that can be bound to an [EntityComponentSystem].
mixin EcsBindable {
  EntityComponentSystem? _ecs;

  /// Reference to the bound [EntityComponentSystem]. Will throw a [StateError]
  /// if there is no bound ECS.
  EntityComponentSystem get ecs {
    if (_ecs != null) return _ecs!;
    throw StateError('$this has no bound EntityComponentSystem');
  }

  /// Reference to the bound [EntityComponentSystem]. Will return null if there
  /// is no bound ECS.
  EntityComponentSystem? get safeEcs => _ecs;

  /// Bind this object to the given [ecs]
  void _bind(EntityComponentSystem ecs) => _ecs = ecs;

  /// Unbind this object from its currently bound [ecs].
  void _unbind() => _ecs = null;
}

/// The base 'entity' part of an Entity Component System (ECS). This is
/// basically just a bag of [Component]s.
abstract class Entity with EcsBindable {
  static var _nextId = 0;

  /// Get the next available entity ID
  static int _getNextId() => _nextId++;

  /// The entity's ID. IDs are automatically assigned incrementally.
  final int id = _getNextId();

  /// The list of [Component]s attached to the entity
  List<Component> get components => _components.values.toList(growable: false);

  final _components = HashMap<Type, Component>();

  /// Add the given [component] to the entity. This will automatically update
  /// the [Component.entityId].
  void add(Component component) {
    component._entityId = id;
    if (!_components.containsKey(component.runtimeType)) {
      _components[component.runtimeType] = component;
      if (safeEcs != null) safeEcs!._addComponent(component);
    } else {
      throw StateError('$this already has $component');
    }
  }

  /// Add all of the [components] to the entity. This will automatically update
  /// the [Component.entityId] for each.
  void addAll(List<Component> components) {
    for (var c in components) {
      add(c);
    }
  }

  /// Remove the given [component] from the entity.
  void remove(Component component) {
    if (_components.containsKey(component.runtimeType)) {
      if (safeEcs != null) safeEcs!._removeComponent(component);
      _components.remove(component.runtimeType);
    } else {
      throw StateError("$this doesn't have $component");
    }
  }

  /// Remove all of the [components] from the entity.
  void removeAll(List<Component> components) {
    for (var c in components) {
      remove(c);
    }
  }

  /// Get the [Component] of type [T] for the entity. Returns null if no
  /// component of type [T] has been added to the entity.
  T? get<T extends Component>() {
    return _components[T] as T;
  }

  /// Attempt to cast the [Entity] to a [GameObject]. Throws a [StateError] if
  /// the entity is not a game object.
  GameObject asGameObject() {
    try {
      return this as GameObject;
    } catch (_) {
      throw StateError('$this is not a GameObject');
    }
  }

  @override
  bool operator ==(Object? other) {
    if (other is Entity) return id == other.id;
    return false;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() => 'Entity($id)';
}

/// The base 'component' part of an Entity Component System (ECS). These are
/// mostly just data containers that get operated on by a [System].
abstract class Component with EcsBindable {
  static const noEntity = -1;

  int _entityId = noEntity;

  /// The ID of the [Entity] that this [Component] belongs to. Will be
  /// [noEntity] if the component hasn't been bound to an entity.
  int get entityId => _entityId;

  /// The [Entity] that this [Component] is attached to. Will throw a
  /// [StateError] if the component is not bound to an ECS or not attached to
  /// an entity.
  Entity get entity {
    var entity = ecs.entity(entityId);
    if (entity != null) return entity;
    throw StateError('$this is not attached to a valid entity: $entityId');
  }

  /// The [Entity] that this [Component] is attached to. Will return null if the
  /// component is not bound to an ECS or not attached to an entity.
  Entity? get safeEntity {
    if (safeEcs == null) return null;
    return safeEcs!.entity(entityId);
  }

  /// The [GameObject] that this [Component] is attached to. Will throw a
  /// [StateError] if the component is not bound to an ECS or not attached to
  /// a [GameObject].
  GameObject get gameObject => entity.asGameObject();

  @override
  bool operator ==(Object? other) {
    if (other is Component) {
      return runtimeType == other.runtimeType && entityId == other.entityId;
    }
    return false;
  }

  @override
  int get hashCode => runtimeType.hashCode ^ entityId.hashCode;

  @override
  String toString() => '$runtimeType($safeEntity)';
}

/// The base 'system' part of an Entity Component System (ECS). These operate on
/// a set of [Component]s of type [T]. Note that the ECS respects the type
/// hierarchy when processing systems.
abstract class System<T extends Component> with EcsBindable {
  /// The type of [Component] that this [System] operates on
  Type get componentType => T;

  /// The priority of this [System]. When the ECS processes systems, it does so
  /// in priority ascending order (e.g., a [System] with [priority] 5 will get
  /// processed before a [System] with [priority] 10). The default [priority]
  /// for systems is zero. Order is undefined for systems with identical
  /// priorities.
  int get priority => 0;

  /// Update the given [components]. This is generally called once per frame.
  /// The provided [ds] value is the number of (fractional) seconds since the
  /// last call to [update].
  ///
  /// Note that the ECS respects the [Component] type hierarchy when processing
  /// [System]s. Consider the hierarchy Component -> Foo -> Bar. A System\<Foo\>
  /// will process both Foo and Bar components.
  void update(double ds, List<T> components);

  /// Filters the given [components] down to only those
  List<T> _filterComponents(List<Component> components) {
    return components
        .where((c) => _tryCast(c) != null)
        .toList(growable: false)
        .cast<T>();
  }

  /// Attempts to cast the [component] to the [System]'s component type. Returns
  /// null if the cast does not succeed.
  T? _tryCast(Component component) {
    try {
      var typeComp = component as T;
      return typeComp;
    } catch (_) {
      return null;
    }
  }
}
