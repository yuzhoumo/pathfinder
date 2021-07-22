import React, { useState } from 'react';
import { message } from 'antd';
import Board from '../../components/Board';
import Controls from '../../components/Controls';
import { SquareType } from '../../types/SquareTypes';
import { setSquareType } from '../../utils/squareUtils';
import {
  initializeDisplay,
  initializeGrid,
  updateDisplay,
  visualize,
} from '../../utils/visualizerUtils';
import { Algorithm } from '../../types/VisualizerTypes';
import config from '../../utils/config';

export default function Visualizer({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}): JSX.Element {
  const [display, setDisplay] = useState(initializeDisplay(rows, cols));

  /* Force updates the board CSS with internally tracked data */
  const renderDisplay = (): void => {
    for (let c = 0; c < display[0].length; c += 1) {
      for (let r = 0; r < display.length; r += 1) {
        setSquareType(r, c, display[r][c]);
      }
    }
  };

  /* Reset display and board CSS to default state */
  const clearDisplay = (): void => {
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (c === config.source.col && r === config.source.row) {
          setDisplay(updateDisplay(display, r, c, SquareType.Source));
        } else if (c === config.target.col && r === config.target.row) {
          setDisplay(updateDisplay(display, r, c, SquareType.Target));
        } else {
          setDisplay(updateDisplay(display, r, c, SquareType.Empty));
        }
      }
    }
    renderDisplay();
  };

  /* Clears path and visited nodes */
  const clearVisualization = (): void => {
    for (let c = 0; c < display[0].length; c += 1) {
      for (let r = 0; r < display.length; r += 1) {
        if (
          display[r][c] !== SquareType.Source &&
          display[r][c] !== SquareType.Target &&
          display[r][c] !== SquareType.Wall
        ) {
          setDisplay(updateDisplay(display, r, c, SquareType.Empty));
        }
      }
    }
    renderDisplay();
  };

  /* Runs and animates a given pathfinding algorithm */
  const runAlgorithm = (algorithm: Algorithm): void => {
    clearVisualization();
    const [visited, path] = algorithm(initializeGrid(display));
    if (path.length === 0) {
      message.warning('The target is not reachable!');
      return;
    }
    visualize(visited, path);
  };

  return (
    <>
      <Controls
        runAlgorithm={runAlgorithm}
        clearBoard={clearDisplay}
        clearVisualization={clearVisualization}
      />
      <Board display={display} setDisplay={setDisplay} />
    </>
  );
}
