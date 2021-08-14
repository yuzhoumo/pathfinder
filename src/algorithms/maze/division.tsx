/* eslint-disable no-param-reassign */
import { Grid, Node } from '../../types/VisualizerTypes';

enum Direction {
  HORIZONTAL = 0,
  VERTICAL,
}

function randInt(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor((Math.random() * (maxFloor - minCeil + 1)) / 2) * 2 + min;
}

function chooseDirection(width: number, height: number): Direction {
  if (width < height) return Direction.HORIZONTAL;
  if (height < width) return Direction.VERTICAL;
  return Math.random() < 0.5 ? Direction.HORIZONTAL : Direction.VERTICAL;
}

export default function division(grid: Grid): Node[] {
  const walls: Node[] = [];
  const divide = (
    r: number,
    c: number,
    w: number,
    h: number,
    d: Direction
  ): void => {
    if (w < 3 || h < 3) return;
    const horiz = d === Direction.HORIZONTAL;

    // Wall start coordinates (always odd)
    let wallCol = c + (horiz ? 0 : randInt(1, w - 2));
    let wallRow = r + (horiz ? randInt(1, h - 2) : 0);

    // Hole coordinates (always even)
    const length = horiz ? w : h;
    const holeCol = wallCol + (horiz ? randInt(0, w - 1) : 0);
    const holeRow = wallRow + (horiz ? 0 : randInt(0, h - 1));

    // Direction to be drawn in
    const dc = horiz ? 1 : 0;
    const dr = horiz ? 0 : 1;

    // Set walls
    for (let i = 0; i < length; i += 1) {
      const node = grid.nodes[wallRow][wallCol];
      const isSource = node === grid.source;
      const isTarget = node === grid.target;
      const isHole = holeCol === wallCol && holeRow === wallRow;
      if (!isSource && !isTarget && !isHole) {
        walls.push(node);
      }

      wallCol += dc;
      wallRow += dr;
    }

    // Determine subfield bounds and recurse
    let [nr, nc] = [r, c];
    let [nw, nh] = horiz ? [w, wallRow - r + 1] : [wallCol - c + 1, h];
    divide(nr, nc, nw, nh, chooseDirection(nw, nh));

    [nc, nr] = horiz ? [c, wallRow + 1] : [wallCol + 1, r];
    [nw, nh] = horiz ? [w, r + h - wallRow - 1] : [c + w - wallCol - 1, h];
    divide(nr, nc, nw, nh, chooseDirection(nw, nh));
  };

  const [width, height] = [grid.nodes[0].length, grid.nodes.length];
  divide(0, 0, width, height, chooseDirection(width, height));
  return walls;
}
