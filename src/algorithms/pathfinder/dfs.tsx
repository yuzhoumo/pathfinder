/* eslint-disable no-param-reassign */
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';
import { getUnvisitedNeighbors } from '../../utils/algorithmUtils';

export default function dfs(grid: Grid): [Node[], Node[]] {
  const stack: Node[] = [grid.source];
  const visited: Node[] = [];

  while (stack.length > 0) {
    const curr = stack.pop();
    if (curr) {
      visited.push(curr);
      // if (curr === grid.target) break;

      const neighbors = getUnvisitedNeighbors(curr, grid.nodes);
      const r = Math.floor(Math.random() * neighbors.length);

      for (let i = 0; i < neighbors.length; i += 1) {
        if (i !== r && neighbors[i].type !== SquareType.Wall)
          stack.push(neighbors[i]);

        neighbors[i].prev = curr;
        neighbors[i].type = SquareType.Visited;
      }

      if (neighbors.length > 0 && neighbors[r].type !== SquareType.Wall)
        stack.push(neighbors[r]);
    }
  }

  return [visited, [grid.target]];
}
