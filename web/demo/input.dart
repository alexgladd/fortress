import 'package:fortress/util.dart';

class Input extends InputBase {
  static const n = Input('north');
  static const ne = Input('northeast');
  static const e = Input('east');
  static const se = Input('southeast');
  static const s = Input('south');
  static const sw = Input('southwest');
  static const w = Input('southwest');
  static const nw = Input('northwest');

  static const ok = Input('ok');

  const Input(String name) : super(name);
}
