import 'dart:math' as math;

import 'package:fortress/util.dart';
import 'package:fortress/web.dart';

import '../input.dart';
import 'action.dart';
import 'game.dart';
import 'item.dart';

class InventoryModal extends Modal<Input> {
  static const options =
      '[↑↓] Select  [e] Equip/Use  [v] Inspect  [d] Drop  [esc] Back';
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
        return true;

      case Input.s:
        _changeItem(1);
        return true;

      case Input.equipUse:
        _equipUseSelectedItem();
        break;

      case Input.inspect:
        _inspectSelectedItem();
        break;

      case Input.drop:
        _dropSelectedItem();
        break;

      case Input.cancel:
        ui.pop();
        return true;
    }

    return false;
  }

  void _equipUseSelectedItem() {
    var item = items[selectedItem];
    if (item.isEquipable) {
      game.hero.queueAction(EquipAction(item));
      ui.pop();
    } else if (item.isUsable) {
      game.hero.queueAction(UseAction(item));
      ui.pop();
    } else {
      game.log.msg('${game.hero.subject} cannot equip or use the ${item.name}');
      dirty();
    }
  }

  void _dropSelectedItem() {
    var item = items[selectedItem];
    if (game.getItemAt(game.hero.position) == null) {
      game.hero.queueAction(DropAction(item));
      ui.pop();
    } else {
      game.log.msg('${game.hero.subject} cannot drop an item here');
      dirty();
    }
  }

  void _inspectSelectedItem() {
    var item = items[selectedItem];
    ui.push(InspectModal(item));
  }

  void _changeItem(int amount) {
    if (items.isEmpty) return;
    selectedItem += amount;
    selectedItem = selectedItem.clamp(0, items.length - 1);
    dirty();
  }
}

class InspectModal extends Modal<Input> {
  static const options = '[enter] OK';
  final List<Tuple2<String, Color?>> lines;

  factory InspectModal(Item item) {
    final lines = <Tuple2<String, Color?>>[];
    final effectColor = Color.lightGray;
    final maxWidth = math.max<int>(item.name.length + 2, 20);

    if (item.isEquipable) {
      lines.add(Tuple2('Equipable', null));
      lines.add(Tuple2(' ', null));
    }

    if (item.isUsable) {
      lines.add(Tuple2('Usable', null));
      lines.add(Tuple2(' ', null));
    }

    if (item.onPickup.isNotEmpty) {
      lines.add(Tuple2('On pickup', null));
      for (var e in item.onPickup) {
        final splitE = e.toString().split('\n');
        lines.addAll(splitE.map((e) => Tuple2(' $e', effectColor)));
      }
      lines.add(Tuple2(' ', null));
    }

    if (item.onEquip.isNotEmpty) {
      lines.add(Tuple2('On equip', null));
      for (var e in item.onEquip) {
        final splitE = e.toString().split('\n');
        lines.addAll(splitE.map((e) => Tuple2(' $e', effectColor)));
      }
      lines.add(Tuple2(' ', null));
    }

    if (item.onUse.isNotEmpty) {
      lines.add(Tuple2('On use', null));
      for (var e in item.onUse) {
        final splitE = e.toString().split('\n');
        lines.addAll(splitE.map((e) => Tuple2(' $e', effectColor)));
      }
      lines.add(Tuple2(' ', null));
    }

    final panel = Frame.forContent(maxWidth, lines.length + 1, item.name,
        titleColor: item.color, borderColor: Color.gold, padding: 1);

    return InspectModal._(lines, panel);
  }

  InspectModal._(this.lines, Panel panel) : super(panel) {
    panel.contentRenderer = renderContent;
  }

  void renderContent(Terminal terminal) {
    for (var i = 0; i < lines.length; i++) {
      final line = lines[i];
      terminal.drawText(0, i, line.first, line.second);
    }

    terminal.drawTextCenter(terminal.height - 1, options, Color.gray);
  }

  @override
  bool onInput(Input input) {
    if (input == Input.ok) {
      ui.pop();
      return true;
    }

    return false;
  }
}
