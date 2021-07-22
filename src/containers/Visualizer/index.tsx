import React, { useEffect, useState } from 'react';
import Board from '../../components/Board';
import { SquareType } from '../../types/SquareTypes';
import { Grid, Node } from '../../types/VisualizerTypes';
import { setSquareType } from '../../utils/squareUtils';
import {
  initializeDisplay,
  initializeGrid,
  updateDisplay,
} from '../../utils/visualizerUtils';
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

  const renderDisplay = (): void => {
    for (let c = 0; c < display[0].length; c += 1) {
      for (let r = 0; r < display.length; r += 1) {
        setSquareType(r, c, display[r][c]);
      }
    }
  };

  const clearDisplay = (): void => {
    setDisplay(initializeDisplay(rows, cols));
    renderDisplay();
  };

  const clearAnimation = (): void => {
    for (let c = 0; c < display[0].length; c += 1) {
      for (let r = 0; r < display.length; r += 1) {
        if (
          display[r][c] !== SquareType.Source &&
          display[r][c] !== SquareType.Target &&
          display[r][c] !== SquareType.Wall
        ) {
          display[r][c] = SquareType.Empty;
        }
      }
    }
    renderDisplay();
  };

  const animatePath = (nodes: Node[], timeout: number): void => {
    for (let i = 1; i < nodes.length - 1; i += 1) {
      const n = nodes[i];

      setTimeout(() => {
        setSquareType(n.row, n.col, SquareType.Path);
      }, timeout * i);
    }
  };

  const animateVisited = (
    visited: Node[],
    path: Node[],
    timeout: number
  ): void => {
    for (let i = 1; i < visited.length - 1; i += 1) {
      const n = visited[i];
      setTimeout(() => {
        setSquareType(n.row, n.col, SquareType.Visited);
      }, timeout * i);

      setDisplay(updateDisplay(display, n.row, n.col, SquareType.Visited));
    }

    setTimeout(() => {
      animatePath(path, timeout * 3);
    }, timeout * (visited.length - 1));
  };

  const visualize = (): void => {
    const grid: Grid = initializeGrid(display);
    const visited: Node[] = dijkstra(grid);
    const path: Node[] = getNodesInShortestPathOrder(grid.target);

    animateVisited(visited, path, 5);
  };

  // useEffect(() => {
  //   renderDisplay();
  // }, [display]);

  return (
    <>
      <button type="button" onClick={() => visualize()}>
        Visualize
      </button>
      <button type="button" onClick={() => clearAnimation()}>
        Clear Animation
      </button>
      <button type="button" onClick={() => clearDisplay()}>
        Clear Board
      </button>
      <Board display={display} setDisplay={setDisplay} />
    </>
  );
}
