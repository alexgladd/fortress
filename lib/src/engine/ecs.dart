import 'dart:collection';

/// The Entity Component System instance
final ecs = _EntityComponentSystem();

class _EntityComponentSystem {
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

  /// Fixed length [List] of all [Components] of type [T] currently active in
  /// the ECS
  List<T> typeComponents<T extends Component>() {
    var comps = <T>[];
    var compSet = _componentsByType[T];
    if (compSet != null) comps.addAll(compSet as Iterable<T>);
    return comps.toList(growable: false);
  }

  /// Adds a [System] to the ECS
  void addSystem(System system) {
    _systemsByType[system.componentType] = system;
    _updateSortedSystems();
  }

  /// Remove a [System] from the ECS
  void removeSystem(System system) {
    if (_systemsByType.remove(system.componentType) != null) {
      _updateSortedSystems();
    }
  }

  /// Removes the given [entity] and all of its [Component]s from the ECS
  void removeEntity(Entity entity) {
    _removeEntity(entity);
  }

  /// Update the ECS. This should be called once per frame and [ds] should be
  /// the number of (fractional) seconds elapsed since the last call to
  /// [update]. When called, the ECS will automatically call [System.update] on
  /// all [System]s that have been added to the ECS so that they can operate on
  /// their respective [Component] types.
  void update(double ds) {
    for (var system in _sortedSystems) {
      var components = _componentsByType[system.componentType];
      if (components != null) {
        system.update(ds, components.toList(growable: false));
      }
    }
  }

  /// Add an [Entity] or [Component] to the ECS
  void _add(Object o) {
    if (o is Entity) return _addEntity(o);
    if (o is Component) return _addComponent(o);
    throw ArgumentError.value(
        o, 'o', 'ECS.add only accepts Entities and Components');
  }

  /// Add an [Entity] to the ECS
  void _addEntity(Entity entity) {
    // no duplicates
    if (_entities.containsKey(entity.id)) {
      throw StateError('ECS already contains $entity');
    }
    // add the entity
    _entities[entity.id] = entity;
  }

  /// Add a [Component] to the ECS
  void _addComponent(Component component) {
    var compSet = _componentsByType[component.runtimeType];
    if (compSet == null) {
      _componentsByType[component.runtimeType] = <Component>{};
      compSet = _componentsByType[component.runtimeType];
    }

    if (!compSet!.add(component)) {
      throw StateError('ECS already contains $component');
    }
  }

  /// Remove an [Entity] or [Component] from the ECS
  void _remove(Object o) {
    if (o is Entity) return _removeEntity(o);
    if (o is Component) return _removeComponent(o);
    throw ArgumentError.value(
        o, 'o', 'ECS.remove only accepts Entities and Components');
  }

  /// Remove an [Entity] from the ECS
  void _removeEntity(Entity entity) {
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
  }

  /// Remove a [Component] from the ECS
  void _removeComponent(Component component) {
    var compSet = _componentsByType[component.runtimeType];

    if (compSet == null) {
      throw StateError(
          'ECS has no tracking for Component type ${component.runtimeType}');
    }

    if (!compSet.remove(component)) {
      throw StateError("ECS doesn't contain $component");
    }
  }

  void _updateSortedSystems() {
    _sortedSystems = _systemsByType.values.toList(growable: false)
      ..sort((a, b) => a.priority.compareTo(b.priority));
  }
}

/// The base 'entity' part of an Entity Component System (ECS). This is
/// basically just a bag of [Component]s.
///
/// Note: subclasses MUST call the base constructor (i.e., as super()) in order
/// for the ECS to work properly.
abstract class Entity {
  static var _nextId = 0;

  /// Get the next available entity ID
  static _getNextId() => _nextId++;

  /// The entity's ID
  final int id;

  /// The list of [Component]s attached to the entity
  List<Component> get components => _components.values.toList(growable: false);

  final _components = HashMap<Type, Component>();

  /// Create a new entity instance. This will automatically assign it the next
  /// available [id] and add it to the main [ecs]. Subclasses MUST remember to
  /// call this constructor in their initializer lists for the ECS to work
  /// properly.
  Entity() : id = _getNextId() {
    ecs._add(this);
  }

  /// Add the given [component] to the entity. This will automatically update
  /// the [Component.entityId] and add it to the main [ecs].
  void add(Component component) {
    component._entityId = id;
    if (!_components.containsKey(component.runtimeType)) {
      _components[component.runtimeType] = component;
      ecs._add(component);
    } else {
      throw StateError('$this already has $component');
    }
  }

  /// Add all of the [components] to the entity. This will automatically update
  /// the [Component.entityId] for each and add each to the main [ecs].
  void addAll(List<Component> components) {
    for (var c in components) {
      add(c);
    }
  }

  /// Remove the given [component] from the entity. This will automatically
  /// remove it from the main [ecs].
  void remove(Component component) {
    if (_components.containsKey(component.runtimeType)) {
      _components.remove(component.runtimeType);
      ecs._remove(component);
    } else {
      throw StateError("$this doesn't have $component");
    }
  }

  /// Remove all of the [components] from the entity. This will automatically
  /// remove each from the main [ecs].
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
abstract class Component {
  int? _entityId;

  /// The ID of the [Entity] that this [Component] belongs to. Will be null if
  /// the component hasn't been bound to an entity.
  int? get entityId => _entityId;

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
  String toString() => '$runtimeType(for: $entityId)';
}

/// The base 'system' part of an Entity Component System (ECS). These operate on
/// a set of [Component]s of a single type.
abstract class System<T extends Component> {
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
  void update(double ds, List<T> components);
}
