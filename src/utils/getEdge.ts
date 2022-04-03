import { Edge } from 'react-flow-renderer';

const getEdge = (
  edges: Array<Edge<any>>,
  inputId: string | undefined
) => {
  let result = undefined;

  for (const edge of edges) {
    if (edge.targetHandle === inputId) {
      result = edge;
      break;
    }
  }

  return result;
};

export { getEdge };
