# Pathfinder

This is an interactive visualizer for various pathfinding and maze generation
algorithms. Click and drag to draw and delete walls, or generate them using one
of the maze generation algorithms. Run any of the pathfinding algorithms and set
the desired speed. Check it out here: https://pathfinder.joe-mo.com/

## Pathfinding Algorithms

- **Dijkstra's Algorithm**: Finds least-cost path based on distance
- **A\* Search**: Finds least-cost path based on manhattan distance from target in
  addition actual distance of the path so far
- **Breadth-first Search**: Searches equally in all directions until target is found
- **Depth-first Search**: Searches as far as it can down a path before backtracking
- **Greedy Best-first Search**: Greedily visits nodes based solely on Manhattan
  distance heuristic

## Maze Generation Algorithms

- **Flood Fill**: Carves out paths using recursive backtracking via DFS
- **Recursive Division**: Adds walls using randomized recursive division
- **Randomized Prim's Algorithm**: Carves out path based on randomized spanning tree
- **Binary Tree**: Carves out a path along a randomly generated binary tree
- **Basic Random Fill**: Fills 30% of the board with walls and guarantees a valid
  path exists using BFS
