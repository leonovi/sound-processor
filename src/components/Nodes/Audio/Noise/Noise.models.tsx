import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

export enum NoiseTypes {
  White = 'white',
  Brown = 'brown',
  Pink = 'pink',
}

type NoiseNodeOptionsT = {
  type: NodeTypes.Noise;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Noise];
  };
};

export type NoiseNodeT = FlowNodeT<NoiseNodeOptionsT>;
