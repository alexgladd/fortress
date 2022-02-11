# Fortress

[![pub.dev package](https://img.shields.io/pub/v/fortress.svg)](https://pub.dev/packages/fortress)

> Fortress is a package of game development utilities for Dart and Flutter apps. It includes
> renderers, an extensible game loop, basic UI elements, map generators and more!

<p align="center" width="100%">
  <img width="50%" alt="Fortress logo" src="https://alexgladd.github.io/fortress/fortress.png">
</p>

Fortress is specifically for retro-style, grid-based games like roguelikes and Dwarf Fortress
clones, but could work for anything tile-based with retro/ASCII pixel graphics. At the moment
Fortress is focused on web-based games.

To see a demo of Fortress in action, visit https://alexgladd.github.io/fortress/.

## Usage

Fortress is under active development and many of the public APIs will be in flux until the 1.0
version. For some example usage, see [example/example.md](example/example.md).

This repository also includes the code that powers the Fortress
[demos](https://alexgladd.github.io/fortress/). You can find it in [web/main.dart](web/main.dart)
and [web/demo](web/demo/).

You can find the latest API documentation [here](https://pub.dev/documentation/fortress/latest/).

## Acknowledgements

Fortress was heavily influcenced by the the work of [Bob Nystrom](https://journal.stuffwithstuff.com/),
both his [writing](https://gameprogrammingpatterns.com/) and his
[code](https://github.com/munificent). Indeed, many parts of Fortress are reimplementations
of his work on [piecemeal](https://github.com/munificent/piecemeal),
[malison](https://github.com/munificent/malison), and his own roguelike
[Hauberk](https://github.com/munificent/hauberk) with my own modifications and enhancements. This
was my opportunity to learn more about Dart while exploring more of my gamedev hobby.
