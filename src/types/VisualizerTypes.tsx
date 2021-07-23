import { SquareType } from './SquareTypes';

/* Defines the function shape for pathfinding algorithms */
export type PathfindingAlgorithm = (
  grid: Grid
) => [visited: Node[], path: Node[]];

/* Defines the function shape for pattern generation algorithms */
export type PatternGenerationAlgorithm = (grid: Grid) => Node[];

/* Used internally by algorithms to perform computations */
export interface Node {
  type: SquareType;
  row: number;
  col: number;
  dist: number;
  prev: Node | null;
}

/* Passed as parameter into algorithms for internal computations */
export interface Grid {
  nodes: Node[][];
  source: Node;
  target: Node;
}
