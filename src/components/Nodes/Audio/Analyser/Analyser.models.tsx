import { FlowNodeT, NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type AnalyserNodeOptionsT = {
  type: NodeTypes.Analyser;
  data: {
    config: typeof configs[NodeTypes.Analyser];
  };
};

export type AnalyserNodeT = FlowNodeT<AnalyserNodeOptionsT>;
