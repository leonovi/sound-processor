import { ToneAudioNode } from 'tone';
import { FlowNodeT } from 'components/Flow/Flow.models';

export const extractAudioNodes = (
  ...flowNodes: Array<FlowNodeT>
): Array<ToneAudioNode | undefined> => {
  return flowNodes.map(
    (flowNode) => flowNode?.data?.config?.audioNode
  );
};
