import React, { FC } from 'react';
import { NodeProps } from 'components/Node/Node.models';
import { isUndefined } from 'utils/isUndefined';
import cn from 'classnames';
import b_ from 'b_';
import './Node.css';

const b = b_.with('node');

const Node: FC<NodeProps> = ({
  children,
  className,
  label,
}) => {
  return (
    <div className={cn(b(), className)}>
      <span className={b('label')}>{label}</span>

      {children}
    </div>
  );
};

export { Node };
