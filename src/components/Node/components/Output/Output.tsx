import React, { FC } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import b_ from 'b_';
import './Output.css';
import { HandleTypes } from 'components/Node/Node.models';
import { OutputPropsT } from './Output.models';

const b = b_.with('node-output');

const Output: FC<OutputPropsT> = ({ id, dataType }) => {
  return (
    <Handle
      className={b()}
      key={id}
      id={id}
      type={HandleTypes.Source}
      position={Position.Right}
      data-datatype={dataType}
    />
  );
};

export { Output };
