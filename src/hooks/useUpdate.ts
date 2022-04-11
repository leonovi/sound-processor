import { useUpdateNodeInternals } from 'react-flow-renderer';
import { isUndefined } from 'utils/isUndefined';
import { useNode } from './useNode';

const useUpdate = (id: string, value?: any) => {
  const node = useNode(id);
  const updateNode = useUpdateNodeInternals();
  return () => {
    if (node) {
      if (!isUndefined(value)) {
        node.data.value = value;
      }
      updateNode(node.id);
    }
  };
};

export { useUpdate };
