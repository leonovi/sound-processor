import { find } from 'utils/find';
import { useNodes } from './useNodes';

const useNode = (id: string) => {
  const nodes = useNodes();
  return find(nodes, (node) => node.id === id);
};

export { useNode };
