import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

export enum OscTypes {
  Sine = 'sine',
  Triangle = 'triangle',
  Sawtooth = 'sawtooth',
  Square = 'square',
}

type SineNodeOptionsT = {
  type: NodeTypes.Sine;
  data: {
    config: typeof configs[NodeTypes.Sine];
  };
};

type TriangleNodeOptionsT = {
  type: NodeTypes.Triangle;
  data: {
    config: typeof configs[NodeTypes.Triangle];
  };
};

type SawtoothNodeOptionsT = {
  type: NodeTypes.Sawtooth;
  data: {
    config: typeof configs[NodeTypes.Sawtooth];
  };
};

type SquareNodeOptionsT = {
  type: NodeTypes.Square;
  data: {
    config: typeof configs[NodeTypes.Square];
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
