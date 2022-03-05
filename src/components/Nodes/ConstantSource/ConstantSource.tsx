import React, { FC, useEffect, useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { InputController } from 'components/Controllers/InputController/InputController';
import { Node } from 'components/Node/Node';
import { NodeData } from '../Nodes';
import { extractModule } from 'utils/worklet/extractModule';
import { useAudioContext } from 'context/AudioContext';
import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';

const ConstantSource: FC<NodeProps<NodeData>> = ({ data }) => {
  const { currentTime } = useAudioContext();
  const [value, setValue] = useState(0);

  const module = extractModule(data);
  useEffect(() => {
    isAudioWorklet(module) &&
      module.parameters.get('value').setValueAtTime(value, currentTime);
  }, [value]);

  return (
    <Node label="Constant" outputs={[{ id: '1' }, { id: '2' }]}>
      <InputController
        value={value}
        minValue={0}
        maxValue={1000}
        onChange={(value) => setValue(value)}
      />
    </Node>
  );
};

export { ConstantSource };
