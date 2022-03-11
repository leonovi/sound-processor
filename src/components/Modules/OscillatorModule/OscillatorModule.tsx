import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { useInputs } from 'hooks/useInputs';
import { useProcessorParameter } from 'hooks/useProcessorParameter';

import { Node } from 'components/Node/Node';
import {
  OSCILLATOR_CHANNELS,
  OSCILLATOR_OUTPUT,
} from 'components/Modules/OscillatorModule/OscillatorModule.models';
import { InputController } from 'components/Controllers/InputController/InputController';
import { SelectorController } from 'components/Controllers/SelectorController/SelectorController';
import { NO_LABEL } from 'components/Node/Parameters/Parameter/Parameter.models';
import { Module } from 'components/Flow/Flow.models';

import { extractModule } from 'utils/extractModule';
import { clamp } from 'utils/clamp';

import {
  OscTypes,
  OSC_PARAMETERS,
} from 'worklets/OscillatorProcessor/OscillatorProcessor.models';

import SineWave from 'icons/sine-wave.svg';
import TriangleWave from 'icons/triangle-wave.svg';
import SawWave from 'icons/saw-wave.svg';
import SquareWave from 'icons/square-wave.svg';

import b_ from 'b_';
import './OscillatorModule.css';
import { isUndefined } from 'utils/isUndefined';

const DEFAULT_TYPE = OSC_PARAMETERS.TYPE.defaultValue;
const MIN_TYPE = OSC_PARAMETERS.TYPE.minValue;
const MAX_TYPE = OSC_PARAMETERS.TYPE.maxValue;

const DEFAULT_FREQUENCY = OSC_PARAMETERS.FREQUENCY.defaultValue;
const MIN_FREQUENCY = OSC_PARAMETERS.FREQUENCY.minValue;
const MAX_FREQUENCY = OSC_PARAMETERS.FREQUENCY.maxValue;

const b = b_.with('oscillator-module');

const OscillatorModule: FC<NodeProps<Module>> = ({ id, data }) => {
  const inputs = useInputs(id);
  const typeInputNode = inputs.get(OSCILLATOR_CHANNELS.TYPE.id);
  const frequencyInputNode = inputs.get(OSCILLATOR_CHANNELS.FREQUENCY.id);

  useEffect(() => {
    if (isUndefined(typeInputNode)) {
      return;
    }

    setType(clamp(typeInputNode.data.value, MIN_TYPE, MAX_TYPE));
  }, [typeInputNode]);

  useEffect(() => {
    if (isUndefined(frequencyInputNode)) {
      return;
    }

    setFrequency(
      clamp(frequencyInputNode.data.value, MIN_FREQUENCY, MAX_FREQUENCY)
    );
  }, [frequencyInputNode]);

  const [type, setType] = useState(DEFAULT_TYPE);
  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);

  const module = extractModule(data);

  useProcessorParameter({
    name: OSC_PARAMETERS.TYPE.name,
    module,
    value: type,
  });

  useProcessorParameter({
    name: OSC_PARAMETERS.FREQUENCY.name,
    module,
    value: frequency,
  });

  return (
    <Node
      label="Oscillator"
      className={b()}
      output={OSCILLATOR_OUTPUT}
      parameters={[
        {
          label: NO_LABEL,
          controller: (
            <SelectorController<OscTypes>
              options={[
                {
                  value: OscTypes.SINE,
                  children: <SineWave />,
                },
                {
                  value: OscTypes.TRIANGLE,
                  children: <TriangleWave />,
                },
                {
                  value: OscTypes.SAW,
                  children: <SawWave />,
                },
                {
                  value: OscTypes.SQUARE,
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
          channel: OSCILLATOR_CHANNELS.FREQUENCY,
          controller: (
            <InputController
              value={frequency}
              minValue={MIN_FREQUENCY}
              maxValue={MAX_FREQUENCY}
              onChange={(value) => setFrequency(value)}
            />
          ),
        },
      ]}
    />
  );
};

export { OscillatorModule };
