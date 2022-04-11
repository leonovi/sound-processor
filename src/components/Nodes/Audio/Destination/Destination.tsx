import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Destination.css';
import { Node } from 'components/Node/Node';

import { DestinationNodeT } from './Destination.models';

import Speaker from 'icons/sound-speaker.svg'; // Colors

const b = b_.with('destination-node');

const Destination: FC<DestinationNodeT> = ({ id, data }) => {
  const { module } = data.config;

  const [mute, setMute] = useState(false);
  useEffect(() => {
    module.mute = mute;
  }, [mute]);

  const onClick = () => setMute((isMute) => !isMute);

  return (
    <Node compact className={b()} {...data.config}>
      <button className={b('button')} onClick={onClick}>
        <Speaker className={b('speaker', { mute })} />
      </button>
    </Node>
  );
};

export { Destination };
