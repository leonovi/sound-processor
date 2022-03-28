import React, { FC, useEffect, useMemo, useState } from 'react';
import b_ from 'b_';
import './Sum.css';
import { useUpdate } from 'hooks/useUpdate';
import { useIncomers } from 'hooks/useIncomers';
import { Node } from 'components/Node/Node';
import { NodeTypes, propsData } from 'components/Nodes/propsData';
import { SumDataT } from './Sum.models';
import { NodeT } from 'utils/isNode';
import { useBang } from 'hooks/useBang';

const sumIncomersValues = (incomers: Array<NodeT<any>>) => {
  return incomers
    .filter(({ data }) => typeof data.value === 'number')
    .map(({ data }) => data.value)
    .reduce((prev, curr) => prev + curr, 0);
};

const b = b_.with('sum-node');

const Sum: FC<NodeT<SumDataT>> = ({ id, type }) => {
  const [value, setValue] = useState(0);

  const incomers = useIncomers(id);

  const bangNode = useBang(incomers);

  const update = useUpdate(id, value);

  useEffect(() => bangNode && bangNode.data.value && update(), [bangNode]);

  useEffect(() => setValue(sumIncomersValues(incomers)), [incomers]);

  return (
    <Node
      withoutHeader
      className={b()}
      onClick={update}
      {...propsData.get(type)}
    >
      <span>+</span>
    </Node>
  );
};

export { Sum };
