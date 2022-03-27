import React, { FC, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import cn from 'classnames';
import b_ from 'b_';
import './Node.css';
import { HandleTypes, IODataT, NodePropsT } from 'components/Node/Node.models';
import { bind } from 'utils/bind';

type SetStateT<T> = React.Dispatch<React.SetStateAction<T>>;

const renderInput = (setHint: SetStateT<string>, { id, hint }: IODataT) => (
  <Handle
    className={b('input')}
    key={id}
    id={id}
    type={HandleTypes.Target}
    position={Position.Left}
    onClick={bind(setHint, (hint || '?'))}
  />
);

const renderOutput = ({ id, hint }: IODataT) => (
  <Handle
    className={b('output')}
    key={id}
    id={id}
    type={HandleTypes.Source}
    position={Position.Right}
  />
);

const b = b_.with('node');

const Node: FC<NodePropsT> = ({
  name,
  withoutHeader,
  className,
  inputs,
  outputs,
  onClick: click,
  onMouseDown: mousedown,
  onMouseUp: mouseup,
  children,
}) => {
  const [helpMode, setHelpMode] = useState(false);
  const [hint, setHint] = useState('?');

  const [dragging, setDragging] = useState(false);

  const onClick = () => {
    click?.();
  };

  const onDoubleClick = () => {
    setHelpMode((helpMode) => !helpMode);
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
      className={cn(b({ does: dragging }), className)}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <header className={b('header', { hidden: withoutHeader })}>
        <span className={b('name')}>{name}</span>
      </header>
      <div className={b('body')}>
        <div className={b('inputs')}>
          {inputs?.map(bind(renderInput, setHint))}
        </div>
        <div className={b('childrens')}>{children}</div>
        <div className={b('outputs')}>{outputs?.map(renderOutput)}</div>
      </div>
      {helpMode && (
        <div className={b('hint')}>
          <span>{hint}</span>
        </div>
      )}
    </div>
  );
};

export { Node };
