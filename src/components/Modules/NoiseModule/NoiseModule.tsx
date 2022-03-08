import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import {
  NOISE_OPTIONS,
  NOISE_OUTPUT,
} from 'components/Modules/NoiseModule/NoiseModule.models';
import { Node } from 'components/Node/Node';

import { isAudioWorklet } from 'utils/isAudioWorklet';
import { extractModule } from 'utils/extractModule';

import {
  NoiseTypes,
  NOISE_TYPE_PARAMETER,
} from 'worklets/NoiseProcessor/NoiseProcessor.models';

import b_ from 'b_';
import './NoiseModule.css';
import { useAudioContext } from 'context/AudioContext';
import { Module } from 'components/Flow/Flow.models';

const b = b_.with('noise-module');

const NoiseModule: FC<NodeProps<Module>> = ({ data }) => {
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
      output={NOISE_OUTPUT}
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

export { NoiseModule };
