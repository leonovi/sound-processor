import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

type DestinationNodeOptionsT = {
  type: NodeTypes.Destination;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Destination];
  };
};

export type DestinationNodeT =
  FlowNodeT<DestinationNodeOptionsT>;
