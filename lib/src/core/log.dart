import 'dart:async';

/// Base handler for listening to the [Logger.onLog] stream
abstract class LogHandler {
  const LogHandler();

  /// Handle the give [log] record from the [Logger.onLog] broadcast [Stream]
  void onLogRecord(LogRecord log);
}

/// Simple [LogHandler] that [print]s log records
class PrintLogHandler extends LogHandler {
  const PrintLogHandler();

  @override
  void onLogRecord(LogRecord log) {
    var msg = '[${_levelToStr(log.level)}][${log.loggerName}] ${log.message}';

    if (log.object != null) msg += ': ${log.object}';

    print(msg);

    if (log.error != null) {
      print(log.error);
      if (log.error!.stackTrace != null) print(log.error!.stackTrace);
    }
  }

  String _levelToStr(LogLevel level) {
    switch (level) {
      case LogLevel.debug:
        return 'D';
      case LogLevel.info:
        return 'I';
      case LogLevel.warning:
        return 'W';
      case LogLevel.error:
        return 'E';
      case LogLevel.critical:
        return '!';
    }
  }
}

/// Logging levels for the [Logger]
enum LogLevel {
  debug,
  info,
  warning,
  error,
  critical,
}

/// A single log event from the [Logger]
class LogRecord {
  /// The date/time the record was logged
  final DateTime time;

  /// The name of the logger that logged the record
  final String loggerName;

  /// The log level of the log record
  final LogLevel level;

  /// The log message
  final String message;

  /// The optional log object
  final Object? object;

  /// The optional log error
  final Error? error;

  /// Create a new [LogRecord]
  LogRecord(this.loggerName, this.level, this.message,
      {this.object, this.error})
      : time = DateTime.now();
}

/// Basic [Stream]-based logger.
class Logger {
  /// The default [LogLevel]
  static const defaultLevel = LogLevel.error;

  /// The default log handler
  static const defaultHandler = PrintLogHandler();

  static final _loggers = <String, Logger>{};

  /// The current logging level; defaults to error and above
  static var level = defaultLevel;

  /// Stream for logging messages
  static StreamController<LogRecord>? _controller;

  /// Default subscription for handling log messages
  static StreamSubscription<LogRecord>? _defaultSubscription;

  /// The [Stream] of logged messages
  static Stream<LogRecord> get onLog => _getStream();

  /// The logger's name
  final String name;

  /// Cancel the default log handler subscription
  static void cancelDefaultHandling() {
    if (_defaultSubscription != null) _defaultSubscription!.cancel();
  }

  /// Reset the default log handler
  static void resetDefaultHandling() {
    cancelDefaultHandling();
    _defaultSubscription = onLog.listen(defaultHandler.onLogRecord);
  }

  /// Get the logger [Stream]. Creates the [StreamController] if it is not
  /// already created.
  static Stream<LogRecord> _getStream() {
    _controller ??= StreamController<LogRecord>.broadcast(sync: true);
    return _controller!.stream;
  }

  /// Create a named logger if one with the given [name] doesn't already exist.
  /// If one does exist, returns that instead of creating a new one.
  factory Logger(String name) {
    _defaultSubscription ??= onLog.listen(defaultHandler.onLogRecord);
    return _loggers.putIfAbsent(name, () => Logger._(name));
  }

  Logger._(this.name);

  /// Log a [message], which will be broadcast through [onLog] to all listeners
  /// of the [Stream] if the given [level] is greater than or equal to the
  /// current [Logger.level]. May optionally also include an [object] and/or
  /// an [error] as part of the log record.
  void log(LogLevel level, String message, Object? object, Error? error) {
    if (_controller == null || level.index < Logger.level.index) return;

    final record =
        LogRecord(name, level, message, object: object, error: error);
    _controller!.add(record);
  }

  /// Log a [message] at the [LogLevel.debug] level
  void debug(String message, {Object? object, Error? error}) =>
      log(LogLevel.debug, message, object, error);

  /// Log a [message] at the [LogLevel.info] level
  void info(String message, {Object? object, Error? error}) =>
      log(LogLevel.info, message, object, error);

  /// Log a [message] at the [LogLevel.warning] level
  void warn(String message, {Object? object, Error? error}) =>
      log(LogLevel.warning, message, object, error);

  /// Log a [message] at the [LogLevel.error] level
  void error(String message, {Object? object, Error? error}) =>
      log(LogLevel.error, message, object, error);

  /// Log a [message] at the [LogLevel.critical] level
  void critical(String message, {Object? object, Error? error}) =>
      log(LogLevel.critical, message, object, error);
}
