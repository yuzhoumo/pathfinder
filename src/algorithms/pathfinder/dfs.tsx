/* eslint-disable no-param-reassign */
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';
import { getPath, getUnvisitedNeighbors } from '../../utils/algorithmUtils';

export default function dfs(grid: Grid): [Node[], Node[]] {
  const stack: Node[] = [grid.source];
  const visited: Node[] = [];

  while (stack.length > 0) {
    const curr = stack.pop();
    if (curr) {
      visited.push(curr);
      if (curr === grid.target) break;

      curr.type = SquareType.Visited;
      const neighbors = getUnvisitedNeighbors(curr, grid.nodes);
      for (let i = 0; i < neighbors.length; i += 1) {
        if (neighbors[i].type !== SquareType.Wall) stack.push(neighbors[i]);
        neighbors[i].prev = curr;
      }
    }
  }

  return [visited.slice(1, -1), getPath(grid.target).slice(1, -1)];
}
