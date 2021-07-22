import React from 'react';
import './Square.css';
import { MouseHandler, SquareType } from '../../types/SquareTypes';
import { getSquareId } from '../../utils/squareUtils';

export default function Square({
  row,
  col,
  type,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
}: {
  row: number;
  col: number;
  type: SquareType;
  onMouseEnter: MouseHandler;
  onMouseDown: MouseHandler;
  onMouseUp: MouseHandler;
}): JSX.Element {
  return (
    <div
      aria-label="grid-item"
      id={getSquareId(row, col)}
      role="button"
      tabIndex={0}
      className={type}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp(row, col)}
    />
  );
}
