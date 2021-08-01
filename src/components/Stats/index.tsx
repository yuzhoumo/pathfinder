import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import { PathfinderNames } from '../../algorithms';

export default function Stats({
  algorithm,
  visitedSquares,
  pathLength,
}: {
  algorithm: string;
  visitedSquares: number;
  pathLength: number;
}): JSX.Element {
  return (
    <Card
      title="Statistics"
      style={{
        border: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="Selected Pathfinder"
            value={PathfinderNames[algorithm]}
            precision={2}
          />
        </Col>
        <Col span={8}>
          <Statistic title="Visited Squares" value={visitedSquares} />
        </Col>
        <Col span={8}>
          <Statistic title="Path Length" value={pathLength} />
        </Col>
      </Row>
    </Card>
  );
}
