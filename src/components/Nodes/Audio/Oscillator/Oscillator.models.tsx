import { FlowNodeT } from 'components/Flow/Flow.models';
import { NodeTypes } from 'components/Nodes/models';
import { NodeConfigT } from 'data/configs';

type OscillatorNodeOptionsT = {
  type: NodeTypes.Oscillator;
  data: {
    config: NodeConfigT<NodeTypes.Oscillator>;
  };
};

export type OscillatorNodeT = FlowNodeT<OscillatorNodeOptionsT>;
