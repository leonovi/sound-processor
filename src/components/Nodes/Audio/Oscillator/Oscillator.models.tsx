import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { configs } from 'data/configs';

type OscillatorNodeOptionsT = {
  type: NodeTypes.Oscillator;
  data: {
    config: typeof configs[NodeTypes.Oscillator];
  };
};

export type OscillatorNodeT = FlowNodeT<OscillatorNodeOptionsT>;
