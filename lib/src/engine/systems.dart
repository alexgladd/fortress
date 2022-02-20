import 'components.dart';
import 'ecs.dart';
import '../util/tuple.dart';
import '../util/rect.dart';
import '../util/vector.dart';
import '../web/char.dart';
import '../web/terminal.dart';

class _RenderListItem extends Tuple2<Vec2, Char> {
  Vec2 get position => first;
  Char get char => second;
  _RenderListItem(Vec2 position, Char char) : super(position, char);
}

/// Handles the rendering of [CharRenderer] components onto a [Terminal].
/// Default [System.priority] is 1000.
class CharRenderingSystem extends System<CharRenderer> {
  final _renderList = <_RenderListItem>[];

  @override
  int get priority => 1000;

  @override
  void update(double ds, List<CharRenderer> components) {
    _renderList.clear();

    for (var c in components) {
      var cPos = c.entity.get<Transform>();
      if (cPos == null) continue;

      _renderList.add(_RenderListItem(cPos.position, c.char));
    }
  }

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

    for (var r in _renderList) {
      if (clipBounds.contains(r.position)) {
        var pos = r.position - clipBounds.position;
        terminal.drawChar(pos.x, pos.y, r.char);
      }
    }
  }
}
