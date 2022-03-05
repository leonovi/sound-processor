import { Node } from 'react-flow-renderer';
import { NodeTypes } from 'models/NodeTypes';
import { NOISE_PROCESSOR_NAME } from 'worklets/NoiseProcessor/NoiseProcessor.models';
import { OSCILLATOR_PROCESSOR_NAME } from 'worklets/OscillatorProcessor/OscillatorProcessor.models';
import { GAIN_PROCESSOR_NAME } from 'worklets/GainProcessor/GainProcessor.models';
import { CONSTANT_SOURCE_PROCESSOR_NAME } from 'worklets/ConstantSourceProcessor/ConstantSourceProcessor.models';

const buildModule = (
  audioContext: AudioContext,
  type: Node['type']
): AudioNode | null => {
  switch (type) {
    case NodeTypes.NOISE: {
      return new AudioWorkletNode(audioContext, NOISE_PROCESSOR_NAME);
    }

    case NodeTypes.OSCILLATOR: {
      return new AudioWorkletNode(audioContext, OSCILLATOR_PROCESSOR_NAME, {
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

    case NodeTypes.CONSTANT_SOURCE: {
      return new AudioWorkletNode(audioContext, CONSTANT_SOURCE_PROCESSOR_NAME);
    }

    default: {
      return null;
    }
  }
};

export { buildModule };
