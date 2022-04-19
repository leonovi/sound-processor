import { FlowNodeT, NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type NoiseNodeOptionsT = {
  type: NodeTypes.Noise;
  data: {
    config: typeof configs[NodeTypes.Noise];
  };
};

export type NoiseNodeT = FlowNodeT<NoiseNodeOptionsT>;
