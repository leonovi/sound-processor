import { NodeTypes } from 'components/Nodes/models';
import { NodeT } from './isNode';

const getNode = (
  nodes: Array<NodeT<any, NodeTypes>>,
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
