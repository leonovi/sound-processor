import React, { FC, useEffect, useState } from 'react';
import { Node as N, NodeProps } from 'react-flow-renderer';

import { useInputs } from 'hooks/useInputs';
import { useChangeParameter } from 'hooks/useChangeParameter';

import { NodeData } from 'components/Nodes/Nodes';
import { Node } from 'components/Node/Node';
import {
  OSC_CHANNELS,
  OSC_OUTPUTS,
} from 'components/Nodes/OscillatorNode/OscillatorNode.models';
import { InputController } from 'components/Controllers/InputController/InputController';
import { SelectorController } from 'components/Controllers/SelectorController/SelectorController';
import { NO_LABEL } from 'components/Node/Parameters/Parameter/Parameter.models';

import { extractModule } from 'utils/worklet/extractModule';
import { clamp } from 'utils/clamp';

import {
  OscTypes,
  OSC_PARAMS,
} from 'worklets/OscillatorProcessor/OscillatorProcessor.models';

import SineWave from 'icons/sine-wave.svg';
import TriangleWave from 'icons/triangle-wave.svg';
import SawWave from 'icons/saw-wave.svg';
import SquareWave from 'icons/square-wave.svg';

import b_ from 'b_';
import './OscillatorNode.css';
import { useSetters } from 'hooks/useSetters';

const DEFAULT_TYPE = OSC_PARAMS.TYPE.defaultValue;
const DEFAULT_FREQUENCY = OSC_PARAMS.FREQ.defaultValue;
const MIN_FREQUENCY = OSC_PARAMS.FREQ.minValue;
const MAX_FREQUENCY = OSC_PARAMS.FREQ.maxValue;

const b = b_.with('oscillator-node');

const OscillatorNode: FC<NodeProps<NodeData>> = ({ id, data }) => {
  const [type, setType] = useState(DEFAULT_TYPE);
  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);

  const inputs = useInputs(id);
  const setters = new Map([[OSC_CHANNELS.FREQUENCY.id, setFrequency]]);
  useSetters(inputs, setters);

  const module = extractModule(data);
  useChangeParameter(
    {
      module,
      parameter: OSC_PARAMS.TYPE.name,
      value: type,
    },
    [type]
  );
  useChangeParameter(
    {
      module,
      parameter: OSC_PARAMS.FREQ.name,
      value: clamp(frequency, MIN_FREQUENCY, MAX_FREQUENCY),
    },
    [frequency]
  );

  return (
    <Node
      label="Oscillator"
      className={b()}
      outputs={OSC_OUTPUTS}
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
          channel: OSC_CHANNELS.FREQUENCY,
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

export { OscillatorNode };
