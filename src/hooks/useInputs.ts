import { useStoreState } from 'react-flow-renderer';

const useInputs = (id: string) => {
  const { nodes, edges } = useStoreState((state) => state);

  return new Map(
    edges
      .filter(({ target }) => target === id)
      .map(({ source, targetHandle }) => [
        targetHandle,
        nodes.at(nodes.findIndex(({ id }) => id === source)),
      ])
  );
};

export { useInputs };
