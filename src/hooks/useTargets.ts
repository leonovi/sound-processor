import { useStoreState } from 'react-flow-renderer';

const useTargets = (id: string) => {
  const { nodes, edges } = useStoreState((state) => state);

  return new Map(
    edges
    .filter(({ source }) => source === id)
    .map(({ target, targetHandle }) => [
      targetHandle,
      nodes.at(nodes.findIndex(({ id }) => id === target)),
    ])
  ) as any; // TODO TYPE
};

export { useTargets };
