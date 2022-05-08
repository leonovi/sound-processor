import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

type DeferNodeOptionsT = {
  type: NodeTypes.Defer;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Defer];
    value: boolean;
  };
};

export type DeferNodeT = FlowNodeT<DeferNodeOptionsT>;
