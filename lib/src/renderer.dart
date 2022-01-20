// logic for rendering characters on a terminal

import 'char.dart';

abstract class Renderer {
  /// Render the given [Char] at column [x], row [y] in a [Terminal]
  void renderChar(int x, int y, Char char);
}
