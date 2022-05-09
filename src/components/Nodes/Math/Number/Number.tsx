import React, { FC, useEffect, useState } from 'react';
import { useUpdateNodeInternals } from 'react-flow-renderer';
import b_ from 'b_';
import './Number.css';
import { Node } from 'components/Node/Node';
import { NumberNodeT } from './Number.models';

import { NumberInput } from 'components/NumberInput/NumberInput';
import { ZERO } from 'utils/constants';
import { flattenProps } from 'utils/flattenProps';
import { useConnections } from 'store/connections';
import { isNumber } from 'tone';

const b = b_.with('number-node');

const Number: FC<NumberNodeT> = (props) => {
  const {
    id,
    data,
    methods,
    config,
    inputs: { input },
  } = flattenProps<NumberNodeT>(props);

  const { getSourceValue } = useConnections();

  const [value, setValue] = useState(ZERO);
  const update = useUpdateNodeInternals();

  useEffect(() => {
    data.value = value || ZERO;
    methods.updateConnection?.();
    update(id);
  }, [value]);

  const incValue = getSourceValue(input.id);
  useEffect(() => {
    setValue(isNumber(incValue) ? incValue : value);
  }, [incValue]);

  return (
    <Node compact className={b()} config={config}>
      <NumberInput value={value} onChange={setValue} />
    </Node>
  );
};

export { Number };
