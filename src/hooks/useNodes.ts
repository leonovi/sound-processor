import { useStoreState } from "react-flow-renderer";

const useNodes = () => useStoreState((state) => state.nodes);

export { useNodes };
