import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import {
  NodeHandle,
  NodeHandlePositions,
  NodeHandleTypes,
  SoundChannels,
} from 'components/Nodes/NodeHandle/NodeHandle';
import { OscillatorTypeSelector } from 'components/Nodes/OscillatorProcessor/OscillatorTypeSelector';
import { NodeData } from 'components/Nodes/Nodes';
import { InputController } from 'components/Nodes/InputController/InputController';

import { isAudioWorklet } from 'utils/isAudioWorklet';
import { OscillatorTypes } from 'worklets/oscillator-processor/oscillator-processor.types';

import b_ from 'b_';
import './OscillatorProcessor.css';

const b = b_.with('oscillator-processor-node');

const OscillatorProcessor: FC<NodeProps<NodeData>> = ({
  data: { module: oscillatorModule },
}) => {
  const [oscillatorType, setOscillatorType] = useState(OscillatorTypes.SINE);

  useEffect(() => {
    isAudioWorklet(oscillatorModule) &&
      oscillatorModule.port.postMessage({
        type: 'CHANGE_TYPE',
        payload: oscillatorType,
      });
  }, [oscillatorType]);

  return (
    <div className={b()}>
      <span className={b('label')}>OscillatorProcessor</span>

      <div className={b('parameters')}>
        <div className={b('parameter')}>
          <OscillatorTypeSelector
            oscillatorWave={oscillatorType}
            setOscillatorWave={setOscillatorType}
          />
          <span className={b('parameter-lable')}>Type</span>
        </div>
        <div className={b('parameter')}>
          <InputController
            minValue={20}
            maxValue={1200}
            defaultValue={220}
            module={oscillatorModule}
            controlledParameter="frequency"
          />
          <span className={b('parameter-lable')}>Frequency</span>
        </div>
      </div>

      <div className={b('sound-channels')}>
        <NodeHandle
          id="OscillatorProcessorLeftOutput"
          nodeType={NodeHandleTypes.SOURCE}
          soundChannel={SoundChannels.LEFT}
          position={NodeHandlePositions.RIGHT}
        />
        <NodeHandle
          id="OscillatorProcessorRightOutput"
          nodeType={NodeHandleTypes.SOURCE}
          soundChannel={SoundChannels.RIGHT}
          position={NodeHandlePositions.RIGHT}
        />
      </div>
    </div>
  );
};

export { OscillatorProcessor };
