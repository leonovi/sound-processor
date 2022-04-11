import { useEdges } from './useEdges';
import { useNodes } from './useNodes';

export const useElements = () => {
  const nodes = useNodes();
  const edges = useEdges();

  return {
    nodes,
    edges,
  };
};
