import { NodeTypes } from 'components/Nodes/models';
import {
  Connection,
  Edge,
  isNode as elementIsNode,
  Node as FlowNode,
} from 'react-flow-renderer';

export type NodeT<T, K> = Omit<FlowNode<T>, 'type'> & {
  type: K;
};

const isNode = (
  element: FlowNode | Connection | Edge
): element is NodeT<any, NodeTypes> => {
  return elementIsNode(element);
};

export { isNode };
