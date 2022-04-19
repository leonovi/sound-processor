import React, { FC } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import b_ from 'b_';
import './Input.css';
import { HandleTypes } from 'components/Node/Node.models';
import { InputPropsT } from './Input.models';

const b = b_.with('node-input');

const Input: FC<InputPropsT> = ({ id, dataType, name }) => {
  return (
    <div className={b()}>
      <Handle
        className={b('handle')}
        key={id}
        id={id}
        type={HandleTypes.Target}
        position={Position.Left}
        data-datatype={dataType}
      />
      <span className={b('handle-name')}>{name}</span>
    </div>
  );
};

export { Input };
