import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { NodeConfigT } from 'data/configs';

type SumNodeOptionsT = {
  type: NodeTypes.Sum;
  data: {
    config: NodeConfigT<NodeTypes.Sum>
    value: number;
  };
};

export type SumNodeT = FlowNodeT<SumNodeOptionsT>;
