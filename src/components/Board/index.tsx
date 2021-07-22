/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import './Board.css';
import { SquareInfo, SquareType } from '../../types/SquareTypes';
import { Display, Setter } from '../../types/VisualizerTypes';
import { initializeSquares, setSquareType } from '../../utils/squareUtils';
import { updateDisplay } from '../../utils/visualizerUtils';

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

  /* Mouse handlers */
  const handleMouseDown = (row: number, col: number): void => {
    const type = display[row][col];

    setMousePressed(true);
    setSelectedSquare({ row, col, type });

    // Draw wall or empty nodes on click
    if (type === SquareType.Empty) {
      handleChange({ row, col, type: SquareType.Wall });
    } else if (type === SquareType.Wall) {
      handleChange({ row, col, type: SquareType.Empty });
    }
  };

  const handleMouseUp = (row: number, col: number): void => {
    if (!mousePressed) return;
    setMousePressed(false);
  };

  const handleMouseEnter = (row: number, col: number): void => {
    if (!mousePressed) return;
    const type = display[row][col];

    // Draw wall or empty nodes on drag
    if (type === SquareType.Empty && selectedSquare.type === SquareType.Empty) {
      handleChange({ row, col, type: SquareType.Wall });
    } else if (
      type === SquareType.Wall &&
      selectedSquare.type === SquareType.Wall
    ) {
      handleChange({ row, col, type: SquareType.Empty });
    }
  };

  const handleBoardLeave = (): void => {
    setMousePressed(false);
  };

  const squares = initializeSquares(
    rows,
    cols,
    handleMouseEnter,
    handleMouseDown,
    handleMouseUp
  );

  return (
    <div
      className="board"
      style={{ width: `${squares[0].length * 20}px` }}
      onMouseLeave={handleBoardLeave}
    >
      {squares.map((row, r) => {
        return <div key={`row-${r}`}>{row}</div>;
      })}
    </div>
  );
}
