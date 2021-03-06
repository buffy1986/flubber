import { supertape } from "./utils.js";
import * as shapes from "./shapes.js";
import { addPoints, bisect } from "../src/add.js";

let tape = supertape();

tape("Add points", function(test) {
  let added = shapes.square1();

  addPoints(added, 4);

  test.inDelta(added, [
    [0, 0],
    [50, 0],
    [100, 0],
    [100, 50],
    [100, 100],
    [50, 100],
    [0, 100],
    [0, 50]
  ]);

  added = shapes.square1();
  addPoints(added, 3);

  test.inDelta(added, [
    [0, 0],
    [100 * 2 / 3, 0],
    [100, 0],
    [100, 100],
    [100, 100],
    [0, 100],
    [0, 100 * 2 / 3]
  ]);

  test.end();
});

tape("Bisect segments", function(test) {
  let added = shapes.square1(),
    rect = shapes.rect(),
    once = [[0, 0], [50, 0], [100, 0], [100, 50], [100, 100], [50, 100], [0, 100], [0, 50]],
    twice = [
      [0, 0],
      [25, 0],
      [50, 0],
      [75, 0],
      [100, 0],
      [100, 25],
      [100, 50],
      [100, 75],
      [100, 100],
      [75, 100],
      [50, 100],
      [25, 100],
      [0, 100],
      [0, 75],
      [0, 50],
      [0, 25]
    ];

  bisect(added, 150);

  test.deepEqual(added, shapes.square1());

  bisect(added, 75);

  test.deepEqual(added, once);

  bisect(added, 50);

  test.deepEqual(added, once);

  bisect(added, 49);

  test.deepEqual(added, twice);

  bisect(added, 25);

  test.deepEqual(added, twice);

  bisect(rect, 30);

  test.deepEqual(rect, [
    [0, 0],
    [1, 0],
    [1, 25],
    [1, 50],
    [1, 75],
    [1, 100],
    [0, 100],
    [0, 75],
    [0, 50],
    [0, 25]
  ]);

  test.end();
});
