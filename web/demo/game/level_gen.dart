// level generation stuff: monster breed densities, placed monsters, items, etc.

import 'breed.dart';

class LevelGenData {
  final roomMonsters = <Breed, int>{};
  final corridorMonsters = <Breed, int>{};
}

class LevelGeneration {
  static final roomMonsters = {
    Breed.rat: [75, 60, 50, 40, 30, 25, 20, 15, 10, 10],
    Breed.ghoul: [25, 25, 25, 20, 20, 20, 20, 15, 15, 15],
    Breed.imp: [15, 20, 20, 25, 25, 20, 20, 15, 10],
    Breed.lesserDemon: [10, 10, 15, 15, 20, 20, 25, 25, 20, 20],
  };

  static LevelGenData getLevelData(int level) {
    var lvl = level - 1;
    var levelData = LevelGenData();

    for (var breed in roomMonsters.keys) {
      var breedChances = roomMonsters[breed];
      if (breedChances != null && breedChances.length > lvl) {
        levelData.roomMonsters[breed] = breedChances[lvl];
      }
    }

    return levelData;
  }
}
