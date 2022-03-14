// level generation stuff: monster breed densities, placed monsters, items, etc.

import 'breed.dart';
import 'item.dart';
import 'weapon.dart';

enum LevelPlacement {
  startRoom,
  endRoom,
}

class MonsterPlacement {
  final LevelPlacement placement;
  final Breed breed;
  MonsterPlacement(this.breed, this.placement);
}

class ItemPlacement {
  final LevelPlacement placement;
  final Item item;
  ItemPlacement(this.item, this.placement);
}

class LevelGenData {
  final roomMonsters = <Breed, int>{};
  final corridorMonsters = <Breed, int>{};
  final placedMonsters = <MonsterPlacement>[];
  final placedItems = <ItemPlacement>[];
}

class LevelGeneration {
  static final roomMonsters = {
    Breed.rat: [75, 60, 50, 40, 30, 25, 20, 15, 10, 10],
    Breed.ghoul: [25, 25, 25, 20, 20, 20, 20, 15, 15, 15],
    Breed.imp: [15, 20, 20, 25, 25, 20, 20, 15, 10],
    Breed.lesserDemon: [10, 10, 15, 15, 20, 20, 25, 25, 20, 20],
  };

  // static final roomItems = {};

  // static final placedMonster = [];

  static final placedItems = [
    // lvl 0
    [
      ItemPlacement(Weapon.dagger, LevelPlacement.startRoom),
      ItemPlacement(Weapon.shortSword, LevelPlacement.startRoom),
    ],
  ];

  static LevelGenData getLevelData(int level) {
    var lvl = level - 1;
    var levelData = LevelGenData();

    for (var breed in roomMonsters.keys) {
      var breedChances = roomMonsters[breed];
      if (breedChances != null && breedChances.length > lvl) {
        levelData.roomMonsters[breed] = breedChances[lvl];
      }
    }

    if (placedItems.length > lvl) {
      levelData.placedItems.addAll(placedItems[lvl]);
    }

    return levelData;
  }
}
