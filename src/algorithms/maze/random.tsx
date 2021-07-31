/* eslint-disable no-param-reassign */
import { Grid, Node } from '../../types/VisualizerTypes';

export default function rand(grid: Grid): Node[] {
  const walls: Node[] = [];
  for (let i = 0; i < grid.nodes.length; i += 1) {
    for (let j = 0; j < grid.nodes[0].length; j += 1) {
      const node = grid.nodes[i][j];
      const notEndpoint = node !== grid.target && node !== grid.source;
      if (notEndpoint && Math.random() < 0.3) {
        walls.push(node);
      }
    }
  }
  return walls;
}
