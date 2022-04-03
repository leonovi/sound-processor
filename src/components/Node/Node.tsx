import React, { FC, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import cn from 'classnames';
import b_ from 'b_';
import './Node.css';
import { bind } from 'utils/bind';
import { isUndefined } from 'utils/isUndefined';
import { HandleTypes, NodePropsT } from 'components/Node/Node.models';
import { InputT, OutputT } from 'components/Nodes/models';

type SetStateT<T> = React.Dispatch<React.SetStateAction<T>>;

const renderInput = (
  setHint: SetStateT<string>,
  { id, datatype, hint }: InputT
) => (
  <Handle
    data-datatype={datatype}
    className={b('input')}
    key={id}
    id={id}
    type={HandleTypes.Target}
    position={Position.Left}
    onClick={bind(setHint, hint || '?')}
  />
);

const renderOutput = (
  setHint: SetStateT<string>,
  { id, datatype, hint }: OutputT
) => (
  <Handle
    data-datatype={datatype}
    className={b('output')}
    key={id}
    id={id}
    type={HandleTypes.Source}
    position={Position.Right}
    onClick={bind(setHint, hint || '?')}
  />
);

const b = b_.with('node');

const Node: FC<NodePropsT> = ({
  name,
  compact,
  className,
  inputs,
  outputs,
  onClick: click,
  onMouseDown: mousedown,
  onMouseUp: mouseup,
  children,
}) => {
  const [inspectMode, setInspectMode] = useState(false);
  const [hint, setHint] = useState('?');

  const [dragging, setDragging] = useState(false);

  const onClick = () => {
    click?.();
  };

  const onDoubleClick = () => { // Maybe button -> <InspectModeButton>
    // setInspectMode((helpMode) => !helpMode);
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
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <header className={b('header', { hidden: compact })}>
        <span className={b('name')}>{name}</span>
      </header>
      <div className={b('body')}>
        <div className={b('inputs')}>
          {!isUndefined(inputs) &&
            Object.values(inputs).map(bind(renderInput, setHint))}
        </div>
        <div className={b('childrens')}>{children}</div>
        <div className={b('outputs')}>
          {!isUndefined(outputs) &&
            Object.values(outputs).map(bind(renderOutput, setHint))}
        </div>
      </div>
      {inspectMode && (
        <div className={b('hint')}>
          <span>{hint}</span>
        </div>
      )}
    </div>
  );
};

export { Node };
