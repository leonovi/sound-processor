import { FlowElement, isNode as elementIsNode } from 'react-flow-renderer';
import { FlowNodeT } from 'components/Nodes/models';

export const isNode = (element: FlowElement): element is FlowNodeT =>
  elementIsNode(element);
