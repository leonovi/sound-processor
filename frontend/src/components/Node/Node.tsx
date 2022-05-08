import React, { FC, useState } from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './Node.css';
import { isUndefined } from 'utils/isUndefined';
import { NodePropsT } from 'components/Node/Node.models';
import { Handle } from './components/Handle/Handle';
import { HandleModes } from './components/Handle/Handle.models';

const b = b_.with('node');

const Node: FC<NodePropsT> = ({
  compact,
  className,
  config,
  onClick: click,
  onMouseDown: mousedown,
  onMouseUp: mouseup,
  children,
}) => {
  const { name, inputs, outputs } = config;
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
            Object.values(inputs).map(
              ({ id, dataType, hint, name }) => (
                <Handle
                  key={id}
                  id={id}
                  dataType={dataType}
                  name={name}
                  mode={HandleModes.Input}
                  hint={hint}
                />
              )
            )}
        </div>
        <div className={b('childrens')}>{children}</div>
        <div className={b('outputs')}>
          {!isUndefined(outputs) &&
            Object.values(outputs).map(
              ({ id, dataType, hint, name }) => (
                <Handle
                  key={id}
                  id={id}
                  dataType={dataType}
                  name={name}
                  mode={HandleModes.Output}
                  hint={hint}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export { Node };
