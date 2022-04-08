import React, { FC, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import cn from 'classnames';
import b_ from 'b_';
import './Node.css';

import { isUndefined } from 'utils/isUndefined';

import {
  HandleTypes,
  InputT,
  NodePropsT,
  OutputT,
} from 'components/Node/Node.models';

const Input: FC<Pick<InputT, 'id' | 'dataType'> & {}> = ({ id, dataType }) => {
  return (
    <Handle
      data-datatype={dataType}
      className={b('input')}
      key={id}
      id={id}
      type={HandleTypes.Target}
      position={Position.Left}
    />
  );
};

const Output: FC<Pick<OutputT, 'id' | 'dataType'> & {}> = ({
  id,
  dataType,
}) => (
  <Handle
    data-datatype={dataType}
    className={b('output')}
    key={id}
    id={id}
    type={HandleTypes.Source}
    position={Position.Right}
  />
);

const b = b_.with('node');

const Node: FC<NodePropsT> = ({
  compact,
  className,
  name,
  category,
  inputs,
  outputs,
  onClick: click,
  onMouseDown: mousedown,
  onMouseUp: mouseup,
  children,
}) => {
  const [dragging, setDragging] = useState(false);

  const onClick = () => {
    click?.();
  };

  const onMouseDown = () => {
    mousedown?.();
    setDragging(true);
  };

  const onMouseUp = () => {
    mouseup?.();
    setDragging(false);
  };

  return (
    <div
      className={cn(b({ dragging }), className)}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {!compact && (
        <header className={b('header')}>
          <span className={b('name')}>{name}</span>
        </header>
      )}
      <div className={b('body')}>
        <div className={b('inputs')}>
          {!isUndefined(inputs) &&
            Object.values(inputs).map(({ id, dataType, hint }) => (
              <Input key={id} id={id} dataType={dataType} />
            ))}
        </div>
        <div className={b('childrens')}>{children}</div>
        <div className={b('outputs')}>
          {!isUndefined(outputs) &&
            Object.values(outputs).map(({ id, dataType, hint }) => (
              <Output key={id} id={id} dataType={dataType} />
            ))}
        </div>
      </div>
    </div>
  );
};

export { Node };
