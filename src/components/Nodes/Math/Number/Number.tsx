import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { NodeComponentProps } from 'react-flow-renderer';
import { Node } from 'components/Node/Node';
import { toNumber } from 'utils/toNumber';
import { isNumber } from 'utils/isNumber';
import { useUpdate } from 'hooks/useUpdate';
import b_ from 'b_';
import './Number.css';

import { NumberDataT } from './Number.models';
import { DEFAULT_NUMBER } from './Number.data';

const b = b_.with('number-node');

const Number: FC<NodeComponentProps<NumberDataT>> = ({ id, data }) => {
  const updateNode = useUpdate();

  const [value, setValue] = useState(DEFAULT_NUMBER);

  useEffect(() => {
    data.value = value;
    updateNode(id);
  }, [value]);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (isNumber(value)) {
      setValue(toNumber(value));
    }
    if (value === '') {
      setValue(DEFAULT_NUMBER);
    }
  };

  return (
    <Node className={b()}>
      <input value={value} onChange={onInputChange} />
    </Node>
  );
};

export { Number };
