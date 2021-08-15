import React, { useState } from 'react';
import { PageHeader, Button, Menu, Dropdown, Select } from 'antd';
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
  setPathfinder,
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
  setPathfinder: (name: string) => void;
  loading: boolean;
}): JSX.Element {
  const [timeout, setTimeout] = useState(6);

  const algorithmMenu = (
    <Menu>
      <Menu.Item
        key="astar"
        onClick={() => {
          setPathfinder('astar');
          runAlgorithm(Pathfinders.astar, timeout);
        }}
        icon={<BranchesOutlined />}
      >
        A* Search
      </Menu.Item>
      <Menu.Item
        key="dijkstra"
        onClick={() => {
          setPathfinder('dijkstra');
          runAlgorithm(Pathfinders.dijkstra, timeout);
        }}
        icon={<BranchesOutlined />}
      >
        Dijkstra&apos;s Algorithm
      </Menu.Item>
      <Menu.Item
        key="best-first"
        onClick={() => {
          setPathfinder('bestfirst');
          runAlgorithm(Pathfinders.bestfirst, timeout);
        }}
        icon={<BranchesOutlined />}
      >
        Greedy Best-first Search
      </Menu.Item>
      <Menu.Item
        key="bfs"
        onClick={() => {
          setPathfinder('bfs');
          runAlgorithm(Pathfinders.bfs, timeout);
        }}
        icon={<BranchesOutlined />}
      >
        Breadth-first Search
      </Menu.Item>
      <Menu.Item
        key="dfs"
        onClick={() => {
          setPathfinder('dfs');
          runAlgorithm(Pathfinders.dfs, timeout);
        }}
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
        onClick={() => generateMaze(Mazes.floodfill, timeout, false)}
        icon={<BuildOutlined />}
      >
        Flood Fill (DFS)
      </Menu.Item>
      <Menu.Item
        key="recursive-division"
        onClick={() => generateMaze(Mazes.division, timeout, true)}
        icon={<BuildOutlined />}
      >
        Recursive Division
      </Menu.Item>
      <Menu.Item
        key="prim"
        onClick={() => generateMaze(Mazes.prim, timeout, false)}
        icon={<BuildOutlined />}
      >
        Prim&apos;s Algorithm
      </Menu.Item>
      <Menu.Item
        key="random-fill"
        onClick={() => generateMaze(Mazes.rand, timeout, true)}
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
            trigger={['click']}
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
            trigger={['click']}
          >
            <Button loading={loading}>
              Generate Walls <DownOutlined />
            </Button>
          </Dropdown>,
          <Select
            key="speed"
            defaultValue={8}
            onChange={(n) => setTimeout(n)}
            disabled={loading}
          >
            <Select.Option value={0}>Speed: Instant</Select.Option>
            <Select.Option value={8}>Speed: Fast</Select.Option>
            <Select.Option value={32}>Speed: Medium</Select.Option>
            <Select.Option value={128}>Speed: Slow</Select.Option>
          </Select>,
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
