import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type DestinationNodeOptionsT = {
  type: NodeTypes.Destination;
  data: {
    config: typeof configs[NodeTypes.Destination];
  };
};

export type DestinationNodeT = FlowNodeT<DestinationNodeOptionsT>;
