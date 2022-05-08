import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

type BangNodeOptionsT = {
  type: NodeTypes.Bang;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Bang];
    value: boolean;
  };
};

export type BangNodeT = FlowNodeT<BangNodeOptionsT>;
