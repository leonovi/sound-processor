import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { NodeData } from 'components/Nodes/Nodes';
import { Node } from 'components/Node/Node';
import { OSCILLATOR_OUTPUTS } from 'components/Nodes/OscillatorNode/OscillatorNode.models';
import { InputController } from 'components/Controllers/InputController/InputController';
import { ParameterOptions } from 'components/Node/Parameters/Parameter/Parameter.models';
import { SelectorController } from 'components/Controllers/SelectorController/SelectorController';

import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';
import { extractModule } from 'utils/worklet/extractModule';
import { sendMessage } from 'utils/worklet/sendMessage';

import { OscillatorTypes } from 'worklets/oscillator-processor/oscillator-processor.models';
import { changeOscillatorType } from 'worklets/oscillator-processor/oscillator-processor.portMessages';
import { ProcessorsParameters } from 'worklets/models/ProcessorParameters';

import b_ from 'b_';
import './OscillatorNode.css';

const OSCILLATOR_PARAMETERS = ProcessorsParameters.OSCILLATOR;

const b = b_.with('oscillator-node');

const OscillatorNode: FC<NodeProps<NodeData>> = ({ data }) => {
  const [oscillatorType, setOscillatorType] = useState(OscillatorTypes.SINE);

  useEffect(() => {
    const oscillatorModule = extractModule(data);

    isAudioWorklet(oscillatorModule) &&
      sendMessage(oscillatorModule, changeOscillatorType(oscillatorType));
  }, [oscillatorType]);

  const Parameters: Array<ParameterOptions> = [
    {
      label: 'Type',
      controller: (
        <SelectorController
          options={[
            {
              selected: oscillatorType === OscillatorTypes.SINE,
              onClick: () => setOscillatorType(OscillatorTypes.SINE),
              children: 'Sin',
            },
            {
              selected: oscillatorType === OscillatorTypes.TRIANGLE,
              onClick: () => setOscillatorType(OscillatorTypes.TRIANGLE),
              children: 'Tri',
            },
            {
              selected: oscillatorType === OscillatorTypes.SAW,
              onClick: () => setOscillatorType(OscillatorTypes.SAW),
              children: 'Saw',
            },
            {
              selected: oscillatorType === OscillatorTypes.SQUARE,
              onClick: () => setOscillatorType(OscillatorTypes.SQUARE),
              children: 'Squ',
            },
          ]}
        />
      ),
    },
    {
      label: 'Frequency',
      controller: (
        <InputController
          minValue={OSCILLATOR_PARAMETERS.FREQUENCY.minValue}
          maxValue={OSCILLATOR_PARAMETERS.FREQUENCY.maxValue}
          defaultValue={OSCILLATOR_PARAMETERS.FREQUENCY.defaultValue}
          module={extractModule(data)}
          controlledParameter={OSCILLATOR_PARAMETERS.FREQUENCY.name}
        />
      ),
    },
  ];

  return (
    <Node
      label="Oscillator"
      className={b()}
      outputs={OSCILLATOR_OUTPUTS}
      parameters={Parameters}
    />
  );
};

export { OscillatorNode };
