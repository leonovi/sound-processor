import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './Number.css';
import { useUpdate } from 'hooks/useUpdate';
import { useIncomers } from 'hooks/useIncomers';
import { NodeT } from 'utils/isNode';
import { first } from 'utils/first';
import { Node } from 'components/Node/Node';
import { propsData } from 'components/Nodes/data';
import { NumberInput } from 'components/NumberInput/NumberInput';
import { NumberDataT } from './Number.models';

const b = b_.with('number-node');

const Number: FC<NodeT<NumberDataT>> = ({ id, type }) => {
  const [value, setValue] = useState(0);

  const incomers = useIncomers(id);
  const inputNode = first(incomers);
  useEffect(
    () => inputNode && inputNode.data.value && setValue(inputNode.data.value),
    [inputNode]
  );

  const update = useUpdate(id, value);
  useEffect(update, [value]);

  const props = propsData.get(type);
  return (
    <Node className={b()} {...props}>
      <NumberInput value={value} onChange={(value) => setValue(value)} />
    </Node>
  );
};

export { Number };
