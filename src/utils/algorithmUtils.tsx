import { Node } from '../types/VisualizerTypes';
import { SquareType } from '../types/SquareTypes';

export function flattenNodes(nodes: Node[][]): Node[] {
  const flat: Node[] = [];
  for (let r = 0; r < nodes.length; r += 1) {
    for (let c = 0; c < nodes[0].length; c += 1) {
      flat.push(nodes[r][c]);
    }
  }
  return flat;
}

export function sortNodes(nodes: Node[]): void {
  nodes.sort((a, b) => a.dist - b.dist);
}

export function getPath(target: Node): Node[] {
  const path: Node[] = [];
  let curr: Node | null = target;
  while (curr !== null) {
    path.unshift(curr);
    curr = curr.prev;
    console.log(curr);
  }
  return path;
}

export function getUnvisitedNeighbors(node: Node, nodes: Node[][]): Node[] {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(nodes[row - 1][col]);
  if (col > 0) neighbors.push(nodes[row][col - 1]);
  if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col]);
  if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1]);
  return neighbors.filter((neighbor) => neighbor.type !== SquareType.Visited);
}
