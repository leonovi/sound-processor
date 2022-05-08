import { useMemo } from 'react';
import { useEdges, useNodes } from 'react-flow-renderer';
import { getEdge } from 'utils/getEdge';
import { getNode } from 'utils/getNode';
import { isUndefined } from 'utils/isUndefined';
import { FlowNodeT } from 'components/Flow/Flow.models';
import { HandleT } from 'components/Node/components/Handle/Handle.models';

export const useInputsValues = (
  inputs: Record<string, HandleT>
) => {
  const nodes = useNodes() as Array<FlowNodeT>;
  const edges = useEdges();

  return useMemo(
    () =>
      Object.values(inputs).map(({ id }) => {
        const edge = getEdge(edges, id);
        const connectedNode = getNode(nodes, edge?.source);

        return isUndefined(connectedNode)
          ? null
          : connectedNode.data.value;
      }),
    [edges, inputs]
  );
};
