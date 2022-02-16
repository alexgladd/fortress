import '../web/char.dart';
import 'ecs.dart';
import '../util/char_code.dart';
import '../util/vector.dart';
import '../web/color.dart';

/// Provides a 2D transform (position in x, y coordinate space)
class Transform extends Component {
  /// The current position
  Vec2 position;

  /// The X coordinate of the current position
  int get x => position.x;

  /// Set the X coordinate of the position
  set x(int nextX) => position = Vec2(nextX, y);

  /// The Y coordinate of the current position
  int get y => position.y;

  /// Set the Y coordinate of the position
  set y(int nextY) => position = Vec2(x, nextY);

  /// Move the position by [move]
  void move(VectorBase move) => position += move;

  Transform([this.position = Vec2.zero]);
}

class CharRenderer extends Component {
  /// The current character code to render
  int charCode;

  /// The current foreground color to render
  Color foregroundColor;

  /// The current background color to render
  Color backgroundColor;

  /// The [Char] that should be rendered based on the component's current state
  Char get char => Char(charCode, foregroundColor, backgroundColor);

  CharRenderer(
      [this.charCode = CharCode.space,
      this.foregroundColor = Color.white,
      this.backgroundColor = Color.black]);
}
