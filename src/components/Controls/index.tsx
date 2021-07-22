import React from 'react';
import { PageHeader, Button, Menu, Dropdown } from 'antd';
import {
  DownOutlined,
  BranchesOutlined,
  BuildOutlined,
} from '@ant-design/icons';
import Algorithms from '../../algorithms';

export default function Controls({
  runAlgorithm,
  clearBoard,
  clearVisualization,
}: {
  runAlgorithm: any;
  clearBoard: any;
  clearVisualization: any;
}): JSX.Element {
  const algorithmMenu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => runAlgorithm(Algorithms.dijkstra)}
        icon={<BranchesOutlined />}
      >
        Dijkstra&apos;s Algorithm
      </Menu.Item>
      <Menu.Item key="2" icon={<BranchesOutlined />}>
        A* Search
      </Menu.Item>
      <Menu.Item key="3" icon={<BranchesOutlined />}>
        Breadth-first Search
      </Menu.Item>
      <Menu.Item key="3" icon={<BranchesOutlined />}>
        Depth-first Search
      </Menu.Item>
    </Menu>
  );

  const patternMenu = (
    <Menu>
      <Menu.Item key="1" icon={<BuildOutlined />}>
        Recursive Division
      </Menu.Item>
      <Menu.Item key="2" icon={<BuildOutlined />}>
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
          <Dropdown key="1" placement="bottomCenter" overlay={algorithmMenu}>
            <Button type="primary">
              Visualize <DownOutlined />
            </Button>
          </Dropdown>,
          <Dropdown key="1" placement="bottomCenter" overlay={patternMenu}>
            <Button>
              Generate Pattern <DownOutlined />
            </Button>
          </Dropdown>,
          <Button key="2" onClick={clearVisualization}>
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
