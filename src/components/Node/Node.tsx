import React, { FC } from 'react';
import { NodePropsT } from 'components/Node/Node.models';
import cn from 'classnames';
import b_ from 'b_';
import './Node.css';

const b = b_.with('node');

const Node: FC<NodePropsT> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <div className={cn(b(), className)} onClick={onClick}>
      {children}
    </div>
  );
};

export { Node };
