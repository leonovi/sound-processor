import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { NodeConfigT } from 'data/configs';

type DestinationNodeOptionsT = {
  type: NodeTypes.Destination;
  data: {
    config: NodeConfigT<NodeTypes.Destination>;
  };
};

export type DestinationNodeT = FlowNodeT<DestinationNodeOptionsT>;
