import 'package:fortress/util.dart';
import 'package:test/test.dart';

void main() {
  group('Array2', () {
    test('constructor builds a 2D array with the right sizes', () {
      var a1 = Array2(4, 7, Vec2.identity);
      expect(a1.width, equals(4));
      expect(a1.height, equals(7));
      expect(a1.size, equals(Vec2(4, 7)));
    });

    test('constructor fills the array with the given value', () {
      var a1 = Array2(4, 5, Vec2.identity);

      for (var v in a1) {
        expect(v, equals(Vec2.identity));
      }
    });

    test('.iterator provides an iterable through all elements', () {
      var a1 = Array2(5, 3, Vec2.identity);
      var num = 0;

      for (var _ in a1) {
        num++;
      }

      expect(num, equals(15));
    });

    test('.get provides expected values', () {
      var a1 = Array2(4, 4, Vec2.identity);
      expect(a1.get(0, 0), equals(Vec2.identity));
      expect(() => a1.get(4, 4), throwsRangeError);

      a1.set(2, 3, Vec2.zero);
      expect(a1.get(2, 3), equals(Vec2.zero));
    });

    test('.set updates expected values and returns previous values', () {
      var a1 = Array2(4, 4, Vec2.identity);
      expect(a1.set(1, 1, Vec2.zero), equals(Vec2.identity));
      expect(a1.get(1, 1), equals(Vec2.zero));
      expect(() => a1.set(4, 4, Vec2.zero), throwsRangeError);
    });

    test('operator [] uses .get correctly', () {
      var a1 = Array2(4, 4, Vec2.identity);
      a1.set(2, 2, Vec2.zero);

      expect(a1[Vec2(2, 2)], equals(Vec2.zero));
      expect(() => a1[Vec2(4, 4)], throwsRangeError);
    });

    test('operator []= uses .set correctly', () {
      var a1 = Array2(4, 4, Vec2.identity);
      a1[Vec2(2, 2)] = Vec2.zero;

      expect(a1.get(2, 2), equals(Vec2.zero));
      expect(() => a1[Vec2(4, 4)] = Vec2.zero, throwsRangeError);
    });

    test('.fill fills the entire array with the given value', () {
      var a1 = Array2(4, 4, Vec2.identity);
      a1.fill(Vec2.zero);
      expect(a1.get(0, 0), equals(Vec2.zero));
      expect(a1.get(3, 3), equals(Vec2.zero));
    });
  });
}
