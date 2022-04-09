import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { NodeConfigT } from 'data/configs';

type MetroNodeOptionsT = {
  type: NodeTypes.Metro;
  data: {
    config: NodeConfigT<NodeTypes.Metro>;
    value: boolean;
  };
};

export type MetroNodeT = FlowNodeT<MetroNodeOptionsT>;
