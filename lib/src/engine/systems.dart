import 'components.dart';
import 'ecs.dart';
import '../util/tuple.dart';
import '../util/vector.dart';
import '../web/char.dart';
import '../web/terminal.dart';

class _RenderListItem extends Tuple2<Vec2, Char> {
  Vec2 get position => first;
  Char get char => second;
  _RenderListItem(Vec2 position, Char char) : super(position, char);
}

/// Handles the rendering of [CharRenderer] components onto a [Terminal].
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

  /// Render the current render list to the given [terminal]
  void render(Terminal terminal) {
    for (var r in _renderList) {
      terminal.drawChar(r.position.x, r.position.y, r.char);
    }
  }
}
