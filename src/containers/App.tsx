import React from 'react';
import Visualizer from './Visualizer';
import config from '../utils/config';

export default function App(): JSX.Element {
  return (
    <>
      <h1>Pathfinding Visualizer</h1>
      <Visualizer rows={config.boardHeight} cols={config.boardWidth} />
    </>
  );
}
