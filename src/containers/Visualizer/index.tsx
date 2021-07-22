import React, { useState } from 'react';
import Board from '../../components/Board';
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';
import { setSquareType } from '../../utils/squareUtils';
import {
  initializeDisplay,
  initializeGrid,
  updateDisplay,
  visualize,
} from '../../utils/visualizerUtils';
import config from '../../utils/config';
import {
  getNodesInShortestPathOrder,
  dijkstra,
} from '../../algorithms/djikstra';

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

  const animateDijkstra = (): void => {
    clearVisualization();
    const grid: Grid = initializeGrid(display);
    const visited: Node[] = dijkstra(grid);
    const path: Node[] = getNodesInShortestPathOrder(grid.target);
    visualize(visited, path);
  };

  return (
    <>
      <button type="button" onClick={() => animateDijkstra()}>
        Visualize
      </button>
      <button type="button" onClick={() => clearVisualization()}>
        Clear Visualization
      </button>
      <button type="button" onClick={() => clearDisplay()}>
        Clear Board
      </button>
      <Board display={display} setDisplay={setDisplay} />
    </>
  );
}
