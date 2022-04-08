import { useStoreState } from 'react-flow-renderer';
import { FlowNodeT } from 'components/Flow/Flow.models';

const useNodes = () =>
  useStoreState((state) => state.nodes) as Array<FlowNodeT>;

export { useNodes };
