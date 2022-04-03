import { useEffect } from 'react';
import { getConnectedEdges } from 'react-flow-renderer';
import { getEdge } from 'utils/getEdge';
import { getNode } from 'utils/getNode';
import { isUndefined } from 'utils/isUndefined';
import { useEdges } from './useEdges';
import { useNodes } from './useNodes';

const useConnection = (inputId: string, callback: (value: any) => void) => {
  const nodes = useNodes();
  const edges = useEdges();
  const connectedEdges = getConnectedEdges(nodes, edges);

  const connectedEdge = getEdge(connectedEdges, inputId);
  const connectedNode = getNode(nodes, connectedEdge?.source);

  useEffect(() => {
    if (isUndefined(connectedNode)) {
      return;
    }

    const { data } = connectedNode;
    callback(data.value);
  }, [connectedNode]);
};

export { useConnection };
