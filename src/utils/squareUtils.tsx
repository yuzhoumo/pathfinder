import React from 'react';
import Square from '../components/Square';
import { MouseHandler, SquareType } from '../types/SquareTypes';
import config from './config';

/**
 * Get the id tag of a square given row and column index. Use this function to
 * set and get square IDs (to enforce consistent ID names). Generated ID useful
 * for div IDs and React key values.
 *
 * @param {number} row - Row index of square
 * @param {number} col - Column index of square
 * @return {string} Unique identifier for a given square
 */
export function getSquareId(row: number, col: number): string {
  return `square-${row}-${col}`;
}

/**
 * Set the appearance of a Square component by using getElementById to modify
 * its CSS class. Much faster than re-rendering React component. This function
 * sets CSS only and does not update internal Grid or Display state.
 *
 * @param {number} row - Row index of square
 * @param {number} col - Column index of square
 * @param {SquareType} type - New type value to set
 */
export function setSquareType(
  row: number,
  col: number,
  type: SquareType
): void {
  const squareId = getSquareId(row, col);
  const square = document.getElementById(squareId);
  if (square) square.className = type;
}

/**
 * Initialize a 2D array of Square components. SquareType is set to
 * SquareType.Empty for all squares except for the default source and target
 * squares as defined in the config.
 *
 * @param {number} rows - Number of rows on the board
 * @param {number} cols - Number of columns on the board
 * @param {MouseHandler} onMouseEnter - Callback for handling mouse enter
 * @param {MouseHandler} onMouseDown - Callback for handling mouse down
 * @param {MouseHandler} onMouseUp - Callback for handling mouse up
 * @return {JSX.Element[][]} Returns a 2D array of Square components
 */
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
