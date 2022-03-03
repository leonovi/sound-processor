import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { NodeData } from 'components/Nodes/Nodes';
import { NOISE_OUTPUTS } from 'components/Nodes/NoiseNode/NoiseNode.models';
import { Node } from 'components/Node/Node';

import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';
import { sendMessage } from 'utils/worklet/sendMessage';
import { extractModule } from 'utils/worklet/extractModule';

import { NoiseTypes } from 'worklets/noise-processor/noise-processor.models';
import { changeNoiseType } from 'worklets/noise-processor/noise-processor.portMessages';

import b_ from 'b_';
import './NoiseNode.css';

const b = b_.with('noise-node');

const NoiseNode: FC<NodeProps<NodeData>> = ({ data }) => {
  const [noiseType, setNoiseType] = useState(NoiseTypes.WHITE);

  useEffect(() => {
    const noiseModule = extractModule(data);

    isAudioWorklet(noiseModule) &&
      sendMessage(noiseModule, changeNoiseType(noiseType));
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
        {Object.values(NoiseTypes).map((noiseType) => (
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
