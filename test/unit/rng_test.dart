import 'package:fortress/util.dart';
import 'package:test/test.dart';

void main() {
  group('Rng', () {
    test('with the same seed produce the same sequence of values', () {
      var seed = 12345678;
      var r1 = Rng(seed);
      var r2 = Rng(seed);

      expect(r1.rand(), equals(r2.rand()));
      expect(r1.nextInt(10), equals(r2.nextInt(10)));
      expect(r1.nextDouble(10.0), equals(r2.nextDouble(10.0)));
      expect(r1.nextBool(), equals(r2.nextBool()));
    });

    test('.nextInt produces values between 0 inclusive and max exclusive', () {
      const max = 10;

      for (var i = 0; i < 1000; i++) {
        var randInt = rng.nextInt(max);
        expect(randInt, greaterThanOrEqualTo(0));
        expect(randInt, lessThan(max));
      }
    });

    test('.nextDouble produces values between 0.0 inclusive and max exclusive', () {
      const max = 10.0;

      for (var i = 0; i < 1000; i++) {
        var randInt = rng.nextDouble(max);
        expect(randInt, greaterThanOrEqualTo(0.0));
        expect(randInt, lessThan(max));
      }
    });
  });
}
