import 'dart:collection';

import 'package:fortress/util.dart';

enum LogType {
  message,
  combat,
}

class LogEntry extends Tuple2<LogType, String> {
  LogType get type => first;
  String get msg => second;
  LogEntry(LogType type, String message) : super(type, message);
}

class GameLog {
  final int _maxLength;
  final _log = Queue<LogEntry>();

  GameLog([int maxLength = 10]) : _maxLength = maxLength;

  List<LogEntry> getLogs([int count = 5]) =>
      _log.take(count).toList(growable: false);

  void log(LogType type, String message) {
    _log.addFirst(LogEntry(type, message));
    _purge();
  }

  void clear() {
    _log.clear();
  }

  void msg(String message) => log(LogType.message, message);

  void combat(String message) => log(LogType.combat, message);

  void _purge() {
    while (_log.length > _maxLength) {
      _log.removeLast();
    }
  }
}
