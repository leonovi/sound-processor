import React, { FC, useEffect, useState } from 'react';
import { NodeProps, useUpdateNodeInternals } from 'react-flow-renderer';

import { InputController } from 'components/Controllers/InputController/InputController';
import { Node } from 'components/Node/Node';
import { Source } from 'components/Flow/Flow.models';
import {
  CONSTANT_SOURCE_OUTPUT,
  DEFAULT_MAX_VALUE,
  DEFAULT_MIN_VALUE,
  DEFAULT_VALUE,
} from './ConstantSource.models';
import { useTargets } from 'hooks/useTargets';
import { useTargetsParameters } from 'hooks/useTargetsParameters';

const ConstantSource: FC<NodeProps<Source<number>>> = ({ id, data }) => {
  const updateNode = useUpdateNodeInternals();

  const [value, setValue] = useState(DEFAULT_VALUE);
  const [minValue, setMinValue] = useState(DEFAULT_MIN_VALUE);
  const [maxValue, setMaxValue] = useState(DEFAULT_MAX_VALUE);

  const targets = useTargets(id);
  useTargetsParameters(targets, setValue, setMinValue, setMaxValue);

  useEffect(() => {
    data.value = value;
    updateNode(id);
  }, [value]);

  return (
    <Node label="Constant" output={CONSTANT_SOURCE_OUTPUT}>
      <InputController
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        onChange={(value) => setValue(value)}
      />
    </Node>
  );
};

export { ConstantSource };
