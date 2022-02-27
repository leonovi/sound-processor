import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import {
  NodeHandle,
  NodeHandlePositions,
  NodeHandleTypes,
  SoundChannels,
} from 'components/Nodes/NodeHandle/NodeHandle';
import { NodeData } from 'components/Nodes/Nodes';

import { NoiseTypes } from 'worklets/noise-processor/noise-processor.types';

import { isAudioWorklet } from 'utils/isAudioWorklet';

import b_ from 'b_';
import './NoiseProcessor.css';

const b = b_.with('noise-processor-node');

const NoiseProcessor: FC<NodeProps<NodeData>> = ({
  data: { module: noiseModule },
}) => {
  const [noiseType, setNoiseType] = useState(NoiseTypes.WHITE);

  useEffect(() => {
    isAudioWorklet(noiseModule) &&
      noiseModule.port.postMessage({
        type: 'CHANGE_TYPE',
        payload: noiseType,
      });
  }, [noiseType]);

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
