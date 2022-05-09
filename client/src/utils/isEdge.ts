import {
  Connection,
  Edge,
  Node,
  isEdge as elementIsEdge,
} from 'react-flow-renderer';

export const isEdge = (
  element: Node | Connection | Edge
): element is Edge<any> => elementIsEdge(element);
