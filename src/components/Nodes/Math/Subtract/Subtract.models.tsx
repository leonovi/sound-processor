import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { NodeConfigT } from 'data/configs';

type SubtractNodeOptionsT = {
  type: NodeTypes.Subtract;
  data: {
    config: NodeConfigT<NodeTypes.Subtract>
    value: number;
  };
};

export type SumNodeT = FlowNodeT<SubtractNodeOptionsT>;
