import React, { FC, useEffect, useMemo, useState } from 'react';
import b_ from 'b_';
import './Sum.css';
import { useUpdate } from 'hooks/useUpdate';
import { Node } from 'components/Node/Node';
import { SumDataT } from './Sum.models';
import { NodeT } from 'utils/isNode';
import { NodeTypes } from 'components/Nodes/models';
import { useNodes } from 'hooks/useNodes';
import { useEdges } from 'hooks/useEdges';
import { getConnectedEdges } from 'react-flow-renderer';
import { getNode } from 'utils/getNode';
import { isUndefined } from 'utils/isUndefined';
import { getEdge } from 'utils/getEdge';
import { useProps } from 'hooks/useProps';

const b = b_.with('sum-node');

const Sum: FC<NodeT<SumDataT, NodeTypes.Sum>> = ({ id, type }) => {
  const props = useProps(type);

  const nodes = useNodes();
  const edges = useEdges();
  const connectedEdges = getConnectedEdges(nodes, edges);

  const [value, setValue] = useState(0);

  const { inputs } = props;

  const sumInputBangConnectedEdge = getEdge(
    connectedEdges,
    inputs.sumInputBang.id
  );
  const sumInput1ConnectedEdge = getEdge(connectedEdges, inputs.sumInput1.id);
  const sumInput2ConnectedEdge = getEdge(connectedEdges, inputs.sumInput2.id);

  const sumInputBangNode = getNode(nodes, sumInputBangConnectedEdge?.source);
  const sumInput1Node = getNode(nodes, sumInput1ConnectedEdge?.source);
  const sumInput2Node = getNode(nodes, sumInput2ConnectedEdge?.source);

  const update = useUpdate(id, value);
  useEffect(() => {
    if (isUndefined(sumInputBangNode)) {
      return;
    }

    const { data } = sumInputBangNode;
    const isBang = data.value === true;
    if (isBang) {
      update();
    }
  }, [sumInputBangNode]);

  useEffect(() => {
    let value1 = 0;
    let value2 = 0;

    if (!isUndefined(sumInput1Node)) {
      if (typeof sumInput1Node.data.value === 'number') {
        value1 = sumInput1Node.data.value;
      }
    }

    if (!isUndefined(sumInput2Node)) {
      if (typeof sumInput2Node.data.value === 'number') {
        value2 = sumInput2Node.data.value;
      }
    }

    setValue(value1 + value2);
  }, [sumInput1Node, sumInput2Node]);

  return (
    <Node compact className={b()} onClick={() => update()} {...props}>
      <span>+</span>
    </Node>
  );
};

export { Sum };
