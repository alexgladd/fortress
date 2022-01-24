import 'util/char_code.dart';
import 'color.dart';
import 'terminal.dart';

/// Immutable character intended to be written to a [Terminal]
class Char {
  /// The empty character (represented by a space) using the default background color [Color.black]
  static const clear = Char(CharCode.space);

  /// The null character; useful as an initial state
  static const nill = Char(CharCode.nullChar);

  final int charCode;
  final Color foreground;
  final Color background;

  const Char(this.charCode, [Color? foreground, Color? background])
      : foreground = foreground ?? Color.white,
        background = background ?? Color.black;

  /// Creates a new [Char] for the given [charOrCharCode] (which must be an [int] or non-empty
  /// [String]) using the optional [foreground] and [background] [Color]s.
  factory Char.create(Object charOrCharCode, [Color? foreground, Color? background]) {
    if (charOrCharCode is String && charOrCharCode.isNotEmpty) {
      return Char(charOrCharCode.codeUnits[0], foreground, background);
    } else if (charOrCharCode is int) {
      return Char(charOrCharCode, foreground, background);
    } else {
      throw ArgumentError.value(
          charOrCharCode, 'charOrCharCode', 'Argument must be a non-empty String or an int');
    }
  }

  @override
  int get hashCode => charCode.hashCode ^ foreground.hashCode ^ background.hashCode;

  @override
  bool operator ==(Object other) {
    if (other is Char) {
      return charCode == other.charCode &&
          foreground == other.foreground &&
          background == other.background;
    } else {
      return false;
    }
  }
}
