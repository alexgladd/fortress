import 'dart:math';

import 'package:fortress/util.dart';
import 'package:test/test.dart';

void main() {
  group('Vec2', () {
    test('equality works based on vector coordinates', () {
      var v1 = Vec2(1, 2);
      var v2 = Vec2(3, 4);
      var v3 = Vec2(3, 4);

      expect(v1 == v2, isFalse);
      expect(v2 == v3, isTrue);
    });

    test('.hashCode works based on vector coordinates', () {
      var v1 = Vec2(1, 2);
      var v2 = Vec2(3, 4);
      var v3 = Vec2(3, 4);

      expect(v1.hashCode, isNot(equals(v2.hashCode)));
      expect(v2.hashCode, equals(v3.hashCode));
    });

    test('.area is calculated correctly', () {
      var v1 = Vec2(2, 3);
      var v2 = Vec2(-3, 2);
      var v3 = Vec2(-2, -3);

      expect(v1.area, equals(6));
      expect(v2.area, equals(-6));
      expect(v3.area, equals(6));
    });

    test('.absArea is calculated correctly', () {
      var v1 = Vec2(2, 3);
      var v2 = Vec2(-3, 2);
      var v3 = Vec2(-2, -3);

      expect(v1.absArea, equals(6));
      expect(v2.absArea, equals(6));
      expect(v3.absArea, equals(6));
    });

    test('.lengthSquared is calculated correctly', () {
      var v1 = Vec2(-2, 2);
      var v2 = Vec2(0, 0);

      expect(v1.lengthSquared, equals(8));
      expect(v2.lengthSquared, equals(0));
    });

    test('.length is calculated correctly', () {
      var v1 = Vec2(1, 1);
      var v2 = Vec2(0, 0);

      expect(v1.length, equals(sqrt(2)));
      expect(v2.length, equals(0.0));
    });

    test(".clamp makes sure the given vector falls within this vector's bounds", () {
      var v1 = Vec2(3, 3);
      var v2 = Vec2(-3, -3);

      expect(v1.clamp(Vec2.identity), equals(Vec2.identity));
      expect(v1.clamp(Vec2(3, 3)), equals(Vec2(3, 3)));
      expect(v1.clamp(Vec2(5, 2)), equals(Vec2(3, 2)));
      expect(v1.clamp(Vec2(2, 5)), equals(Vec2(2, 3)));
      expect(v1.clamp(Vec2(-2, 2)), equals(Vec2(0, 2)));
      expect(v1.clamp(Vec2(2, -2)), equals(Vec2(2, 0)));
      expect(v1.clamp(Vec2(-2, -4)), equals(Vec2.zero));

      expect(v2.clamp(Vec2.identity), equals(Vec2.zero));
      expect(v2.clamp(Vec2(-3, -3)), equals(Vec2(-3, -3)));
      expect(v2.clamp(Vec2(-5, -2)), equals(Vec2(-3, -2)));
      expect(v2.clamp(Vec2(-2, -5)), equals(Vec2(-2, -3)));
      expect(v2.clamp(Vec2(-2, 2)), equals(Vec2(-2, 0)));
      expect(v2.clamp(Vec2(2, -2)), equals(Vec2(0, -2)));
      expect(v2.clamp(Vec2(2, 4)), equals(Vec2.zero));
    });

    test('operator + works for other vectors and ints', () {
      var v1 = Vec2(5, 5);

      expect(v1 + 5, equals(Vec2(10, 10)));
      expect(v1 + Vec2.identity, equals(Vec2(6, 6)));
      expect(() => v1 + 'foobar', throwsArgumentError);
    });

    test('operator - works for other vectors and ints', () {
      var v1 = Vec2(5, 5);

      expect(v1 - 3, equals(Vec2(2, 2)));
      expect(v1 - Vec2.identity, equals(Vec2(4, 4)));
      expect(() => v1 - 'foobar', throwsArgumentError);
    });
  });
}
