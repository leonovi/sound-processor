import { getConnectedEdges } from 'react-flow-renderer';
import { useEdges } from './useEdges';
import { useNodes } from './useNodes';

export const useConnectedEdges = () => {
  const nodes = useNodes();
  const edges = useEdges();
  return getConnectedEdges(nodes, edges);
};
