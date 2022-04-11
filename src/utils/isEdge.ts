import {
  Edge,
  FlowElement,
  isEdge as elementIsEdge,
} from 'react-flow-renderer';

export const isEdge = (element: FlowElement): element is Edge<any> =>
  elementIsEdge(element);
