/* eslint-disable no-param-reassign */
import { SquareType } from '../types/SquareTypes';
import { Grid, Node } from '../types/VisualizerTypes';

function sortNodesByDistance(unvisitedNodes: Node[]): void {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
}

function getUnvisitedNeighbors(node: Node, nodes: Node[][]): Node[] {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(nodes[row - 1][col]);
  if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col]);
  if (col > 0) neighbors.push(nodes[row][col - 1]);
  if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1]);
  return neighbors.filter((neighbor) => neighbor.type !== SquareType.Visited);
}

function updateUnvisitedNeighbors(node: Node, nodes: Node[][]): void {
  const unvisitedNeighbors: Node[] = getUnvisitedNeighbors(node, nodes);
  unvisitedNeighbors.forEach((neighbor) => {
    neighbor.dist = node.dist + 1;
    neighbor.prev = node;
  });
}

function getNodes(nodes: Node[][]): Node[] {
  const flat: Node[] = [];
  for (let r = 0; r < nodes.length; r += 1) {
    for (let c = 0; c < nodes[0].length; c += 1) {
      flat.push(nodes[r][c]);
    }
  }
  return flat;
}

function getNodesInShortestPathOrder(target: Node): Node[] {
  const nodesInShortestPathOrder: Node[] = [];
  let currentNode: Node = target;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    if (currentNode.prev != null) {
      currentNode = currentNode.prev;
    } else {
      break;
    }
  }
  return nodesInShortestPathOrder;
}

export default function dijkstra(grid: Grid): [Node[], Node[]] {
  grid.source.dist = 0;
  const visitedNodesInOrder: Node[] = [];
  const unvisitedNodes: Node[] = getNodes(grid.nodes);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode: Node = unvisitedNodes[0];
    unvisitedNodes.shift();

    if (closestNode.type !== SquareType.Wall) {
      if (closestNode.dist === Infinity) return [visitedNodesInOrder, []];
      closestNode.type = SquareType.Visited;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === grid.target) break;
      updateUnvisitedNeighbors(closestNode, grid.nodes);
    }
  }

  return [visitedNodesInOrder, getNodesInShortestPathOrder(grid.target)];
}
