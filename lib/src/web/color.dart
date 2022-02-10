/// Basic set of colors and color utilities
///
/// Copyright (c) 2014 Robert Nystrom.
/// See https://github.com/munificent/malison
class Color {
  static const black = Color(0, 0, 0);
  static const white = Color(255, 255, 255);

  static const lightGray = Color(192, 192, 192);
  static const gray = Color(128, 128, 128);
  static const darkGray = Color(64, 64, 64);

  static const lightRed = Color(255, 160, 160);
  static const red = Color(220, 0, 0);
  static const darkRed = Color(100, 0, 0);

  static const lightOrange = Color(255, 200, 170);
  static const orange = Color(255, 128, 0);
  static const darkOrange = Color(128, 64, 0);

  static const lightGold = Color(255, 230, 150);
  static const gold = Color(255, 192, 0);
  static const darkGold = Color(128, 96, 0);

  static const lightYellow = Color(255, 255, 150);
  static const yellow = Color(255, 255, 0);
  static const darkYellow = Color(128, 128, 0);

  static const lightGreen = Color(130, 255, 90);
  static const green = Color(0, 128, 0);
  static const darkGreen = Color(0, 64, 0);

  static const lightAqua = Color(128, 255, 255);
  static const aqua = Color(0, 255, 255);
  static const darkAqua = Color(0, 128, 128);

  static const lightBlue = Color(128, 160, 255);
  static const blue = Color(0, 64, 255);
  static const darkBlue = Color(0, 37, 168);

  static const lightPurple = Color(200, 140, 255);
  static const purple = Color(128, 0, 255);
  static const darkPurple = Color(64, 0, 128);

  static const lightBrown = Color(190, 150, 100);
  static const brown = Color(160, 110, 60);
  static const darkBrown = Color(100, 64, 32);

  final int r;
  final int g;
  final int b;

  String get cssColor => "rgb($r, $g, $b)";

  const Color(this.r, this.g, this.b);

  @override
  int get hashCode => r.hashCode ^ g.hashCode ^ b.hashCode;

  @override
  bool operator ==(Object other) {
    if (other is Color) {
      return r == other.r && g == other.g && b == other.b;
    }

    return false;
  }

  Color add(Color other, [double? fractionOther]) {
    fractionOther ??= 1.0;
    return Color(
        (r + other.r * fractionOther).clamp(0, 255).toInt(),
        (g + other.g * fractionOther).clamp(0, 255).toInt(),
        (b + other.b * fractionOther).clamp(0, 255).toInt());
  }

  Color blend(Color other, double fractionOther) {
    var fractionThis = 1.0 - fractionOther;
    return Color(
        (r * fractionThis + other.r * fractionOther).toInt(),
        (g * fractionThis + other.g * fractionOther).toInt(),
        (b * fractionThis + other.b * fractionOther).toInt());
  }

  Color blendPercent(Color other, int percentOther) =>
      blend(other, percentOther / 100);
}
