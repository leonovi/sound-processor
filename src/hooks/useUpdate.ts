import { useUpdateNodeInternals } from 'react-flow-renderer';
import { useNode } from './useNode';

const useUpdate = (id: string, value?: any) => {
  const node = useNode(id);
  const updateNode = useUpdateNodeInternals();

  return () => {
    if (node) {
      if (value !== undefined) {
        node.data.value = value;
      }
      updateNode(id);
    }
  };
};

export { useUpdate };
