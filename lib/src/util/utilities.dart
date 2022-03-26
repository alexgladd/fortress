// other untilities that don't fit elsewhere

/// Word-wraps the given [text] so that it fits within the given [width]. The
/// [text] will be broken into a list of lines, first looking for whitespace
/// breaks, then forcing character breaks. Also trims all leading and trailing
/// whitespace.
List<String> wordWrap(String text, int width) {
  final trimText = text.trim();
  final lines = <String>[];
  var start = 0;
  int? wordBreak;

  // break into lines
  for (var i = 0; i < trimText.length; i++) {
    if (isWhitespace(trimText[i])) wordBreak = i + 1;

    if (i - start >= width) {
      String line;
      // force character wrap if no whitespace break
      if (wordBreak == null) {
        wordBreak = i - 1;
        line = '${trimText.substring(start, wordBreak)}-';
      } else {
        line = trimText.substring(start, wordBreak).trim();
      }

      lines.add(line);
      start = wordBreak;
      wordBreak = null;

      while (start < trimText.length && isWhitespace(trimText[start])) {
        start++;
      }

      i = start;
    }
  }

  // handle leftover last line
  final lastLine = trimText.substring(start).trim();
  if (lastLine.isNotEmpty) lines.add(lastLine);

  return lines;
}

/// Returns true if the given [intOrString] is an [int] or [String] which
/// represents a whitespace character (including unicode). If given a [String],
/// only the first character is checked. The definition of whitespace matches
/// what is used for [String.trim].
bool isWhitespace(Object intOrString) {
  if (intOrString is String && intOrString.isEmpty) return false;

  int value;
  if (intOrString is int) {
    value = intOrString;
  } else if (intOrString is String) {
    if (intOrString.isEmpty) return false;
    value = intOrString.codeUnits[0];
  } else {
    return false;
  }

  return (value >= 0x0009 && value <= 0x000D) ||
      value == 0x0020 ||
      value == 0x0085 ||
      value == 0x00A0 ||
      value == 0x1680 ||
      value == 0x180E ||
      (value >= 0x2000 && value <= 0x200A) ||
      value == 0x2028 ||
      value == 0x2029 ||
      value == 0x202F ||
      value == 0x205F ||
      value == 0x3000 ||
      value == 0xFEFF;
}
