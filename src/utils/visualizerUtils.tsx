import { SquareType } from '../types/SquareTypes';
import { Display, Grid, Node } from '../types/VisualizerTypes';
import config from './config';

export function initializeDisplay(rows: number, cols: number): Display {
  const display: Display = [];
  for (let r = 0; r < rows; r += 1) {
    const row: SquareType[] = [];
    for (let c = 0; c < cols; c += 1) {
      if (c === config.source.col && r === config.source.row) {
        row.push(config.source.type);
      } else if (c === config.target.col && r === config.target.row) {
        row.push(config.target.type);
      } else {
        row.push(SquareType.Empty);
      }
    }
    display.push(row);
  }
  return display;
}

export function initializeGrid(display: Display): Grid {
  const nodes: Node[][] = [];
  const grid: Grid = {
    nodes,
    source: {
      type: SquareType.Empty,
      row: 0,
      col: 0,
      dist: Infinity,
      prev: null,
    },
    target: {
      type: SquareType.Empty,
      row: 0,
      col: 0,
      dist: Infinity,
      prev: null,
    },
  };

  for (let r = 0; r < display.length; r += 1) {
    const row: Node[] = [];
    for (let c = 0; c < display[0].length; c += 1) {
      const node: Node = {
        type: display[r][c],
        row: r,
        col: c,
        dist: Infinity,
        prev: null,
      };

      if (node.type === SquareType.Source) {
        grid.source = node;
      } else if (node.type === SquareType.Target) {
        grid.target = node;
      }

      row.push(node);
    }
    nodes.push(row);
  }

  return grid;
}

export function updateDisplay(
  display: Display,
  row: number,
  col: number,
  type: SquareType
): Display {
  const copy = [...display];
  copy[row][col] = type;
  return copy;
}
