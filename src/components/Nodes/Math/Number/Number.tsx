import React, { FC, useEffect, useMemo, useState } from 'react';
import b_ from 'b_';
import './Number.css';
import { useUpdate } from 'hooks/useUpdate';
import { NodeT } from 'utils/isNode';
import { Node } from 'components/Node/Node';
import { NumberInput } from 'components/NumberInput/NumberInput';
import { NumberDataT } from './Number.models';
import { NodeTypes } from 'components/Nodes/models';
import { useNodes } from 'hooks/useNodes';
import { getNode } from 'utils/getNode';
import { useConnection } from 'hooks/useConnection';
import { useProps } from 'hooks/useProps';
import { useNode } from 'hooks/useNode';

const b = b_.with('number-node');

const Number: FC<NodeT<NumberDataT, NodeTypes.Number>> = ({ id, type }) => {
  const props = useProps(type);
  const {
    inputs: { numberInput },
  } = props;

  const [value, setValue] = useState(0);

  useConnection(numberInput.id, setValue);

  const update = useUpdate(id, value);
  useEffect(() => {
    update();
  }, [value]);

  return (
    <Node className={b()} {...props}>
      <NumberInput value={value} onChange={(value) => setValue(value)} />
    </Node>
  );
};

export { Number };
