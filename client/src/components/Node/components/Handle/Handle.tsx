import React, { FC } from 'react';
import {
  Handle as FlowHandle,
  Position as FlowPosition,
} from 'react-flow-renderer';
import b_ from 'b_';
import './Handle.css';
import {
  HandleModes,
  HandlePropsT,
  HandleTypes,
} from './Handle.models';

const Type = {
  [HandleModes.Input]: HandleTypes.Target,
  [HandleModes.Output]: HandleTypes.Source,
};

const Position = {
  [HandleModes.Input]: FlowPosition.Left,
  [HandleModes.Output]: FlowPosition.Right,
};

const b = b_.with('node-handle');

const Handle: FC<HandlePropsT> = ({
  id,
  dataType,
  name,
  mode,
}) => {
  return (
    <div className={b()}>
      <FlowHandle
        className={b('handle')}
        key={id}
        id={id}
        type={Type[mode]}
        position={Position[mode]}
        data-datatype={dataType}
      />
      <span
        className={b('name', {
          input: mode === HandleModes.Input,
          output: mode === HandleModes.Output,
        })}
      >
        {name}
      </span>
    </div>
  );
};

export { Handle };
