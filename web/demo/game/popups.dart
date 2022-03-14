import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import '../input.dart';
import 'action.dart';
import 'game.dart';
import 'item.dart';
import 'weapon.dart';

class InventoryModal extends Modal<Input> {
  static const options = '[↑↓] Select  [e] Equip  [v] Inspect  [esc] Back';
  final List<Item> items;

  int selectedItem = 0;

  factory InventoryModal() {
    final items = <Item>[];

    var maxWidth = options.length;
    for (var item in game.hero.inventory) {
      items.add(item);
      if (item.name.length > maxWidth) maxWidth = item.name.length;
    }

    final panel = Frame.forContent(
      maxWidth,
      items.isEmpty ? 3 : items.length + 2,
      'Inventory',
      titleColor: Color.lightGold,
      borderColor: Color.gold,
      padding: 1,
    );

    return InventoryModal._(items, panel);
  }

  InventoryModal._(this.items, Panel panel) : super(panel) {
    panel.contentRenderer = renderContent;
  }

  void renderContent(Terminal terminal) {
    if (items.isEmpty) terminal.drawTextCenter(0, 'Empty!');

    for (var i = 0; i < items.length; i++) {
      if (i == selectedItem) terminal.drawText(0, i, '► ', Color.orange);
      terminal.drawText(2, i, items[i].name, items[i].color);
    }

    terminal.drawTextCenter(terminal.height - 1, options, Color.gray);
  }

  @override
  bool onInput(InputBase input) {
    switch (input) {
      case Input.n:
        _changeItem(-1);
        dirty();
        return true;

      case Input.s:
        _changeItem(1);
        dirty();
        return true;

      case Input.equip:
        _equipSelectedItem();
        break;

      case Input.cancel:
        ui.pop();
        return true;
    }

    return false;
  }

  void _equipSelectedItem() {
    var item = items[selectedItem];
    if (item is Weapon) {
      game.hero.queueAction(EquipAction(item));
      ui.pop();
    }
  }

  void _changeItem(int amount) {
    if (items.isEmpty) return;
    selectedItem += amount;
    selectedItem = selectedItem.clamp(0, items.length - 1);
  }
}
