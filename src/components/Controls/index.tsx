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
}: {
  runAlgorithm: (algorithm: PathfindingAlgorithm, timeout: number) => void;
  generateMaze: (nodes: (grid: Grid) => Node[], timeout: number) => void;
  clearBoard: () => void;
  clearVisualization: () => void;
}): JSX.Element {
  const algorithmMenu = (
    <Menu>
      <Menu.Item
        key="dijkstra"
        onClick={() => runAlgorithm(Pathfinders.dijkstra, 6)}
        icon={<BranchesOutlined />}
      >
        Dijkstra&apos;s Algorithm
      </Menu.Item>
      <Menu.Item key="astar" icon={<BranchesOutlined />}>
        A* Search
      </Menu.Item>
      <Menu.Item key="bfs" icon={<BranchesOutlined />}>
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
      <Menu.Item key="recursive-division" icon={<BuildOutlined />}>
        Recursive Division
      </Menu.Item>
      <Menu.Item
        key="random"
        onClick={() => generateMaze(Mazes.rand, 6)}
        icon={<BuildOutlined />}
      >
        Random Maze
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
            <Button type="primary">
              Visualize
              <DownOutlined />
            </Button>
          </Dropdown>,
          <Dropdown
            key="generate-pattern"
            placement="bottomCenter"
            overlay={patternMenu}
          >
            <Button>
              Generate Pattern <DownOutlined />
            </Button>
          </Dropdown>,
          <Button key="clear-visualization" onClick={clearVisualization}>
            Clear Visualization
          </Button>,
          <Button key="3" onClick={clearBoard}>
            Clear Board
          </Button>,
        ]}
      />
    </div>
  );
}
