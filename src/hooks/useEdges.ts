import { useStoreState } from 'react-flow-renderer';

export const useEdges = () => useStoreState((state) => state.edges);
