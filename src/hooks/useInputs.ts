import { useStoreState } from 'react-flow-renderer';
import { Node } from 'components/Flow/Flow.models';

const useInputs = (id: string) => {
  const { nodes, edges } = useStoreState((state) => state);

  return new Map(
    edges
      .filter(({ target }) => target === id)
      .map(({ source, targetHandle }) => [
        targetHandle,
        nodes.at(nodes.findIndex(({ id }) => id === source)),
      ])
  ) as Map<string | null | undefined, Node<any> | undefined>;
};

export { useInputs };
