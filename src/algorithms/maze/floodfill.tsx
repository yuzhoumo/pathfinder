/* eslint-disable no-param-reassign */
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';

function isAdjacent(node: Node, r: number, c: number): boolean {
  return c === node.col || r === node.row;
}

function notSelf(node: Node, r: number, c: number): boolean {
  return node.col !== c || node.row !== r;
}

function inBounds(nodes: Node[][], r: number, c: number): boolean {
  return r >= 0 && c >= 0 && r < nodes.length && c < nodes[0].length;
}

function isValid(nodes: Node[][], node: Node): boolean {
  let neighboringWalls = 0;
  for (let r = node.row - 1; r < node.row + 2; r += 1) {
    for (let c = node.col - 1; c < node.col + 2; c += 1) {
      if (
        inBounds(nodes, r, c) &&
        notSelf(node, r, c) &&
        nodes[r][c].type === SquareType.Visited
      ) {
        neighboringWalls += 1;
      }
    }
  }

  return (
    neighboringWalls < 3 &&
    nodes[node.row][node.col].type !== SquareType.Visited
  );
}

function getNeighbors(nodes: Node[][], node: Node): Node[] {
  const neighbors: Node[] = [];

  for (let r = node.row - 1; r < node.row + 2; r += 1) {
    for (let c = node.col - 1; c < node.col + 2; c += 1) {
      if (
        inBounds(nodes, r, c) &&
        notSelf(node, r, c) &&
        isAdjacent(node, r, c)
      ) {
        neighbors.push(nodes[r][c]);
      }
    }
  }

  return neighbors;
}

export default function dfs(grid: Grid): Node[] {
  const stack: Node[] = [grid.source];
  const empty: Node[] = [];

  while (stack.length > 0) {
    const next: Node | undefined = stack.pop();
    if (next && isValid(grid.nodes, next)) {
      if (next !== grid.target) empty.push(next);
      grid.nodes[next.row][next.col].type = SquareType.Visited;
      const neighbors = getNeighbors(grid.nodes, next);
      neighbors.sort(() => Math.random() - 0.5); // shuffle
      neighbors.forEach((n) => {
        stack.push(n);
      });
    }
  }

  return empty.slice(1);
}
