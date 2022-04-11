import { Edge } from 'react-flow-renderer';
import { find } from './find';

const getEdge = (edges: Array<Edge<any>>, inputId: string | undefined) =>
  find(edges, ({ targetHandle }) => targetHandle === inputId);

export { getEdge };
