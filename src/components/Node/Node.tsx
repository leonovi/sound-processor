import React, { FC, useState } from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './Node.css';
import { isUndefined } from 'utils/isUndefined';
import { NodePropsT } from 'components/Node/Node.models';
import { Input } from './components/Input/Input';
import { Output } from './components/Output/Output';

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
