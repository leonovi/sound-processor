import React, { FC, useState } from 'react';

import { useAudioContext } from 'context/AudioContext';

import {
  NodeHandle,
  NodeHandlePositions,
  NodeHandleTypes,
  SoundChannels,
} from 'components/Nodes/NodeHandle/NodeHandle';

import { stringCapitalize } from 'utils/stringCapitalize';

import './Destination.css';

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
        <NodeHandle
          id="DestinationLeftInput"
          nodeType={NodeHandleTypes.TARGET}
          soundChannel={SoundChannels.LEFT}
          position={NodeHandlePositions.LEFT}
        />
        <NodeHandle
          id="DestinationRightInput"
          nodeType={NodeHandleTypes.TARGET}
          soundChannel={SoundChannels.RIGHT}
          position={NodeHandlePositions.LEFT}
        />
      </div>

      <button
        className={`destination-node__button ${buttonState}`}
        onClick={onButtonClick}
      >
        {stringCapitalize(buttonState)}
      </button>
    </div>
  );
};

export { Destination };
