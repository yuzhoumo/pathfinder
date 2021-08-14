import { Grid, Node } from '../../types/VisualizerTypes';
import { Pathfinders } from '..';
import { SquareType } from '../../types/SquareTypes';

function randNodes(grid: Grid): Node[] {
  const walls: Node[] = [];
  for (let i = 0; i < grid.nodes.length; i += 1) {
    for (let j = 0; j < grid.nodes[0].length; j += 1) {
      const node = grid.nodes[i][j];
      const notEndpoint = node !== grid.target && node !== grid.source;
      if (notEndpoint && Math.random() < 0.3) {
        node.type = SquareType.Wall;
        walls.push(node);
      }
    }
  }
  return walls;
}

export default function rand(grid: Grid): Node[] {
  let walls: Node[] = randNodes(grid);

  // Make sure there is always a valid path
  while (Pathfinders.bfs(grid)[1].length === 0) {
    grid.nodes.forEach((row) =>
      row.forEach((node) => {
        if (node !== grid.source && node !== grid.target) {
          // eslint-disable-next-line no-param-reassign
          node.type = SquareType.Empty;
        }
      })
    );
    walls = randNodes(grid);
  }

  return walls;
}
