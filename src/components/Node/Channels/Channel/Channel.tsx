import React, { FC } from 'react';
import { Handle } from 'react-flow-renderer';

import {
  ChannelProps,
  SOURCE_TYPE,
  TARGET_TYPE,
} from 'components/Node/Channels/Channel/Channel.models';

import b_ from 'b_';
import './Channel.css';

const b = b_.with('channel');

const Channel: FC<ChannelProps> = ({ id, type, position, label }) => {
  const isTarget = type === TARGET_TYPE;
  const isSource = type === SOURCE_TYPE;

  return (
    <div
      className={b({
        target: isTarget,
        source: isSource,
      })}
    >
      <Handle className={b('handle')} id={id} type={type} position={position} />
      <span className={b('label')}>{label}</span>
    </div>
  );
};

export { Channel };
