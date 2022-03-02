import 'components.dart';
import 'ecs.dart';
import '../util/rect.dart';
import '../util/vector.dart';
import '../web/char.dart';
import '../web/terminal.dart';

/// Handles the rendering of [CharRenderer] components onto a [Terminal].
/// Default [System.priority] is 1000.
class CharRenderingSystem extends System<CharRenderer> {
  @override
  int get priority => 1000;

  @override
  void update(double ds) {}

  /// Render the current render list to the given [terminal], optionally using
  /// the given [clipBounds] to clip [Char]s that would render outside of the
  /// bounds. [Char] positions are translated based on the [clipBounds] position
  /// so that they render accurately in the [Terminal]. If [clipBounds] is not
  /// provided, it defaults to the [terminal]'s [Terminal.bounds]. The
  /// [clipBounds] will always be truncated so that it is no larger than the
  /// size of the [terminal].
  void render(Terminal terminal, [Rect? clipBounds]) {
    clipBounds ??= terminal.bounds;

    if (clipBounds.width > terminal.width ||
        clipBounds.height > terminal.height) {
      clipBounds =
          Rect(clipBounds.position, Vec2(terminal.width, terminal.height));
    }

    for (var c in components) {
      var xform = c.entity.get<Transform>();
      if (xform == null) continue;

      if (clipBounds.contains(xform.position)) {
        var renderPos = xform.position - clipBounds.position;
        terminal.drawChar(renderPos.x, renderPos.y, c.char);
      }
    }
  }
}
