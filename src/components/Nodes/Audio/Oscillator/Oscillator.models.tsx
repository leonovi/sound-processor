import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

export enum OscTypes {
  Sine = 'sine',
  Triangle = 'triangle',
  Sawtooth = 'sawtooth',
  Square = 'square',
}

type SineNodeOptionsT = {
  type: NodeTypes.Sine;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Sine];
  };
};

type TriangleNodeOptionsT = {
  type: NodeTypes.Triangle;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Triangle];
  };
};

type SawtoothNodeOptionsT = {
  type: NodeTypes.Sawtooth;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Sawtooth];
  };
};

type SquareNodeOptionsT = {
  type: NodeTypes.Square;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Square];
  };
};

export type SineNodeT = FlowNodeT<SineNodeOptionsT>;
export type TriangleNodeT = FlowNodeT<TriangleNodeOptionsT>;
export type SawtoothNodeT = FlowNodeT<SawtoothNodeOptionsT>;
export type SquareNodeT = FlowNodeT<SquareNodeOptionsT>;

export type OscillatorNodeT = FlowNodeT<
  | SineNodeOptionsT
  | TriangleNodeOptionsT
  | SawtoothNodeOptionsT
  | SquareNodeOptionsT
>;
