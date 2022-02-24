import React, { FC, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import { useAudioContext } from 'context/AudioContext';

import { stringCapitalize } from 'utils/stringCapitalize';

import './Destination.css';

type DestinationHandlePropsT = {
  soundChannel: 'left' | 'right';
};

const DestinationHandle: FC<DestinationHandlePropsT> = ({ soundChannel }) => {
  const className = `destination-node__sound-channel ${soundChannel}`;
  const soundChannelLabel = stringCapitalize(soundChannel);

  return (
    <div className="destination-node__sound-channel-wrapper">
      <Handle className={className} type="target" position={Position.Left} />
      <span>{soundChannelLabel}</span>
    </div>
  );
};

const Destination: FC = () => {
  const { state } = useAudioContext();

  const [buttonState, setButtonState] = useState<'on' | 'off'>(() =>
    state === 'running' ? 'on' : 'off'
  );

  const onButtonClick = () => {
    setButtonState(buttonState === 'off' ? 'on' : 'off');
  };

  return (
    <div className="destination-node">
      <span className="destination-node__label">Destination</span>

      <div className="destination-node__sound-channels">
        <DestinationHandle soundChannel="left" />
        <DestinationHandle soundChannel="right" />
      </div>

      <button
        className={`destination-node__button ${buttonState}`}
        onClick={onButtonClick}
      />
    </div>
  );
};

export { Destination };
