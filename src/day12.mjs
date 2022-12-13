/*
 * ## --- Day 12: Hill Climbing Algorithm ---
 *
 * You try contacting the Elves using your handheld device, but the river you're
 * following must be too low to get a decent signal.
 *
 * You ask the device for a heightmap of the surrounding area (your puzzle
 * input). The heightmap shows the local area from above broken into a grid; the
 * elevation of each square of the grid is given by a single lowercase letter,
 * where `a` is the lowest elevation, `b` is the next-lowest, and so on up to
 * the highest elevation, `z`.
 *
 * Also included on the heightmap are marks for your current position (`S`) and
 * the location that should get the best signal (`E`). Your current position
 * (`S`) has elevation `a`, and the location that should get the best signal
 * (`E`) has elevation `z`.
 *
 * You'd like to reach `E`, but to save energy, you should do it in as few steps
 * as possible. During each step, you can move exactly one square up, down,
 * left, or right. To avoid needing to get out your climbing gear, the elevation
 * of the destination square can be at most one higher than the elevation of
 * your current square; that is, if your current elevation is `m`, you could
 * step to elevation `n`, but not to elevation `o`. (This also means that the
 * elevation of the destination square can be much lower than the elevation of
 * your current square.)
 *
 * For example:
 *
 *     Sabqponm;
 *     abcryxxl;
 *     accszExk;
 *     acctuvwj;
 *     abdefghi;
 *
 * Here, you start in the top-left corner; your goal is near the middle. You
 * could start by moving down or right, but eventually you'll need to head
 * toward the `e` at the bottom. From there, you can spiral around to the goal:
 *
 *     v..v<<<<
 *     >v.vv<<^
 *     .>vv>E^^
 *     ..v>>>^^
 *     ..>>>>>^
 *
 * In the above diagram, the symbols indicate whether the path exits each square
 * moving up (`^`), down (`v`), left (`<`), or right (`>`). The location that
 * should get the best signal is still `E`, and `.` marks unvisited squares.
 *
 * This path reaches the goal in `31` steps, the fewest possible.
 *
 * What is the fewest steps required to move from your current position to the
 * location that should get the best signal?
 */

/*
 * ## --- Part Two ---
 *
 * As you walk up the hill, you suspect that the Elves will want to turn this
 * into a hiking trail. The beginning isn't very scenic, though; perhaps you can
 * find a better starting point.
 *
 * To maximize exercise while hiking, the trail should start as low as possible:
 * elevation `a`. The goal is still the square marked `E`. However, the trail
 * should still be direct, taking the fewest steps to reach its goal. So, you'll
 * need to find the shortest path from any square at elevation `a` to the square
 * marked `E`.
 *
 * Again consider the example from above:
 *
 *     Sabqponm;
 *     abcryxxl;
 *     accszExk;
 *     acctuvwj;
 *     abdefghi;
 *
 * Now, there are six choices for starting position (five marked `a`, plus the
 * square marked `S` that counts as being at elevation `a`). If you start at the
 * bottom-left square, you can reach the goal most quickly:
 *
 *     ...v<<<<
 *     ...vv<<^
 *     ...v>E^^
 *     .>v>>>^^
 *     >^>>>>>^
 *
 * This path reaches the goal in only `29` steps, the fewest possible.
 *
 * ## What is the fewest steps required to move starting from any square with elevation `a` to the location that should get the best signal?--- Part Two ---
 *
 * As you walk up the hill, you suspect that the Elves will want to turn this
 * into a hiking trail. The beginning isn't very scenic, though; perhaps you can
 * find a better starting point.
 *
 * To maximize exercise while hiking, the trail should start as low as possible:
 * elevation `a`. The goal is still the square marked `E`. However, the trail
 * should still be direct, taking the fewest steps to reach its goal. So, you'll
 * need to find the shortest path from any square at elevation `a` to the square
 * marked `E`.
 *
 * Again consider the example from above:
 *
 *     Sabqponm;
 *     abcryxxl;
 *     accszExk;
 *     acctuvwj;
 *     abdefghi;
 *
 * Now, there are six choices for starting position (five marked `a`, plus the
 * square marked `S` that counts as being at elevation `a`). If you start at the
 * bottom-left square, you can reach the goal most quickly:
 *
 *     ...v<<<<
 *     ...vv<<^
 *     ...v>E^^
 *     .>v>>>^^
 *     >^>>>>>^
 *
 * This path reaches the goal in only `29` steps, the fewest possible.
 *
 * ## What is the fewest steps required to move starting from any square with elevation `a` to the location that should get the best signal?--- Part Two ---
 *
 * As you walk up the hill, you suspect that the Elves will want to turn this
 * into a hiking trail. The beginning isn't very scenic, though; perhaps you can
 * find a better starting point.
 *
 * To maximize exercise while hiking, the trail should start as low as possible:
 * elevation `a`. The goal is still the square marked `E`. However, the trail
 * should still be direct, taking the fewest steps to reach its goal. So, you'll
 * need to find the shortest path from any square at elevation `a` to the square
 * marked `E`.
 *
 * Again consider the example from above:
 *
 *     Sabqponm;
 *     abcryxxl;
 *     accszExk;
 *     acctuvwj;
 *     abdefghi;
 *
 * Now, there are six choices for starting position (five marked `a`, plus the
 * square marked `S` that counts as being at elevation `a`). If you start at the
 * bottom-left square, you can reach the goal most quickly:
 *
 *     ...v<<<<
 *     ...vv<<^
 *     ...v>E^^
 *     .>v>>>^^
 *     >^>>>>>^
 *
 * This path reaches the goal in only `29` steps, the fewest possible.
 *
 * What is the fewest steps required to move starting from any square with
 * elevation `a` to the location that should get the best signal?
 */

/** @param {string} input */
export function day12(input, startingElevation = 0) {
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  const elevations = input.split("\n").map((line, y) =>
    line.split("").map((c, x) => {
      switch (c) {
        case "S":
          startX = x;
          startY = y;
          return 0;
        case "E":
          endX = x;
          endY = y;
          return 25;
        default:
          return c.charCodeAt(0) - "a".charCodeAt(0);
      }
    })
  );
  const boundY = elevations.length;
  const boundX = elevations[0].length;
  const bestSteps = new Array(boundY)
    .fill(0)
    .map(() => new Array(boundX).fill(Infinity));
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} [steps]
   * @param {number} [fromElevation]
   */
  function traverse(x, y, steps = 0, fromElevation = elevations[y][x]) {
    if (
      x < 0 ||
      y < 0 ||
      x >= boundX ||
      y >= boundY ||
      bestSteps[y][x] <= steps
    ) {
      return;
    }
    const elevation = elevations[y][x];
    if (elevation > fromElevation + 1) {
      return;
    }
    bestSteps[y][x] = steps;
    traverse(x + 1, y, steps + 1, elevation);
    traverse(x, y + 1, steps + 1, elevation);
    traverse(x - 1, y, steps + 1, elevation);
    traverse(x, y - 1, steps + 1, elevation);
  }
  if (startingElevation !== -1) {
    for (let y = 0; y < boundY; y++) {
      for (let x = 0; x < boundX; x++) {
        if (elevations[y][x] <= startingElevation) {
          traverse(x, y);
        }
      }
    }
  } else {
    traverse(startX, startY);
  }
  return bestSteps[endY][endX];
}
