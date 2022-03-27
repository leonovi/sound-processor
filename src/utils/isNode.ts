import { NodeTypes } from 'components/Nodes/data';
import {
  Connection,
  Edge,
  isNode as elementIsNode,
  Node as FlowNode,
} from 'react-flow-renderer';

export type NodeT<T> = Omit<FlowNode<T>, 'type'> & {
  type: NodeTypes;
};

const isNode = (
  element: FlowNode | Connection | Edge
): element is NodeT<any> => {
  return elementIsNode(element);
};

export { isNode };
