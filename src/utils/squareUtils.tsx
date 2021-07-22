import React from 'react';
import Square from '../components/Square';
import { MouseHandler, SquareType } from '../types/SquareTypes';
import config from './config';

export function getSquareId(row: number, col: number): string {
  return `square-${row}-${col}`;
}

export function setSquareType(
  row: number,
  col: number,
  type: SquareType
): boolean {
  const squareId = getSquareId(row, col);
  const square = document.getElementById(squareId);
  if (!square) return false;

  square.className = type;
  return true;
}

export function initializeSquares(
  rows: number,
  cols: number,
  onMouseEnter: MouseHandler,
  onMouseDown: MouseHandler,
  onMouseUp: MouseHandler
): JSX.Element[][] {
  const squares: JSX.Element[][] = [];
  for (let r = 0; r < rows; r += 1) {
    const row: JSX.Element[] = [];
    for (let c = 0; c < cols; c += 1) {
      let type = SquareType.Empty;
      if (c === config.source.col && r === config.source.row) {
        type = config.source.type;
      } else if (c === config.target.col && r === config.target.row) {
        type = config.target.type;
      }

      row.push(
        <Square
          key={getSquareId(r, c)}
          row={r}
          col={c}
          type={type}
          onMouseEnter={onMouseEnter}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      );
    }
    squares.push(row);
  }
  return squares;
}
