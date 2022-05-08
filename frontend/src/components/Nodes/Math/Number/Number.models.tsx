import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

type NumberNodeOptionsT = {
  type: NodeTypes.Number;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Number];
    value: number;
  };
};

export type NumberNodeT = FlowNodeT<NumberNodeOptionsT>;
