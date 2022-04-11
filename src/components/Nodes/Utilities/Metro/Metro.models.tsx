import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type MetroNodeOptionsT = {
  type: NodeTypes.Metro;
  data: {
    config: typeof configs[NodeTypes.Metro];
    value: boolean;
  };
};

export type MetroNodeT = FlowNodeT<MetroNodeOptionsT>;
