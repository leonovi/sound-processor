import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type NumberNodeOptionsT = {
  type: NodeTypes.Number;
  data: {
    config: typeof configs[NodeTypes.Number]
    value: number;
  };
};

export type NumberNodeT = FlowNodeT<NumberNodeOptionsT>;
