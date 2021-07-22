import { SquareType } from './SquareTypes';

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

/* Type alias for SquareType 2D array */
export type Display = SquareType[][];

/* Type alias for set state functions */
export type Setter = (data: any) => void;
