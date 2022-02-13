abstract class TupleBase {
  /// Get the tuple elements as an ordered [List]
  List<dynamic> get sequence;

  /// Get the tuple elements as an [Iterator]
  Iterator<dynamic> get iterator;

  const TupleBase();
}

/// Basic 2-length tuple (ordered pair)
class Tuple2<N, M> extends TupleBase {
  final N first;
  final M second;

  @override
  Iterator get iterator => sequence.iterator;

  @override
  List get sequence => [first, second];

  const Tuple2(this.first, this.second);
}

class Tuple4<I, J, K, L> extends TupleBase {
  final I first;
  final J second;
  final K third;
  final L fourth;

  @override
  Iterator get iterator => sequence.iterator;

  @override
  List get sequence => [first, second, third, fourth];

  const Tuple4(this.first, this.second, this.third, this.fourth);
}
