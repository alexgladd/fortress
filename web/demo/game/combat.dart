import 'actor.dart';

class CombatStats {
  int _attack;
  int _attackBonus = 0;
  int _defense;
  int _defenseBonus = 0;
  int _accuracy;
  int _dodge;

  int get attack => (_attack + _attackBonus).clamp(0, 20);
  int get attackBase => _attack;
  int get attackBonus => _attackBonus;

  int get defense => (_defense + _defenseBonus).clamp(0, 10);
  int get defenseBase => _defense;
  int get defenseBonus => _defenseBonus;

  int get dodge => _dodge.clamp(-10, 10);

  int get accuracy => _accuracy.clamp(-10, 10);

  /// Combat stats for an [Actor].
  /// - [attack] is the actor's base attack roll (0 - 20)
  /// - [defense] is the actor's base damage absorption roll (0 - 10)
  /// - [accuracy] is the actor's hit bonus or penalty (-10 - 10)
  /// - [dodge] is the actor's hit avoidance bonus or penalty (-10 - 10)
  CombatStats({int? attack, int? accuracy, int? dodge, int? defense})
      : _attack = attack ?? 0,
        _defense = defense ?? 0,
        _dodge = dodge ?? 0,
        _accuracy = accuracy ?? 0;

  void setAttack(int attack) => _attack = attack;

  void modAttack(int amount) => _attackBonus += amount;

  void setDefense(int defense) => _defense = defense;

  void modDefense(int amount) => _defenseBonus += amount;

  void modDodge(int amount) => _dodge += amount;

  void modAccuracy(int amount) => _accuracy += amount;
}
