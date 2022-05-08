import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

export type SelectedIdT = number | null;

type SwitchNodeOptionsT = {
  type: NodeTypes.Switch;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Switch];
    value: any;
  };
};

export type SwitchNodeT = FlowNodeT<SwitchNodeOptionsT>;
