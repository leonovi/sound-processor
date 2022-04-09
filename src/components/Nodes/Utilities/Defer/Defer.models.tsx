import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { NodeConfigT } from 'data/configs';

type DeferNodeOptionsT = {
  type: NodeTypes.Defer;
  data: {
    config: NodeConfigT<NodeTypes.Defer>;
    value: boolean;
  };
};

export type DeferNodeT = FlowNodeT<DeferNodeOptionsT>;
