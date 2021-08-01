/* eslint-disable no-param-reassign */
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';
import {
  flattenNodes,
  getPath,
  getUnvisitedNeighbors,
} from '../../utils/algorithmUtils';

function manhattanDist(node: Node, grid: Grid): number {
  return (
    Math.abs(node.row - grid.target.row) + Math.abs(node.col - grid.target.col)
  );
}

function updateNeighbors(curr: Node, grid: Grid): void {
  const unvisitedNeighbors: Node[] = getUnvisitedNeighbors(curr, grid.nodes);
  unvisitedNeighbors.forEach((neighbor) => {
    neighbor.dist = curr.dist + 1;
    neighbor.prev = curr;
  });
}

export default function bestfirst(grid: Grid): [Node[], Node[]] {
  const sortNodes = (nodes: Node[]): void => {
    nodes.sort((a, b) => {
      return (
        a.dist +
        2 * manhattanDist(a, grid) -
        (b.dist + 2 * manhattanDist(b, grid))
      ); // reinforce manhattan dist heuristic by 2x
    });
  };

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
      updateNeighbors(closest, grid);
    }
  }

  return [visited.slice(1, -1), getPath(grid.target).slice(1, -1)];
}
