import { Card } from 'antd';
import React from 'react';
import { SquareType } from '../../types/SquareTypes';

export default function Legend(): JSX.Element {
  return (
    <Card
      title="Square Types"
      style={{
        border: 'none',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <ul
          style={{
            display: 'flex',
            justifyContent: 'center',
            listStyleType: 'none',
            marginLeft: '-20px',
            marginTop: -20,
            marginBottom: -20,
          }}
        >
          <li>
            <div style={{ margin: '20px' }}>
              <div className={SquareType.Wall} />
              <p>Wall</p>
            </div>
          </li>
          <li>
            <div style={{ margin: '20px' }}>
              <div className={SquareType.Visited} />
              <p>Visited</p>
            </div>
          </li>
          <li>
            <div style={{ margin: '20px' }}>
              <div className={SquareType.Path} />
              <p>Path</p>
            </div>
          </li>
          <li>
            <div style={{ margin: '20px' }}>
              <div className={SquareType.Source} />
              <p>Start</p>
            </div>
          </li>
          <li>
            <div style={{ margin: '20px' }}>
              <div className={SquareType.Target} />
              <p>Target</p>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  );
}
