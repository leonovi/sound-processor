import { FlowNodeT } from 'components/Flow/Flow.models';
import { find } from './find';

const getNode = (
  nodes: Array<FlowNodeT>,
  nodeId: string | undefined
) => find(nodes, ({ id }) => id === nodeId);

export { getNode };
