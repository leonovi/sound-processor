import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { NodeConfigT } from 'data/configs';

type NumberNodeOptionsT = {
  type: NodeTypes.Number;
  data: {
    config: NodeConfigT<NodeTypes.Number>;
    value: number;
  };
};

export type NumberNodeT = FlowNodeT<NumberNodeOptionsT>;
