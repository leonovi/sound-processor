import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { useAudioContext } from 'context/AudioContext';

import { NodeData } from 'components/Nodes/Nodes';
import { Node } from 'components/Node/Node';
import { InputController } from 'components/Controllers/InputController/InputController';
import {
  GAIN_INPUTS,
  GAIN_OUTPUTS,
} from 'components/Nodes/GainNode/GainNode.models';

import { extractModule } from 'utils/worklet/extractModule';
import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';
import { GAIN_PARAMETER } from 'worklets/GainProcessor/GainProcessor.models';

import b_ from 'b_';
import './GainNode.css';
import { clamp } from 'utils/clamp';

const DEFAULT_GAIN = GAIN_PARAMETER.defaultValue;
const MIN_GAIN = GAIN_PARAMETER.minValue;
const MAX_GAIN = GAIN_PARAMETER.maxValue;

const b = b_.with('gain-node');

const GainNode: FC<NodeProps<NodeData>> = ({ data }) => {
  const { currentTime } = useAudioContext();
  const [gain, setGain] = useState(DEFAULT_GAIN);

  const gainModule = extractModule(data);
  useEffect(() => {
    const name = GAIN_PARAMETER.name;

    isAudioWorklet(gainModule) &&
      gainModule.parameters
        .get(name)
        .setValueAtTime(clamp(gain, MIN_GAIN, MAX_GAIN), currentTime);
  }, [gain]);

  return (
    <Node
      label="Gain"
      inputs={GAIN_INPUTS}
      outputs={GAIN_OUTPUTS}
      className={b()}
    >
      <div className={b('input')}>
        <InputController
          value={gain}
          minValue={GAIN_PARAMETER.minValue}
          maxValue={GAIN_PARAMETER.maxValue}
          step={0.05}
          onChange={(value) => setGain(value)}
        />
      </div>
    </Node>
  );
};

export { GainNode };
