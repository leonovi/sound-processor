import {
  Connection,
  Edge,
  isNode as elementIsNode,
  Node,
} from 'react-flow-renderer';
import { NodeT } from 'components/Flow/Flow.models';

const isNode = (
  element: Node | Connection | Edge
): element is NodeT<any> => {
  return elementIsNode(element);
};

export { isNode };
