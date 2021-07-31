import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import Board from '../../components/Board';
import Controls from '../../components/Controls';
import { SquareType } from '../../types/SquareTypes';
import { setSquareType } from '../../utils/squareUtils';
import {
  initializeDisplay,
  initializeGrid,
  setNodes,
  updateDisplay,
  visualize,
} from '../../utils/visualizerUtils';
import { Grid, Node, PathfindingAlgorithm } from '../../types/VisualizerTypes';
import { Pathfinders } from '../../algorithms';
import config from '../../utils/config';

export default function Visualizer({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}): JSX.Element {
  const [display, setDisplay] = useState(initializeDisplay(rows, cols));
  const [isVisualized, setVisualized] = useState(false);

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
    setVisualized(false);
  };

  /* Clears path and visited nodes */
  const clearVisualization = (): void => {
    renderDisplay();
    setVisualized(false);
  };

  /* Runs and animates a given pathfinding algorithm */
  const runAlgorithm = (
    algorithm: PathfindingAlgorithm,
    timeout: number
  ): void => {
    if (algorithm === null) return;

    clearVisualization();
    const [visited, path] = algorithm(initializeGrid(display));
    if (path.length > 0) {
      visualize(visited, path, timeout);
      setVisualized(true);
    } else {
      message.warning('The target is not reachable!');
    }
  };

  /* Generates and animates drawing of given maze */
  const generateMaze = (
    generator: (grid: Grid) => Node[],
    timeout: number
  ): void => {
    if (generator === null) return;

    clearDisplay();
    const walls = generator(initializeGrid(display));
    setNodes(walls, SquareType.Wall, timeout);
    walls.forEach((n) => {
      updateDisplay(display, n.row, n.col, SquareType.Wall);
    });
  };

  /* Runs on every display update */
  useEffect(() => {
    if (isVisualized) runAlgorithm(Pathfinders.dijkstra, 0);
  }, [display]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Controls
        runAlgorithm={runAlgorithm}
        generateMaze={generateMaze}
        clearBoard={clearDisplay}
        clearVisualization={clearVisualization}
      />
      <Board display={display} setDisplay={setDisplay} />
    </>
  );
}
