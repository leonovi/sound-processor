import {
  useNodes,
  useUpdateNodeInternals,
} from 'react-flow-renderer';
import { FlowNodeT } from 'components/Flow/Flow.models';
import { getNode } from 'utils/getNode';
import { isUndefined } from 'utils/isUndefined';

type UseUpdateHookT = (
  id: string,
  value?: any
) => () => void;

const useInternalUpdate: UseUpdateHookT = (id, value) => {
  const nodes = useNodes() as Array<FlowNodeT>;
  const node = getNode(nodes, id);

  const updateNode = useUpdateNodeInternals();

  const updateFunc = () => {
    if (!isUndefined(node)) {
      if (!isUndefined(value)) {
        node.data.value = value;
      }
      updateNode(node.id);
    }
  };

  return updateFunc;
};

export { useInternalUpdate };
