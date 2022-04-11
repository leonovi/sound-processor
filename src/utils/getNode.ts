import { FlowNodeT, NodeTypes } from 'components/Nodes/models';
import { find } from './find';

const getNode = (
  nodes: Array<FlowNodeT<{ type: NodeTypes; data: any }>>,
  nodeId: string | undefined
) => find(nodes, ({ id }) => id === nodeId);

export { getNode };
