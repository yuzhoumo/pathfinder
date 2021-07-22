/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import './Board.css';
import { SquareInfo, SquareType } from '../../types/SquareTypes';
import { initializeSquares, setSquareType } from '../../utils/squareUtils';
import { Display, Setter } from '../../types/VisualizerTypes';
import { updateDisplay } from '../../utils/visualizerUtils';

/*
 * Displays a grid of Square components and handles mouse interactions. Takes in
 * a `display` variable and `setDisplay` function which are used to track board
 * state internally. Changes to the appearance of the squares are handled via
 * changes to each square's CSS class.
 */
export default function Board({
  display,
  setDisplay,
}: {
  display: Display;
  setDisplay: Setter;
}): JSX.Element {
  const [rows, cols] = [display.length, display[0].length];
  const [mousePressed, setMousePressed] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState({
    row: 0,
    col: 0,
    type: SquareType.Empty,
  });

  /* Update display and board appearance */
  const handleChange = (s: SquareInfo): void => {
    setSquareType(s.row, s.col, s.type);
    setDisplay(updateDisplay(display, s.row, s.col, s.type));
  };

  /* Gets called when mouse button is pressed in square at given location */
  const handleMouseDown = (row: number, col: number): void => {
    const type = display[row][col];

    setMousePressed(true);
    setSelectedSquare({ row, col, type });

    /* Draw wall or empty nodes on click */
    if (type === SquareType.Empty) {
      handleChange({ row, col, type: SquareType.Wall });
    } else if (type === SquareType.Wall) {
      handleChange({ row, col, type: SquareType.Empty });
    }
  };

  /* Gets called when mouse button is released in square at given location */
  const handleMouseUp = (row: number, col: number): void => {
    if (!mousePressed) return;
    setMousePressed(false);
  };

  /* Gets called when mouse cursor enters square at given location */
  const handleMouseEnter = (row: number, col: number): void => {
    if (!mousePressed) return;
    const type = display[row][col];

    /* Draw wall or empty nodes on drag */
    if (type === SquareType.Empty && selectedSquare.type === SquareType.Empty) {
      handleChange({ row, col, type: SquareType.Wall });
    } else if (
      type === SquareType.Wall &&
      selectedSquare.type === SquareType.Wall
    ) {
      handleChange({ row, col, type: SquareType.Empty });
    }
  };

  /* Gets called when the mouse cursor leaves the board */
  const handleBoardLeave = (): void => {
    setMousePressed(false);
  };

  /* Initializes board with empty squares and source/target */
  const squares = initializeSquares(
    rows,
    cols,
    handleMouseEnter,
    handleMouseDown,
    handleMouseUp
  );

  /* Number of squares in row times the square size (22px) */
  const width = squares[0].length * 22;

  return (
    <div className="board" style={{ width }} onMouseLeave={handleBoardLeave}>
      {squares.map((row, r) => {
        return <div key={`row-${r}`}>{row}</div>;
      })}
    </div>
  );
}
