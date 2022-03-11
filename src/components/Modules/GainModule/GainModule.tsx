import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { useAudioContext } from 'context/AudioContext';

import { Node } from 'components/Node/Node';
import { InputController } from 'components/Controllers/InputController/InputController';
import {
  GAIN_INPUT,
  GAIN_OUTPUT,
} from 'components/Modules/GainModule/GainModule.models';

import { extractModule } from 'utils/extractModule';
import { isAudioWorklet } from 'utils/isAudioWorklet';
import { GAIN_PARAMETER } from 'worklets/GainProcessor/GainProcessor.models';

import b_ from 'b_';
import './GainModule.css';
import { clamp } from 'utils/clamp';
import { Module } from 'components/Flow/Flow.models';
import { useInputs } from 'hooks/useInputs';

const DEFAULT_GAIN = GAIN_PARAMETER.defaultValue;
const MIN_GAIN = GAIN_PARAMETER.minValue;
const MAX_GAIN = GAIN_PARAMETER.maxValue;

const b = b_.with('gain-module');

const GainModule: FC<NodeProps<Module>> = ({ id, data }) => {
  const inp = useInputs(id)
  console.log(inp);

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
      input={GAIN_INPUT}
      output={GAIN_OUTPUT}
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

export { GainModule };
