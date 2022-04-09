import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Number.css';

import { useUpdate } from 'hooks/useUpdate';
import { useConnection } from 'hooks/useConnection';

import { Node } from 'components/Node/Node';
import { NumberInput } from 'components/NumberInput/NumberInput';

import { NumberNodeT } from './Number.models';

const DEFAULT_VALUE = 0;

const b = b_.with('number-node');

const Number: FC<NumberNodeT> = ({ id, data }) => {
  const { inputs } = data.config;

  const [value, setValue] = useState(DEFAULT_VALUE);
  useConnection(inputs.numberInput.id, setValue);

  const update = useUpdate(id, value);
  useEffect(() => {
    update();
  }, [value]);

  return (
    <Node className={b()} {...data.config}>
      <NumberInput value={value} onChange={(value) => setValue(value)} />
    </Node>
  );
};

export { Number };
