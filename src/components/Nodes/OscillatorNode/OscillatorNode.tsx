import React, { FC, memo, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { useAudioContext } from 'context/AudioContext';

import { NodeData } from 'components/Nodes/Nodes';
import { Node } from 'components/Node/Node';
import { OSCILLATOR_OUTPUTS } from 'components/Nodes/OscillatorNode/OscillatorNode.models';
import { InputController } from 'components/Controllers/InputController/InputController';
import { SelectorController } from 'components/Controllers/SelectorController/SelectorController';
import { NO_LABEL } from 'components/Node/Parameters/Parameter/Parameter.models';

import { extractModule } from 'utils/worklet/extractModule';
import { clamp } from 'utils/clamp';
import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';

import {
  OscillatorTypes,
  OSCILLATOR_FREQUENCY_PARAMETER,
  OSCILLATOR_TYPE_PARAMETER,
} from 'worklets/OscillatorProcessor/OscillatorProcessor.models';

import SineWave from 'icons/sine-wave.svg';
import TriangleWave from 'icons/triangle-wave.svg';
import SawWave from 'icons/saw-wave.svg';
import SquareWave from 'icons/square-wave.svg';

import b_ from 'b_';
import './OscillatorNode.css';

const DEFAULT_TYPE = OSCILLATOR_TYPE_PARAMETER.defaultValue;
const DEFAULT_FREQUENCY = OSCILLATOR_FREQUENCY_PARAMETER.defaultValue;
const MIN_FREQUENCY = OSCILLATOR_FREQUENCY_PARAMETER.minValue;
const MAX_FREQUENCY = OSCILLATOR_FREQUENCY_PARAMETER.maxValue;

const b = b_.with('oscillator-node');

const OscillatorNode: FC<NodeProps<NodeData>> = ({ data }) => {
  const { currentTime } = useAudioContext();

  const [type, setType] = useState(DEFAULT_TYPE);
  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);

  const oscillatorModule = extractModule(data);
  useEffect(() => {
    const name = OSCILLATOR_TYPE_PARAMETER.name;

    isAudioWorklet(oscillatorModule) &&
      oscillatorModule.parameters.get(name).setValueAtTime(type, currentTime);
  }, [type]);

  useEffect(() => {
    const name = OSCILLATOR_FREQUENCY_PARAMETER.name;

    isAudioWorklet(oscillatorModule) &&
      oscillatorModule.parameters
        .get(name)
        .setValueAtTime(
          clamp(frequency, MIN_FREQUENCY, MAX_FREQUENCY),
          currentTime
        );
  }, [frequency]);

  return (
    <Node
      label="Oscillator"
      className={b()}
      outputs={OSCILLATOR_OUTPUTS}
      parameters={[
        {
          label: NO_LABEL,
          controller: (
            <SelectorController<OscillatorTypes>
              options={[
                {
                  value: OscillatorTypes.SINE,
                  children: <SineWave />,
                },
                {
                  value: OscillatorTypes.TRIANGLE,
                  children: <TriangleWave />,
                },
                {
                  value: OscillatorTypes.SAW,
                  children: <SawWave />,
                },
                {
                  value: OscillatorTypes.SQUARE,
                  children: <SquareWave />,
                },
              ].reverse()}
              selectedValue={type}
              onChange={(value) => setType(value)}
            />
          ),
        },
        {
          label: 'Frequency',
          controller: (
            <InputController
              value={frequency}
              minValue={OSCILLATOR_FREQUENCY_PARAMETER.minValue}
              maxValue={OSCILLATOR_FREQUENCY_PARAMETER.maxValue}
              onChange={(value) => setFrequency(value)}
            />
          ),
        },
      ]}
    />
  );
};

export { OscillatorNode };
