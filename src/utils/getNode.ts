import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';

const getNode = (
  nodes: Array<FlowNodeT<{ type: NodeTypes; data: any }>>,
  nodeId: string | undefined
) => {
  let result = undefined;

  for (const node of nodes) {
    if (node.id === nodeId) {
      result = node;
      break;
    }
  }

  return result;
};

export { getNode };
