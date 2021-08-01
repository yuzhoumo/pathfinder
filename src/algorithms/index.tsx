import dijkstra from './pathfinder/dijkstra';
import floodfill from './maze/floodfill';
import rand from './maze/random';
import division from './maze/division';
import dfs from './pathfinder/dfs';
import bfs from './pathfinder/bfs';
import bestfirst from './pathfinder/bestfirst';
import { PathfindingAlgorithm } from '../types/VisualizerTypes';

export const Pathfinders: { [key: string]: PathfindingAlgorithm } = {
  bestfirst,
  bfs,
  dijkstra,
  dfs,
};

export const Mazes = {
  division,
  rand,
  floodfill,
};
