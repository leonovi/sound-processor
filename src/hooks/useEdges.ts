import { useStoreState } from 'react-flow-renderer';

const useEdges = () => useStoreState((state) => state.edges);

export { useEdges };
