import { SquareType } from '../types/SquareTypes';
import { Grid, Node } from '../types/VisualizerTypes';
import { setSquareType } from './squareUtils';
import config from './config';

/**
 * Initialize Display used to internally track SquareTypes on the board.
 * All cells in the Display matrix are initialized to SquareType.Empty with the
 * exception of the default source and target locations from the config.
 *
 * @param {number} rows - Number of rows in display matrix
 * @param {number} cols - Number of columns in display matrix
 * @return {Display} A 2D array of SquareTypes
 */
export function initializeDisplay(rows: number, cols: number): SquareType[][] {
  const display: SquareType[][] = [];
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

/**
 * Initialize a Grid object based on a Display object. Grid objects are used
 * internally by algorithms to compute paths from the source node to target
 * node. The Grid object contains the source Node, target Node, and a 2D Node
 * matrix used to perform computations. All Node distances are initialized to
 * Infinity.
 *
 * @param {Display} display - Number of rows in display matrix
 * @return {Grid} A 2D array of SquareTypes
 */
export function initializeGrid(display: SquareType[][]): Grid {
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

/**
 * Make a copy of the display and set the given row/col location to the given
 * type. Return this copy. This is done to avoid in-place mutations when setting
 * react state variables for Display.
 *
 * @param {Display} display - Old display
 * @param {number} row - Row index of display location
 * @param {number} col - Column index of display location
 * @param {SquareType} type - New type to set at given display location
 * @return {Display} Copy of display with location set to new value
 */
export function updateDisplay(
  display: SquareType[][],
  row: number,
  col: number,
  type: SquareType
): SquareType[][] {
  const copy = [...display];
  copy[row][col] = type;
  return copy;
}

/**
 * Set the classes of the squares on the board to `type` based on the locations
 * given in the `nodes` list. Sets a timeout each time to animate the process.
 *
 * @param {Node[]} nodes - List of nodes
 * @param {SquareType} type - New type to set at given square location
 * @param {number} timeout - Time to wait between setting each square
 */
export function setNodes(
  nodes: Node[],
  type: SquareType,
  timeout: number
): void {
  if (timeout === 0) {
    nodes.slice(1, -1).map((n) => setSquareType(n.row, n.col, type));
    return;
  }

  for (let i = 1; i < nodes.length - 1; i += 1) {
    const n = nodes[i];
    setTimeout(() => {
      setSquareType(n.row, n.col, type);
    }, timeout * i);
  }
}

/**
 * First animate the visited nodes, then animate the chosen path. Calls
 * animateNodes twice and sets a timeout on the second call to wait for the
 * first animation to finish.
 *
 * @param {Node[]} visited - List of visited nodes in order of visit
 * @param {Node[]} path - List of nodes on the chosen path in order of visit
 * @param {SquareType} type - New type to set at given square location
 * @param {number} timeout - Time to wait between setting each square
 */
export function visualize(
  visited: Node[],
  path: Node[],
  timeout: number
): void {
  if (timeout === 0) {
    setNodes(visited, SquareType.Visited, 0);
    setNodes(path, SquareType.Path, 0);
    return;
  }

  setNodes(visited, SquareType.Visited, timeout);

  /* Wait for first animation to finish */
  setTimeout(() => {
    setNodes(path, SquareType.Path, 4 * timeout);
  }, timeout * visited.length + 10 * timeout);
}
