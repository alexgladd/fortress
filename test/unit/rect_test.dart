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
  });
}
