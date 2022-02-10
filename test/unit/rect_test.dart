import 'package:fortress/util.dart';
import 'package:test/test.dart';

void main() {
  group('Rect', () {
    test('x and y are set correctly', () {
      var r1 = Rect(Vec2(-2, 3), Vec2(2, 2));
      expect(r1.x, equals(-2));
      expect(r1.y, equals(3));
    });

    test('width and height are set correctly', () {
      var r1 = Rect(Vec2(0, 0), Vec2(-3, 3));
      expect(r1.width, equals(-3));
      expect(r1.height, equals(3));
    });

    test('top, bottom, left, and right are correct with positive size', () {
      var r1 = Rect(Vec2(1, 2), Vec2(3, 4));
      var r2 = Rect(Vec2(-2, -3), Vec2(4, 5));

      expect(r1.top, equals(2));
      expect(r1.bottom, equals(6));
      expect(r1.left, equals(1));
      expect(r1.right, equals(4));

      expect(r2.top, equals(-3));
      expect(r2.bottom, equals(2));
      expect(r2.left, equals(-2));
      expect(r2.right, equals(2));
    });

    test('top, bottom, left, and right are correct with negative size', () {
      var r1 = Rect(Vec2(1, 2), Vec2(-3, -4));
      var r2 = Rect(Vec2(-2, -3), Vec2(-4, -5));

      expect(r1.top, equals(-2));
      expect(r1.bottom, equals(2));
      expect(r1.left, equals(-2));
      expect(r1.right, equals(1));

      expect(r2.top, equals(-8));
      expect(r2.bottom, equals(-3));
      expect(r2.left, equals(-6));
      expect(r2.right, equals(-2));
    });

    test('corners are set correctly', () {
      var r1 = Rect(Vec2(-2, 2), Vec2(2, -4));
      var r2 = Rect(Vec2(3, -3), Vec2(-3, 5));

      expect(r1.topLeft, equals(Vec2(-2, -2)));
      expect(r1.topRight, equals(Vec2(0, -2)));
      expect(r1.bottomLeft, equals(Vec2(-2, 2)));
      expect(r1.bottomRight, equals(Vec2(0, 2)));

      expect(r2.topLeft, equals(Vec2(0, -3)));
      expect(r2.topRight, equals(Vec2(3, -3)));
      expect(r2.bottomLeft, equals(Vec2(0, 2)));
      expect(r2.bottomRight, equals(Vec2(3, 2)));
    });

    test('center is calculated correctly', () {
      var r1 = Rect(Vec2(1, 2), Vec2(3, 4));
      var r2 = Rect(Vec2(1, 2), Vec2(-3, -4));

      expect(r1.center, equals(Vec2(2, 4)));
      expect(r2.center, equals(Vec2(0, 0)));
    });

    test('areas are calculated correctly', () {
      var r1 = Rect(Vec2(-2, 2), Vec2(2, -4));
      expect(r1.area, equals(-8));
      expect(r1.absArea, equals(8));
    });

    test('.sides constructor sets the correct position and size', () {
      var r1 = Rect.sides(1, 5, 4, 1);
      var r2 = Rect.sides(-2, 1, 3, -3);
      var r3 = Rect.sides(5, 0, 1, 4);

      expect(r1.position, equals(Vec2(1, 1)));
      expect(r1.size, equals(Vec2(4, 3)));

      expect(r2.position, equals(Vec2(-3, -2)));
      expect(r2.size, equals(Vec2(4, 5)));

      expect(r3.position, equals(Vec2(4, 5)));
      expect(r3.size, equals(Vec2(-4, -4)));
    });

    test('.sides constructor handles mixed up coordinates', () {
      var r1 = Rect.sides(5, 0, 1, 4);
      expect(r1.top, equals(1));
      expect(r1.bottom, equals(5));
      expect(r1.left, equals(0));
      expect(r1.right, equals(4));
    });

    test('.atOrigin constructor sets correct position and size', () {
      var r1 = Rect.atOrigin(4, 5);
      expect(r1.position, equals(Vec2.zero));
      expect(r1.size, equals(Vec2(4, 5)));
    });

    test('.positionAndSize constructor sets correct position and size', () {
      var r1 = Rect.positionAndSize(-2, 4, 3, 5);
      expect(r1.position, equals(Vec2(-2, 4)));
      expect(r1.size, equals(Vec2(3, 5)));
    });

    test('.clamp keeps a vector within the row/col bounds of the rect', () {
      var r1 = Rect.sides(-1, 4, 3, -2);
      // corners
      expect(r1.clamp(Vec2(-2, -1)), equals(Vec2(-2, -1)));
      expect(r1.clamp(Vec2(4, -1)), equals(Vec2(3, -1)));
      expect(r1.clamp(Vec2(4, 3)), equals(Vec2(3, 2)));
      expect(r1.clamp(Vec2(-2, 3)), equals(Vec2(-2, 2)));
      // general
      expect(r1.clamp(Vec2(2, -4)), equals(Vec2(2, -1)));
      expect(r1.clamp(Vec2(6, 2)), equals(Vec2(3, 2)));
      expect(r1.clamp(Vec2(2, 5)), equals(Vec2(2, 2)));
      expect(r1.clamp(Vec2(-4, 2)), equals(Vec2(-2, 2)));
    });

    test('.containsRect returns true if the other is within it', () {
      var r1 = Rect.sides(-2, 4, 4, -2);
      var r2 = Rect.sides(-2, 4, 4, -2);
      var r3 = Rect.sides(0, 3, 3, 0);
      var r4 = Rect.sides(-3, 5, 5, -3);
      var r5 = Rect.sides(0, 5, 3, 0);
      var r6 = Rect.sides(10, 12, 14, 6);

      expect(r1.containsRect(r2), isTrue);
      expect(r1.containsRect(r3), isTrue);
      expect(r1.containsRect(r4), isFalse);
      expect(r1.containsRect(r5), isFalse);
      expect(r1.containsRect(r6), isFalse);
    });

    test(
        '.containsVec returns true if the vector is within the row/col bounds '
        'of the rect', () {
      var r1 = Rect.sides(-2, 4, 4, -2);
      expect(r1.containsVec(Vec2.zero), isTrue);
      // corners
      expect(r1.containsVec(Vec2(-2, -2)), isTrue);
      expect(r1.containsVec(Vec2(4, -2)), isFalse);
      expect(r1.containsVec(Vec2(3, -2)), isTrue);
      expect(r1.containsVec(Vec2(4, 4)), isFalse);
      expect(r1.containsVec(Vec2(3, 3)), isTrue);
      expect(r1.containsVec(Vec2(-2, 4)), isFalse);
      expect(r1.containsVec(Vec2(-2, 3)), isTrue);
    });

    test('.contains works for other rects and vectors', () {
      var r1 = Rect.sides(-2, 4, 4, -2);
      expect(r1.contains(Vec2.zero), isTrue);
      expect(r1.contains(Rect.sides(-3, 3, 3, -3)), isFalse);
      expect(() => r1.contains('should throw'), throwsArgumentError);
    });

    test('.distanceTo calculates accurate corridor distances', () {
      var r1 = Rect.atOrigin(4, 4);

      // adjacentcy
      expect(r1.distanceTo(Rect.sides(-4, 4, 0, 0)), equals(0));
      expect(r1.distanceTo(Rect.sides(0, 8, 4, 4)), equals(0));
      expect(r1.distanceTo(Rect.sides(4, 4, 8, 0)), equals(0));
      expect(r1.distanceTo(Rect.sides(0, 0, 4, -4)), equals(0));
      expect(r1.distanceTo(Rect.sides(-4, 0, 0, -4)), equals(0));

      // overlap
      expect(r1.distanceTo(Rect.sides(1, 3, 3, 1)), equals(-1));
      expect(r1.distanceTo(Rect.sides(2, 6, 6, 2)), equals(-1));
      expect(r1.distanceTo(Rect.sides(-2, 2, 2, -2)), equals(-1));

      // distance
      expect(r1.distanceTo(Rect.positionAndSize(6, 0, 2, 2)), equals(2));
      expect(r1.distanceTo(Rect.positionAndSize(6, 6, 2, 2)), equals(4));
      expect(r1.distanceTo(Rect.positionAndSize(-10, 0, 2, 2)), equals(8));
      expect(r1.distanceTo(Rect.positionAndSize(0, 10, 2, 2)), equals(6));
      expect(r1.distanceTo(Rect.positionAndSize(-10, 10, 2, 2)), equals(14));
    });

    test('.shrink returns a shrunken rect within limits', () {
      var r1 = Rect.atOrigin(10, 10);

      expect(r1.shrink(0), equals(r1));
      expect(r1.shrink(10), equals(Rect.nill));
      expect(r1.shrink(20), equals(Rect.nill));
      expect(r1.shrink(1), equals(Rect.sides(1, 9, 9, 1)));
      expect(r1.shrink(4), equals(Rect.sides(4, 6, 6, 4)));
      expect(r1.shrink(-2), equals(Rect.sides(-2, 12, 12, -2)));
    });

    test('.expand returns an expanded rect', () {
      var r1 = Rect.atOrigin(10, 10);

      expect(r1.expand(0), equals(r1));
      expect(r1.expand(1), equals(Rect.sides(-1, 11, 11, -1)));
      expect(r1.expand(4), equals(Rect.sides(-4, 14, 14, -4)));
      expect(r1.expand(-2), equals(Rect.sides(2, 8, 8, 2)));
    });

    test('.centerRect returns a rect of the given size centered on this', () {
      var r1 = Rect.sides(2, 7, 7, 2);
      expect(r1.centerRect(5, 5), equals(r1));
      expect(r1.centerRect(3, 3), equals(Rect.sides(3, 6, 6, 3)));
      expect(r1.centerRect(4, 4), equals(Rect.sides(2, 6, 6, 2)));
    });

    test('.getPoints includes all row/col points within the rect bounds', () {
      var r1 = Rect.sides(2, 7, 7, 2);
      var pts = r1.getPoints();
      expect(pts.length, equals(r1.absArea));
      expect(pts.first, equals(Vec2(2, 2)));
      expect(pts.last, equals(Vec2(6, 6)));
    });

    test('operator == works based on laid-out rects', () {
      var r1 = Rect.atOrigin(4, 4);
      var r2 = Rect.positionAndSize(4, 4, -4, -4);
      expect(r1 == r2, isTrue);
      expect(r1 == Rect.positionAndSize(1, 1, 3, 3), isFalse);
      // ignore: unrelated_type_equality_checks
      expect(r1 == 'foo', isFalse);
    });

    test('.hashCode returns equivalent values for equivalent rects', () {
      var r1 = Rect.atOrigin(4, 4);
      var r2 = Rect.positionAndSize(4, 4, -4, -4);
      var r3 = Rect.positionAndSize(0, 0, -4, -4);

      expect(r1.hashCode == r2.hashCode, isTrue);
      expect(r1.hashCode == r3.hashCode, isFalse);
    });
  });
}
