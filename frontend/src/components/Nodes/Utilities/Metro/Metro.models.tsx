import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

type MetroNodeOptionsT = {
  type: NodeTypes.Metro;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Metro];
    value: boolean;
  };
};

export type MetroNodeT = FlowNodeT<MetroNodeOptionsT>;
