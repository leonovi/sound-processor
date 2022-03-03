import React, { FC } from 'react';
import { isFirst } from 'utils/isFirst';

import { Channel } from 'components/Node/Channels/Channel/Channel';
import {
  ChannelsMode,
  ChannelsProps,
} from 'components/Node/Channels/Channels.models';
import {
  LEFT_CHANNEL_LABEL,
  Position,
  RIGHT_CHANNEL_LABEL,
  SOURCE_TYPE,
  TARGET_TYPE,
} from 'components/Node/Channels/Channel/Channel.models';

import b_ from 'b_';
import './Channels.css';

const b = b_.with('channels');

const Channels: FC<ChannelsProps> = ({ mode, channels }) => {
  const isInputs = mode === ChannelsMode.INPUT;
  const isOutputs = mode === ChannelsMode.OUTPUT;

  return (
    <div
      className={b({
        inputs: isInputs,
        outputs: isOutputs,
      })}
    >
      {channels.map(({ id }, index) => (
        <Channel
          key={index}
          id={id}
          type={isInputs ? TARGET_TYPE : SOURCE_TYPE}
          position={isInputs ? Position.Left : Position.Right}
          label={isFirst(index) ? LEFT_CHANNEL_LABEL : RIGHT_CHANNEL_LABEL}
        />
      ))}
    </div>
  );
};

export { Channels };
