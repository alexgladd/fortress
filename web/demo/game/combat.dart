import 'actor.dart';

class CombatStats {
  final int _baseAttack;
  final int _baseDefense;

  int _attack;
  int _attackBonus = 0;
  int _defense;
  int _defenseBonus = 0;
  int _accuracy;
  int _dodge;
  int _vision;

  int get attack => (_attack + _attackBonus).clamp(0, 20);
  int get attackBase => _attack;
  int get attackBonus => _attackBonus;

  int get defense => (_defense + _defenseBonus).clamp(0, 10);
  int get defenseBase => _defense;
  int get defenseBonus => _defenseBonus;

  int get dodge => _dodge.clamp(-10, 10);

  int get accuracy => _accuracy.clamp(-10, 10);

  int get vision => _vision >= 0 ? _vision : 0;

  /// Combat stats for an [Actor].
  /// - [attack] is the actor's base attack roll (0 - 20)
  /// - [defense] is the actor's base damage absorption roll (0 - 10)
  /// - [accuracy] is the actor's hit bonus or penalty (-10 - 10)
  /// - [dodge] is the actor's hit avoidance bonus or penalty (-10 - 10)
  /// - [vision] is the actor's base vision radius
  CombatStats(
      {int? attack, int? accuracy, int? dodge, int? defense, int? vision})
      : _baseAttack = attack ?? 0,
        _attack = attack ?? 0,
        _baseDefense = defense ?? 0,
        _defense = defense ?? 0,
        _dodge = dodge ?? 0,
        _accuracy = accuracy ?? 0,
        _vision = vision ?? 0;

  void setAttack(int attack) => _attack = attack;

  void modAttack(int amount) => _attackBonus += amount;

  void resetAttack() => _attack = _baseAttack;

  void setDefense(int defense) => _defense = defense;

  void modDefense(int amount) => _defenseBonus += amount;

  void resetDefense() => _defense = _baseDefense;

  void modDodge(int amount) => _dodge += amount;

  void modAccuracy(int amount) => _accuracy += amount;

  void modVision(int amount) => _vision += amount;

  CombatStats cloneBase() => CombatStats(
        attack: attackBase,
        defense: defenseBase,
        accuracy: accuracy,
        dodge: dodge,
        vision: vision,
      );
}
