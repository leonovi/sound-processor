import { NodeTypes } from 'components/Nodes/models';
import { useStoreState } from 'react-flow-renderer';
import { NodeT } from 'utils/isNode';

const useNodes = () =>
  useStoreState((state) => state.nodes) as Array<NodeT<any, NodeTypes>>;

export { useNodes };
