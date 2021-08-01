import dijkstra from './pathfinder/dijkstra';
import floodfill from './maze/floodfill';
import rand from './maze/random';
import division from './maze/division';
import dfs from './pathfinder/dfs';
import bfs from './pathfinder/bfs';
import bestfirst from './pathfinder/bestfirst';

export const Pathfinders = {
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
