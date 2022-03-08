import {
  Connection,
  Edge,
  isNode as elementIsNode,
  Node as FlowNode,
} from 'react-flow-renderer';
import { Node } from 'components/Flow/Flow.models';

const isNode = (
  element: FlowNode | Connection | Edge
): element is Node<any> => {
  return elementIsNode(element);
};

export { isNode };
