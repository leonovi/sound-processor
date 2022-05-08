import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

type BiquadFilterNodeOptionsT = {
  type: NodeTypes.BiquadFilter;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.BiquadFilter];
  };
};

export type BiquadFilterNodeT =
  FlowNodeT<BiquadFilterNodeOptionsT>;
