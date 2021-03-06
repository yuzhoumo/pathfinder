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
import Stats from '../../components/Stats';
import Description from '../../components/Description';

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
  const [selectedPathfinder, setPathfinder] = useState('None');
  const [visitedSquares, setVisitedSquares] = useState(0);
  const [pathLength, setPathLength] = useState(0);

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
    setPathLength(0);
    setVisitedSquares(0);
    setPathfinder('None');
  };

  /* Clears path and visited nodes */
  const clearVisualization = (): void => {
    renderDisplay();
    setVisualized(false);
    setPathfinder('None');
    setPathLength(0);
    setVisitedSquares(0);
  };

  /* Runs and animates a given pathfinding algorithm */
  const runPathfinder = (
    algorithm: PathfindingAlgorithm,
    timeout: number
  ): void => {
    if (algorithm === null) return;

    renderDisplay();
    const [visited, path] = algorithm(initializeGrid(display));

    setPathLength(path.length);
    setVisitedSquares(visited.length);

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
      <div
        style={{
          width: 1100,
          marginRight: 'auto',
          marginLeft: 'auto',
          float: 'none',
        }}
      >
        <ul
          style={{
            display: 'flex',
            listStyleType: 'none',
          }}
        >
          <li style={{ marginLeft: -42, width: 500 }}>
            <Legend />
          </li>
          <li style={{ marginLeft: 20, marginRight: -2, width: 600 }}>
            <Stats
              algorithm={selectedPathfinder}
              visitedSquares={visitedSquares}
              pathLength={pathLength}
            />
          </li>
        </ul>
      </div>
      {selectedPathfinder !== 'None' ? (
        <div
          style={{
            width: 1100,
            marginTop: 20,
            marginBottom: 50,
            marginRight: 'auto',
            marginLeft: 'auto',
            float: 'none',
          }}
        >
          <Description pathfinder={selectedPathfinder} />
        </div>
      ) : null}
    </>
  );
}
