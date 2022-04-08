import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import {
  Connection,
  Edge,
  isNode as elementIsNode,
  Node as FlowNode,
} from 'react-flow-renderer';

const isNode = (
  element: FlowNode | Connection | Edge
): element is FlowNodeT<{
  type: NodeTypes;
  data: any;
}> => {
  return elementIsNode(element);
};

export { isNode };
