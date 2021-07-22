export enum SquareType {
  Empty = 'square',
  Source = 'square square-source',
  Target = 'square square-target',
  Wall = 'square square-wall',
  Visited = 'square square-visited',
  Path = 'square square-path',
}

export interface SquareInfo {
  row: number;
  col: number;
  type: SquareType;
}

export type MouseHandler = (row: number, col: number) => void;
