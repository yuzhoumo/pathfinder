import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Link } = Typography;

export interface Content {
  name: string;
  tags: string[];
  source: string;
  description: JSX.Element;
  pseudocode: string;
}

const astar: Content = {
  name: 'A* Search',
  tags: ['Weighted', 'Guarantees Shortest Path'],
  source: 'https://en.wikipedia.org/wiki/A*_search_algorithm',
  description: (
    <Paragraph>
      A* is a type of informed search algorithm that considers an additional
      cost heuristic such as shortest time or least distance travelled. It
      improves upon Dijkstra&apos;s algorithm by using additional information to
      reduce the number of visited nodes. In this implementation, the algorithm
      is aware of the target location and uses this information to additionally
      weight each square according to its{' '}
      <Link href="https://en.wikipedia.org/wiki/Taxicab_geometry">
        manhattan distance
      </Link>{' '}
      from the target. Thus, squares that are closer to the target are
      preferred.
    </Paragraph>
  ),
  pseudocode: `  1  function AStar(Graph, source):
  2      dist[source] ← 0                           // Initialization
  3
  4      create vertex priority queue Q
  5
  6      for each vertex v in Graph:
  7          if v ≠ source
  8              dist[v] ← INFINITY                 // Unknown distance from source to v
  9              prev[v] ← UNDEFINED                // Predecessor of v
  10             m_dist[v] ← manhattan(v, target)   // Heuristic function
  11
  12         Q.add_with_priority(v, dist[v] + m_dist[v])
  13
  14
  15     while Q is not empty:                      // The main loop
  16         u ← Q.extract_min()                    // Remove and return best vertex
  17         for each neighbor v of u:              // only v that are still in Q
  18             alt ← dist[u] + length(u, v)
  19             if alt < dist[v]
  20                 dist[v] ← alt
  21                 prev[v] ← u
  22                 Q.decrease_priority(v, alt + m_dist[v])
  23
  24     return dist, prev`,
};

const dijkstra: Content = {
  name: "Dijkstra's Algorithm",
  tags: ['Weighted', 'Guarantees Shortest Path'],
  source: 'https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm',
  description: (
    <Paragraph>
      Dijkstra&apos;s Algorithm finds the shortest paths between the starting
      node and each of the other nodes. Additionally, the algorithm accounts for
      the cost of moving through each square, favoring lower cost paths. We
      initially assign all nodes with a distance of infinity and the starting
      node with a distance of zero. As we explore nieghboring nodes, we
      continually update the true distances to each node, favoring shorter
      distances. This process continues until the target is reached.
    </Paragraph>
  ),
  pseudocode: `  1  function AStar(Graph, source):
  2      dist[source] ← 0                           // Initialization
  3
  4      create vertex priority queue Q
  5
  6      for each vertex v in Graph:
  7          if v ≠ source
  8              dist[v] ← INFINITY                 // Unknown distance from source to v
  9              prev[v] ← UNDEFINED                // Predecessor of v
  10
  11         Q.add_with_priority(v, dist[v])
  12
  13
  14     while Q is not empty:                      // The main loop
  15         u ← Q.extract_min()                    // Remove and return best vertex
  16         for each neighbor v of u:              // only v that are still in Q
  17             alt ← dist[u] + length(u, v)
  18             if alt < dist[v]
  19                 dist[v] ← alt
  20                 prev[v] ← u
  21                 Q.decrease_priority(v, alt)
  22
  23     return dist, prev`,
};

const bestfirst: Content = {
  name: 'Greedy Best-First Search',
  tags: ['Weighted', 'Does NOT Guarantee Shortest Path'],
  source: 'https://en.wikipedia.org/wiki/Best-first_search',
  description: (
    <Paragraph>
      Greedy best-first search is strategy that estimates the cost of visiting
      each node. Based on a heuristic function, the algorithm{' '}
      <Link href="https://en.wikipedia.org/wiki/Greedy_algorithm">
        greedily
      </Link>{' '}
      chooses the best adjacent squares until the target is reached. The
      heuristic function used in this visualizer is based on the{' '}
      <Link href="https://en.wikipedia.org/wiki/Taxicab_geometry">
        manhattan distance
      </Link>{' '}
      from each square to the target square. Depending on how good the heuristic
      is, the number of explored squares can be reduced significantly compared
      to other algorithms. However, the result is not guaranteed to be the most
      optimal path.
    </Paragraph>
  ),
  pseudocode: `   1  function GreedyBestFirst(Graph, source):
   2      create vertex queue Q
   3      Q.add_with_priority(source, heuristic[source])
   4
   5      while Q is not empty:
   6          u ← Q.extract_min()
   7          if u is the target:
   8              return u
   9          else:
  10             for each neighbor v of u:
  11                if v is not visited:
  12                      mark v as visited
  13                      Q.add_with_priority(v, heuristic[v])
  14          mark u as visited`,
};

const bfs: Content = {
  name: 'Breadth-first Search',
  tags: ['Unweighted', 'Guarantees Shortest Path'],
  source: 'https://en.wikipedia.org/wiki/Breadth-first_search',
  description: (
    <Paragraph>
      Breadth-first search (BFS) explores equally in all directions from the
      starting node. It guarantees the shortest path if each node is weighted
      equally. In cases where all nodes are equally weighted, BFS is equivalent
      to Dijkstra&apos;s but runs faster as it does not need to sort by smallest
      weights.
    </Paragraph>
  ),
  pseudocode: `  1  function BFS(Graph, source):
  2      let Q be a queue
  3      mark source as visited
  4      Q.enqueue(source)
  5      while Q is not empty:
  6          v ← Q.dequeue()
  7          if v is the target:
  8              return v
  9          for w in G.adjacentEdges(v):
 10              if w is not visited:
 11                  mark w as visited
 12                  Q.enqueue(w)`,
};

const dfs: Content = {
  name: 'Depth-first Search',
  tags: ['Unweighted', 'Does NOT Guarantee Shortest Path'],
  source: 'https://en.wikipedia.org/wiki/Depth-first_search',
  description: (
    <Paragraph>
      Depth-first search proceeds as far as it can in one direction and then
      recursively backtracks. This algorithm typically yields poor results for
      pathfinding since it neither considers node weights nor guarantees the
      shortest path. However, it is far more useful in other applications.
    </Paragraph>
  ),
  pseudocode: ` 1  function DFS(Graph, source):
 2      let S be a stack
 3      S.push(source)
 4      while S is not empty:
 5          v ← S.pop()
 6          if v is not visited:
 7              if v is the target:
 8                  return v
 9              mark node v as visited
10              for w in Graph.adjacentEdges(v):
11                  S.push(w)`,
};

const descriptions: { [key: string]: Content } = {
  astar,
  bestfirst,
  bfs,
  dijkstra,
  dfs,
};

export default descriptions;
