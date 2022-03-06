import React, { FC } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import {
  ChannelProps,
  SOURCE_TYPE,
  TARGET_TYPE,
} from 'components/Node/Channels/Channel/Channel.models';

import cn from 'classnames';
import b_ from 'b_';
import './Channel.css';
import { isUndefined } from 'utils/isUndefined';

const b = b_.with('channel');

const Channel: FC<ChannelProps> = ({ className, id, type, label }) => {
  const isTarget = type === TARGET_TYPE;
  const isSource = type === SOURCE_TYPE;
  return (
    <div
      className={cn(
        b({
          target: isTarget,
          source: isSource,
        }),
        className
      )}
    >
      <Handle
        className={b('handle')}
        id={id}
        type={type}
        position={isTarget ? Position.Left : Position.Right}
      />
      {!isUndefined(label) && <span className={b('label')}>{label}</span>}
    </div>
  );
};

export { Channel };
