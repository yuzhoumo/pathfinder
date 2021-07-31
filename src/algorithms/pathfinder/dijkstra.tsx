/* eslint-disable no-param-reassign */
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';
import {
  flattenNodes,
  getPath,
  getUnvisitedNeighbors,
  sortNodes,
} from '../../utils/algorithmUtils';

function updateNeighbors(curr: Node, nodes: Node[][]): void {
  const unvisitedNeighbors: Node[] = getUnvisitedNeighbors(curr, nodes);
  unvisitedNeighbors.forEach((neighbor) => {
    neighbor.dist = curr.dist + 1;
    neighbor.prev = curr;
  });
}

export default function dijkstra(grid: Grid): [Node[], Node[]] {
  const unvisited: Node[] = flattenNodes(grid.nodes);
  const visited: Node[] = [];

  grid.source.dist = 0;
  while (unvisited.length > 0) {
    sortNodes(unvisited);
    const closest: Node | undefined = unvisited.shift();

    if (closest && closest.type !== SquareType.Wall) {
      if (closest.dist === Infinity) return [visited, []];
      closest.type = SquareType.Visited;
      visited.push(closest);
      if (closest === grid.target) break;
      updateNeighbors(closest, grid.nodes);
    }
  }

  return [visited, getPath(grid.target)];
}
