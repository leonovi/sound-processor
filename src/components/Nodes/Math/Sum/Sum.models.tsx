import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type SumNodeOptionsT = {
  type: NodeTypes.Sum;
  data: {
    config: typeof configs[NodeTypes.Sum]
    value: number;
  };
};

export type SumNodeT = FlowNodeT<SumNodeOptionsT>;
