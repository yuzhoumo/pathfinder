import dijkstra from './pathfinder/dijkstra';
import floodfill from './maze/floodfill';
import rand from './maze/random';
import division from './maze/division';
import prim from './maze/prim';
import dfs from './pathfinder/dfs';
import bfs from './pathfinder/bfs';
import bestfirst from './pathfinder/bestfirst';
import astar from './pathfinder/astar';
import { PathfindingAlgorithm } from '../types/VisualizerTypes';

export const Pathfinders: { [key: string]: PathfindingAlgorithm } = {
  astar,
  bestfirst,
  bfs,
  dijkstra,
  dfs,
};

export const PathfinderNames: { [key: string]: string } = {
  astar: 'A* Search',
  bestfirst: 'Best-first',
  bfs: 'Breadth-first',
  dijkstra: "Dijkstra's",
  dfs: 'Depth-first',
};

export const Mazes = {
  division,
  rand,
  floodfill,
  prim,
};
