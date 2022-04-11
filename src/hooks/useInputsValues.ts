import { useMemo } from 'react';
import { getEdge } from 'utils/getEdge';
import { getNode } from 'utils/getNode';
import { isUndefined } from 'utils/isUndefined';
import { InputT } from 'components/Node/Node.models';
import { useNodes } from './useNodes';
import { useConnectedEdges } from './useConnectedEdges';

export const useInputsValues = (inputs: Record<string, InputT>) => {
  const nodes = useNodes();
  const edges = useConnectedEdges();

  return useMemo(
    () =>
      Object.values(inputs).map(({ id }) => {
        const edge = getEdge(edges, id);
        const connectedNode = getNode(nodes, edge?.source);

        return isUndefined(connectedNode) ? null : connectedNode.data.value;
      }),
    [edges, inputs]
  );
};
