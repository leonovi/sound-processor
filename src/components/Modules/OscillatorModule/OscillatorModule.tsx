import React, { FC, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { useInputs } from 'hooks/useInputs';
import { useParameter } from 'hooks/useParameter';

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

const DEFAULT_TYPE = OSC_PARAMETERS.TYPE.defaultValue;
const DEFAULT_FREQUENCY = OSC_PARAMETERS.FREQUENCY.defaultValue;
const MIN_FREQUENCY = OSC_PARAMETERS.FREQUENCY.minValue;
const MAX_FREQUENCY = OSC_PARAMETERS.FREQUENCY.maxValue;

const b = b_.with('oscillator-module');

const OscillatorModule: FC<NodeProps<Module>> = ({ id, data }) => {
  const inputs = useInputs(id);

  const [type, setType] = useState(DEFAULT_TYPE);
  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);

  const module = extractModule(data);

  useParameter({
    name: OSC_PARAMETERS.TYPE.name,
    module,
    state: [type, setType],
    minValue: OSC_PARAMETERS.TYPE.minValue,
    maxValue: OSC_PARAMETERS.TYPE.maxValue,
    input: inputs.get(OSCILLATOR_CHANNELS.TYPE.id),
  });

  useParameter({
    name: OSC_PARAMETERS.FREQUENCY.name,
    module,
    state: [frequency, setFrequency],
    minValue: OSC_PARAMETERS.FREQUENCY.minValue,
    maxValue: OSC_PARAMETERS.FREQUENCY.maxValue,
    input: inputs.get(OSCILLATOR_CHANNELS.FREQUENCY.id),
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
