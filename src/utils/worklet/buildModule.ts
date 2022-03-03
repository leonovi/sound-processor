import { Node } from 'react-flow-renderer';
import { NodeTypes } from 'models/NodeTypes';

const buildModule = (
  audioContext: AudioContext,
  type: Node['type']
): AudioNode | null => {
  switch (type) {
    case NodeTypes.NOISE: {
      return new AudioWorkletNode(audioContext, 'noise-processor');
    }

    case NodeTypes.OSCILLATOR: {
      return new AudioWorkletNode(audioContext, 'oscillator-processor', {
        processorOptions: {
          sampleRate: audioContext.sampleRate,
        },
      });
    }

    case NodeTypes.DESTINATION: {
      return audioContext.destination;
    }

    default: {
      return null;
    }
  }
};

export { buildModule };
