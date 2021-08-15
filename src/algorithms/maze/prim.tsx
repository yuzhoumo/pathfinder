/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';

function getNeighbors(node: Node, nodes: Node[][]): Node[] {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(nodes[row - 1][col]);
  if (col > 0) neighbors.push(nodes[row][col - 1]);
  if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col]);
  if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1]);
  return neighbors;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min));
}

export default function prim(grid: Grid): Node[] {
  const map = grid.nodes;
  const width = map.length;
  const height = map[0].length;
  const frontiers: number[][] = [];
  const paths: Node[] = [];

  let x = randInt(0, width);
  let y = randInt(0, height);
  frontiers.push([x, y, x, y]);

  while (frontiers.length > 0) {
    const r: number = randInt(0, frontiers.length);
    const f: number[] = frontiers[r];
    frontiers.splice(r, 1);

    [x, y] = [f[2], f[3]];
    if (map[x][y].type === SquareType.Wall) {
      map[f[0]][f[1]].type = SquareType.Empty;
      map[x][y].type = SquareType.Empty;

      if (map[f[0]][f[1]] !== grid.source && map[f[0]][f[1]] !== grid.target)
        paths.push(map[f[0]][f[1]]);

      if (map[x][y] !== grid.source && map[x][y] !== grid.target)
        paths.push(map[x][y]);

      if (x >= 2 && map[x - 2][y].type === SquareType.Wall)
        frontiers.push([x - 1, y, x - 2, y]);
      if (y >= 2 && map[x][y - 2].type === SquareType.Wall)
        frontiers.push([x, y - 1, x, y - 2]);
      if (x < width - 2 && map[x + 2][y].type === SquareType.Wall)
        frontiers.push([x + 1, y, x + 2, y]);
      if (y < height - 2 && map[x][y + 2].type === SquareType.Wall)
        frontiers.push([x, y + 1, x, y + 2]);
    }
  }

  // Fix edge case where source and target nodes are blocked
  let count = 0;
  getNeighbors(grid.source, map).forEach((n) => {
    count += n.type === SquareType.Wall ? 1 : 0;
  });
  if (count === 4) paths.push(map[grid.source.row + 1][grid.source.col]);
  count = 0;
  getNeighbors(grid.target, map).forEach((n) => {
    count += n.type === SquareType.Wall ? 1 : 0;
  });
  if (count === 4) paths.push(map[grid.target.row + 1][grid.target.col]);

  return paths;
}
