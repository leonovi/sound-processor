import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { NodeData } from 'components/Nodes/Nodes';
import {
  NOISE_OPTIONS,
  NOISE_OUTPUTS,
} from 'components/Nodes/NoiseNode/NoiseNode.models';
import { Node } from 'components/Node/Node';

import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';
import { extractModule } from 'utils/worklet/extractModule';

import {
  NoiseTypes,
  NOISE_TYPE_PARAMETER,
} from 'worklets/NoiseProcessor/NoiseProcessor.models';

import b_ from 'b_';
import './NoiseNode.css';
import { useAudioContext } from 'context/AudioContext';

const b = b_.with('noise-node');

const NoiseNode: FC<NodeProps<NodeData>> = ({ data }) => {
  const { currentTime } = useAudioContext();
  const [noiseType, setNoiseType] = useState(NoiseTypes.WHITE);

  useEffect(() => {
    const noiseModule = extractModule(data);
    isAudioWorklet(noiseModule) &&
      noiseModule.parameters
        .get(NOISE_TYPE_PARAMETER.name)
        .setValueAtTime(noiseType, currentTime);
  }, [noiseType]);

  return (
    <Node
      label="Noise"
      outputs={NOISE_OUTPUTS}
      className={b({
        white: noiseType === NoiseTypes.WHITE,
        pink: noiseType === NoiseTypes.PINK,
        brown: noiseType === NoiseTypes.BROWN,
      })}
    >
      <div className={b('noise-options')}>
        {NOISE_OPTIONS.map((noiseType) => (
          <button
            key={noiseType}
            className={b('noise-option', {
              white: noiseType === NoiseTypes.WHITE,
              pink: noiseType === NoiseTypes.PINK,
              brown: noiseType === NoiseTypes.BROWN,
            })}
            onClick={() => setNoiseType(noiseType)}
          />
        ))}
      </div>
    </Node>
  );
};

export { NoiseNode };
