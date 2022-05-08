import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Destination.css';
import { Node } from 'components/Node/Node';
import { DestinationNodeT } from './Destination.models';

import { flattenProps } from 'utils/flattenProps';
import Speaker from 'icons/sound-speaker.svg';

const b = b_.with('destination-node');

const Destination: FC<DestinationNodeT> = (props) => {
  const { config, audioNode } =
    flattenProps<DestinationNodeT>(props);

  const [mute, setMute] = useState(false);
  useEffect(() => {
    audioNode.mute = mute;
  }, [mute]);

  const onClick = () => setMute((isMute) => !isMute);

  return (
    <Node compact className={b()} config={config}>
      <button className={b('button')} onClick={onClick}>
        <Speaker className={b('speaker', { mute })} />
      </button>
    </Node>
  );
};

export { Destination };
