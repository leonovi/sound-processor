import React, { FC } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import './Destination.css';

const Destination: FC = () => {
  return (
    <div className='destination-node'>
      <Handle type="target" position={Position.Left} />
      Destination
    </div>
  );
};

export { Destination };
