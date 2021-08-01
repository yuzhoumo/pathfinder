import React from 'react';
import { PageHeader, Button, Menu, Dropdown } from 'antd';
import {
  DownOutlined,
  BranchesOutlined,
  BuildOutlined,
} from '@ant-design/icons';
import { Mazes, Pathfinders } from '../../algorithms';
import { PathfindingAlgorithm, Node, Grid } from '../../types/VisualizerTypes';

export default function Controls({
  runAlgorithm,
  generateMaze,
  clearBoard,
  clearVisualization,
  loading,
}: {
  runAlgorithm: (algorithm: PathfindingAlgorithm, timeout: number) => void;
  generateMaze: (
    nodes: (grid: Grid) => Node[],
    timeout: number,
    additive: boolean
  ) => void;
  clearBoard: () => void;
  clearVisualization: () => void;
  loading: boolean;
}): JSX.Element {
  const algorithmMenu = (
    <Menu>
      <Menu.Item
        key="astar"
        onClick={() => runAlgorithm(Pathfinders.astar, 6)}
        icon={<BranchesOutlined />}
      >
        A* Search
      </Menu.Item>
      <Menu.Item
        key="dijkstra"
        onClick={() => runAlgorithm(Pathfinders.dijkstra, 6)}
        icon={<BranchesOutlined />}
      >
        Dijkstra&apos;s Algorithm
      </Menu.Item>
      <Menu.Item
        key="bfs"
        onClick={() => runAlgorithm(Pathfinders.bfs, 6)}
        icon={<BranchesOutlined />}
      >
        Breadth-first Search
      </Menu.Item>
      <Menu.Item
        key="dfs"
        onClick={() => runAlgorithm(Pathfinders.dfs, 6)}
        icon={<BranchesOutlined />}
      >
        Depth-first Search
      </Menu.Item>
    </Menu>
  );

  const patternMenu = (
    <Menu>
      <Menu.Item
        key="flood-fill"
        onClick={() => generateMaze(Mazes.floodfill, 6, false)}
        icon={<BuildOutlined />}
      >
        Flood Fill (DFS)
      </Menu.Item>
      <Menu.Item
        key="random-fill"
        onClick={() => generateMaze(Mazes.rand, 6, true)}
        icon={<BuildOutlined />}
      >
        Random Fill
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost
        title="Pathfinder"
        subTitle="An interactive visualizer for various pathfinding algorithms"
        extra={[
          <Dropdown
            key="visualize"
            placement="bottomCenter"
            overlay={algorithmMenu}
          >
            <Button type="primary" loading={loading}>
              Visualize
              <DownOutlined />
            </Button>
          </Dropdown>,
          <Dropdown
            key="generate-pattern"
            placement="bottomCenter"
            overlay={patternMenu}
          >
            <Button loading={loading}>
              Generate Pattern <DownOutlined />
            </Button>
          </Dropdown>,
          <Button
            key="clear-visualization"
            onClick={clearVisualization}
            disabled={loading}
          >
            Clear Visualization
          </Button>,
          <Button key="clear-board" onClick={clearBoard} disabled={loading}>
            Clear Board
          </Button>,
        ]}
      />
    </div>
  );
}
