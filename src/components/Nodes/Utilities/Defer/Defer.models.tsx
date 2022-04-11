import { FlowNodeT, NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type DeferNodeOptionsT = {
  type: NodeTypes.Defer;
  data: {
    config: typeof configs[NodeTypes.Defer];
    value: boolean;
  };
};

export type DeferNodeT = FlowNodeT<DeferNodeOptionsT>;
