import { SquareType } from '../types/SquareTypes';

/*
 * Default settings for the application
 *
 * boardWidth: Number of squares in each board row
 * boardHeight: Number of squares in each board column
 * source: SquareInfo object for the default source square
 * target: SquareInfo object for the default target square
 */
export default {
  boardWidth: 50,
  boardHeight: 21,
  source: {
    row: 10,
    col: 10,
    type: SquareType.Source,
  },
  target: {
    row: 10,
    col: 39,
    type: SquareType.Target,
  },
};
