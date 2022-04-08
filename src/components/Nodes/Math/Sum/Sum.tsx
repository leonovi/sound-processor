import React, { FC, useEffect, useMemo, useState } from 'react';
import { getConnectedEdges } from 'react-flow-renderer';
import b_ from 'b_';
import './Sum.css';
import { useUpdate } from 'hooks/useUpdate';
import { useConnection } from 'hooks/useConnection';
import { useNodes } from 'hooks/useNodes';
import { useEdges } from 'hooks/useEdges';
import { sum } from 'utils/sum';
import { getConnectedNodeValue } from 'utils/getConnectedNodeValue';
import { Node } from 'components/Node/Node';
import { SumNodeT } from './Sum.models';

const INPUTS_QTY = 2; // Maybe more in the future (<AddInputButton />) look Switch.tsx
const DEFAULT_VALUE = 0;

const b = b_.with('sum-node');

const Sum: FC<SumNodeT> = ({ id, data }) => {
  const { inputs } = data.config;
  const { sumInputBang, sumInput1, sumInput2 } = inputs;

  const sumInputs = { sumInput1, sumInput2 }; // useMemo?

  const nodes = useNodes();
  const edges = useEdges();
  const connectedEdges = getConnectedEdges(nodes, edges);

  const [value, setValue] = useState(DEFAULT_VALUE);

  const inputValues = useMemo(() => {
    return Object.values(sumInputs).map(({ id }) => {
      return getConnectedNodeValue(id, connectedEdges, nodes);
    });
  }, [connectedEdges, sumInputs]);

  useEffect(() => {
    setValue(sum(...inputValues));
  }, [inputValues]);

  const update = useUpdate(id, value);
  useConnection(sumInputBang.id, (value) => {
    const isBang = value === true;
    if (isBang) {
      update();
    }
  });

  return (
    <Node compact className={b()} {...data.config} onClick={() => update()}>
      <span>+</span>
    </Node>
  );
};

export { Sum };
