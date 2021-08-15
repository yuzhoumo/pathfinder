import { Grid, Node } from '../../types/VisualizerTypes';

export default function binary(grid: Grid): Node[] {
  const walls: Node[] = [];

  const valid: (node: Node) => boolean = (node) =>
    node !== grid.source && node !== grid.target;

  for (let i = grid.nodes.length - 2; i > 0; i -= 1) {
    if (valid(grid.nodes[i][1])) walls.push(grid.nodes[i][1]);
  }

  for (let i = 1; i < grid.nodes.length; i += 2) {
    for (let j = 1; j < grid.nodes[0].length; j += 2) {
      if (i - 1 > 0 && Math.random() < 0.5) {
        if (valid(grid.nodes[i][j])) walls.push(grid.nodes[i][j]);
        if (valid(grid.nodes[i - 1][j])) walls.push(grid.nodes[i - 1][j]);
      } else if (j - 1 > 0) {
        if (valid(grid.nodes[i][j])) walls.push(grid.nodes[i][j]);
        if (valid(grid.nodes[i][j - 1])) walls.push(grid.nodes[i][j - 1]);
      }
    }
  }

  return walls;
}
