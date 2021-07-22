/* Enum used to denote square types and their corresponding CSS class names */
export enum SquareType {
  Empty = 'square',
  Source = 'square square-source',
  Target = 'square square-target',
  Wall = 'square square-wall',
  Visited = 'square square-visited',
  Path = 'square square-path',
}

/* Stores row, column, and type of a square */
export interface SquareInfo {
  row: number;
  col: number;
  type: SquareType;
}

/* Type alias for square mouse handler functions */
export type MouseHandler = (row: number, col: number) => void;
