import { Node } from 'react-flow-renderer';
import { NOISE_PROCESSOR_NAME } from 'worklets/NoiseProcessor/NoiseProcessor.models';
import { OSC_PROCESSOR_NAME } from 'worklets/OscillatorProcessor/OscillatorProcessor.models';
import { GAIN_PROCESSOR_NAME } from 'worklets/GainProcessor/GainProcessor.models';
import { NodeTypes } from 'components/Flow/Flow.models';

const buildModule = (
  audioContext: AudioContext,
  type: Node['type']
): AudioNode | null => {
  switch (type) {
    case NodeTypes.NOISE: {
      return new AudioWorkletNode(audioContext, NOISE_PROCESSOR_NAME);
    }

    case NodeTypes.OSCILLATOR: {
      return new AudioWorkletNode(audioContext, OSC_PROCESSOR_NAME, {
        processorOptions: {
          sampleRate: audioContext.sampleRate,
        },
      });
    }

    case NodeTypes.DESTINATION: {
      return audioContext.destination;
    }

    case NodeTypes.GAIN: {
      return new AudioWorkletNode(audioContext, GAIN_PROCESSOR_NAME);
    }

    case NodeTypes.ADSR: {
      return new AudioWorkletNode(audioContext, "adsr-processor");
    }

    default: {
      return null;
    }
  }
};

export { buildModule };
