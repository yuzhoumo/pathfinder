import { SquareType } from './SquareTypes';

export interface Node {
  type: SquareType;
  row: number;
  col: number;
  dist: number;
  prev: Node | null;
}

export interface Grid {
  nodes: Node[][];
  source: Node;
  target: Node;
}

export type Display = SquareType[][];
export type Setter = (display: any) => void;
