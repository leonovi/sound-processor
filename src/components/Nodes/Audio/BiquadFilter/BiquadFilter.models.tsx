import { FlowNodeT, NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type BiquadFilterNodeOptionsT = {
  type: NodeTypes.BiquadFilter;
  data: {
    config: typeof configs[NodeTypes.BiquadFilter];
  };
};

export type BiquadFilterNodeT = FlowNodeT<BiquadFilterNodeOptionsT>;
