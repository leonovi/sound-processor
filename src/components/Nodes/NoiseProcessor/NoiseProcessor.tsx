import React, { FC, useState } from 'react';

import {
  NodeHandle,
  NodeHandlePositions,
  NodeHandleTypes,
  SoundChannels,
} from 'components/Nodes/NodeHandle/NodeHandle';

import { NoiseTypes } from 'worklets/noise-processor/noise-processor.types';

import b_ from 'b_';
import './NoiseProcessor.css';

const b = b_.with('noise-processor-node');

const NoiseProcessor: FC = () => {
  const [noiseType, setNoiseType] = useState(NoiseTypes.WHITE);

  return (
    <div
      className={b({
        white: noiseType === NoiseTypes.WHITE,
        pink: noiseType === NoiseTypes.PINK,
        brown: noiseType === NoiseTypes.BROWN,
      })}
    >
      <span className={b('label')}>NoiseProcessor</span>

      <div className={b('noise-options')}>
        <button
          className={b('noise-option', { white: true })}
          onClick={() => setNoiseType(NoiseTypes.WHITE)}
        />
        <button
          className={b('noise-option', { pink: true })}
          onClick={() => setNoiseType(NoiseTypes.PINK)}
        />
        <button
          className={b('noise-option', { brown: true })}
          onClick={() => setNoiseType(NoiseTypes.BROWN)}
        />
      </div>

      <div className={b('sound-channels')}>
        <NodeHandle
          id="NoiseProcessorLeftOutput"
          nodeType={NodeHandleTypes.SOURCE}
          soundChannel={SoundChannels.LEFT}
          position={NodeHandlePositions.RIGHT}
        />
        <NodeHandle
          id="NoiseProcessorRightOutput"
          nodeType={NodeHandleTypes.SOURCE}
          soundChannel={SoundChannels.RIGHT}
          position={NodeHandlePositions.RIGHT}
        />
      </div>
    </div>
  );
};

export { NoiseProcessor };
