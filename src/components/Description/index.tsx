import React from 'react';
import { Card, Typography, Divider, Tag } from 'antd';
import Descriptions, { Content } from './content';

const { Title, Paragraph, Link } = Typography;

export default function Description({
  pathfinder,
}: {
  pathfinder: string;
}): JSX.Element {
  const data: Content = Descriptions[pathfinder];

  return (
    <Card style={{ border: 'none' }}>
      <Typography style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 20 }}>
        <Title>{data.name}</Title>
        <Paragraph>
          {data.tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </Paragraph>
        {data.description}

        <Divider />

        <Title level={3}>Pseudocode</Title>

        <pre>{data.pseudocode}</pre>

        <Paragraph>
          Source: <Link href={data.source}>Wikipedia</Link>
        </Paragraph>
      </Typography>
    </Card>
  );
}
