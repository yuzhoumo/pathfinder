/* eslint-disable no-param-reassign */
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';
import { getPath, getUnvisitedNeighbors } from '../../utils/algorithmUtils';

export default function bfs(grid: Grid): [Node[], Node[]] {
  grid.source.type = SquareType.Visited;
  const queue: Node[] = [grid.source];
  const visited: Node[] = [];

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr === grid.target) break;

    if (curr) {
      const neighbors = getUnvisitedNeighbors(curr, grid.nodes);

      for (let i = 0; i < neighbors.length; i += 1) {
        if (neighbors[i].type !== SquareType.Wall) {
          queue.push(neighbors[i]);
          if (neighbors[i] !== grid.target && neighbors[i] !== grid.source)
            visited.push(neighbors[i]);
          neighbors[i].type = SquareType.Visited;
          neighbors[i].prev = curr;
        }
      }
    }
  }

  return [visited, getPath(grid.target).slice(1, -1)];
}
