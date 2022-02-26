import {
  Connection,
  Edge,
  isNode as elementIsNode,
  Node,
} from 'react-flow-renderer';
import { NodeData } from 'components/Nodes/Nodes';

const isNode = (
  element: Node | Connection | Edge
): element is Node<NodeData> => {
  return elementIsNode(element);
};

export { isNode };
