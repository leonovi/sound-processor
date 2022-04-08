import { Edge } from 'react-flow-renderer';
import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { getEdge } from './getEdge';
import { getNode } from './getNode';
import { isUndefined } from './isUndefined';

const getConnectedNodeValue = (
  id: string,
  connectedEdges: Array<Edge<any>>,
  nodes: Array<FlowNodeT<{ type: NodeTypes; data: any }>>
) => {
  const connectedEdge = getEdge(connectedEdges, id);
  const connectedNode = getNode(nodes, connectedEdge?.source);

  return isUndefined(connectedNode) ? null : connectedNode.data.value;
};

export { getConnectedNodeValue };
