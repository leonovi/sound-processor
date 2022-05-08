import {
  FlowNodeT,
  NodeDataT,
} from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { nodesConfigs } from 'configs/nodes';

type AnalyserNodeOptionsT = {
  type: NodeTypes.Analyser;
  data: NodeDataT & {
    config: typeof nodesConfigs[NodeTypes.Analyser];
  };
};

export type AnalyserNodeT = FlowNodeT<AnalyserNodeOptionsT>;
