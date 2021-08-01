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
import Legend from '../../components/Legend';

export default function Visualizer({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}): JSX.Element {
  const [display, setDisplay] = useState(initializeDisplay(rows, cols));
  const [isVisualized, setVisualized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPathfinder, setPathfinder] = useState('');

  /* Force updates the board CSS with internally tracked data */
  const renderDisplay = (): void => {
    for (let c = 0; c < display[0].length; c += 1) {
      for (let r = 0; r < display.length; r += 1) {
        setSquareType(r, c, display[r][c]);
      }
    }
  };

  /* Reset display and board CSS to default state */
  const fillDisplay = (type: SquareType): void => {
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (c === config.source.col && r === config.source.row) {
          setDisplay(updateDisplay(display, r, c, SquareType.Source));
        } else if (c === config.target.col && r === config.target.row) {
          setDisplay(updateDisplay(display, r, c, SquareType.Target));
        } else {
          setDisplay(updateDisplay(display, r, c, type));
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
  const runPathfinder = (
    algorithm: PathfindingAlgorithm,
    timeout: number
  ): void => {
    if (algorithm === null) return;

    clearVisualization();
    const [visited, path] = algorithm(initializeGrid(display));
    if (path.length > 0) {
      visualize(visited, path, timeout, setLoading);
      setVisualized(true);
    } else {
      message.warning('The target is not reachable!');
    }
  };

  /* Generates and animates drawing of given maze */
  const generateMaze = (
    generator: (grid: Grid) => Node[],
    timeout: number,
    additive: boolean
  ): void => {
    if (generator === null) return;

    setLoading(true);

    if (additive) {
      fillDisplay(SquareType.Empty);
    } else {
      fillDisplay(SquareType.Wall);
    }

    const nodes = generator(initializeGrid(display));
    setTimeout(() => setLoading(false), timeout * nodes.length + 10 * timeout);
    setNodes(nodes, additive ? SquareType.Wall : SquareType.Empty, timeout);
    nodes.forEach((n) => {
      updateDisplay(
        display,
        n.row,
        n.col,
        additive ? SquareType.Wall : SquareType.Empty
      );
    });
  };

  /* Runs on every display update */
  useEffect(() => {
    if (isVisualized) {
      const pathfinder: PathfindingAlgorithm | undefined =
        Pathfinders[selectedPathfinder];
      if (pathfinder) runPathfinder(pathfinder, 0);
    }
  }, [display]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Controls
        runAlgorithm={runPathfinder}
        generateMaze={generateMaze}
        clearBoard={() => fillDisplay(SquareType.Empty)}
        clearVisualization={clearVisualization}
        setPathfinder={setPathfinder}
        loading={loading}
      />
      <Board display={display} setDisplay={setDisplay} loading={loading} />
      <Legend />
    </>
  );
}
