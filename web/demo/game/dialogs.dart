import 'package:fortress/web.dart';

import '../input.dart';

final levelChangeDialog = Modal<Input>.yesNo(
  'Are you ready to descend to the next level?',
  borderType: PanelBorder.solid,
  borderColor: Color.gold,
  actionTextColor: Color.gray,
  yesResult: true,
  noResult: false,
);
