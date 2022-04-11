import { FlowNodeT, NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type BangNodeOptionsT = {
  type: NodeTypes.Bang;
  data: {
    config: typeof configs[NodeTypes.Bang];
    value: boolean; // Maybe special type BangValueT
  };
};

export type BangNodeT = FlowNodeT<BangNodeOptionsT>;
