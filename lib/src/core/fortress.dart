import 'dart:async';

import 'log.dart';

/// Fortress internal runtime configuration constants
class Fortress {
  static var _debugEnabled = false;

  /// True if debug mode is currently enabled
  static bool get debugEnabled => _debugEnabled;

  /// Set debug mode to [enabled]. If enabling debug mode, will also
  /// automatically set the log level to debug. If disabling debug mode, will
  /// set the log level back to the default (error).
  static set debugEnabled(bool enabled) {
    _debugEnabled = enabled;

    if (enabled) {
      logLevel = LogLevel.debug;
    } else {
      logLevel = Logger.defaultLevel;
    }
  }

  /// Set the [LogLevel] for the Fortress [Logger]
  static set logLevel(LogLevel level) => Logger.level = level;

  /// Enable debug mode
  static void enableDebugMode() => debugEnabled = true;

  /// Disable debug mode
  static void disableDebugMode() => debugEnabled = false;

  /// Get a named logger
  static Logger logger(String name) => Logger(name);

  /// Subscribe the [handler] to the Fortress [Logger.onLog] stream
  static StreamSubscription<LogRecord> addLogHandler(LogHandler handler) =>
      Logger.onLog.listen(handler.onLogRecord);
}
