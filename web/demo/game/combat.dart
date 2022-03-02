import 'actor.dart';

class CombatStats {
  int _attack;
  int _defense;
  int _accuracy;
  int _dodge;

  int get attack => _attack.clamp(1, 20);

  int get defense => _defense.clamp(0, 10);

  int get dodge => _dodge.clamp(-10, 10);

  int get accuracy => _accuracy.clamp(-10, 10);

  /// Combat stats for an [Actor].
  /// - [attack] is the actor's attack roll (1 - 20)
  /// - [defense] is the actor's damage absorption roll (0 - 10)
  /// - [accuracy] is the actor's hit bonus or penalty (-10 - 10)
  /// - [dodge] is the actor's hit avoidance bonus or penalty (-10 - 10)
  CombatStats({int? attack, int? accuracy, int? dodge, int? defense})
      : _attack = attack ?? 0,
        _defense = defense ?? 0,
        _dodge = dodge ?? 0,
        _accuracy = accuracy ?? 0;

  void modAttack(int amount) => _attack += amount;

  void modDefense(int amount) => _defense += amount;

  void modDodge(int amount) => _dodge += amount;

  void modAccuracy(int amount) => _accuracy += amount;
}
