/// Base class for defining high-level logical inputs (e.g., "interact" or "move north")
abstract class InputBase {
  final String name;

  const InputBase(this.name);

  @override
  bool operator ==(Object? other) {
    if (other is! InputBase) return false;
    if (other.name == name) return true;
    return false;
  }

  @override
  int get hashCode => name.hashCode;
}
