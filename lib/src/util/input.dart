/// Base class for defining high-level logical inputs (e.g., "interact" or
/// "move north")
abstract class InputBase {
  final String name;

  const InputBase(this.name);
}
