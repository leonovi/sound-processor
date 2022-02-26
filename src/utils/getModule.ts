import { NodeTypes } from 'utils/nodeTypes';
import { Node } from 'react-flow-renderer';

const getModule = (
  audioContext: AudioContext,
  nodeType: Node['type']
): AudioNode | null => {
  switch (nodeType) {
    case NodeTypes.NOISE_PROCESSOR: {
      return new AudioWorkletNode(audioContext, 'noise-processor');
    }

    case NodeTypes.DESTINATION: {
      return audioContext.destination;
    }

    default: {
      return null;
    }
  }
};

export { getModule };
