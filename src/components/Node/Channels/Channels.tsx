import React, { FC } from 'react';

import { Channel } from 'components/Node/Channels/Channel/Channel';
import {
  ChannelsMode,
  ChannelsProps,
} from 'components/Node/Channels/Channels.models';
import {
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
      {channels.map(({ id, label }) => (
        <Channel
          key={id}
          id={id}
          type={isInputs ? TARGET_TYPE : SOURCE_TYPE}
          label={label}
        />
      ))}
    </div>
  );
};

export { Channels };
