import React, { FC, useEffect, useState } from 'react';
import { NodeProps, useUpdateNodeInternals } from 'react-flow-renderer';

import { InputController } from 'components/Controllers/InputController/InputController';
import { Node } from 'components/Node/Node';
import { CONSTANT_SOURCE_OUTPUTS, SourceData } from './ConstantSource.models';

const ConstantSource: FC<NodeProps<SourceData>> = ({ id, data }) => {
  const updateNode = useUpdateNodeInternals();
  const [value, setValue] = useState(0);

  useEffect(() => {
    data.value = value;
    updateNode(id);
  }, [value]);

  return (
    <Node label="Constant" outputs={CONSTANT_SOURCE_OUTPUTS}>
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
