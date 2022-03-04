import { Processor } from 'worklets/Processor/Processor';
import {
  NoiseTypes,
  NOISE_PROCESSOR_NAME,
  NOISE_TYPE_PARAMETER,
} from 'worklets/NoiseProcessor/NoiseProcessor.models';

import { isUndefined } from 'utils/isUndefined';

class NoiseProcessor extends Processor {
  static get parameterDescriptors() {
    return [NOISE_TYPE_PARAMETER];
  }

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    // const input = inputs[0];
    const output = outputs[0];
    const type = parameters[NOISE_TYPE_PARAMETER.name][0];

    for (let channel = 0; channel < output.length; ++channel) {
      // const inputChannel = input[channel];
      const outputChannel = output[channel];
      const noise = generators.get(type);
      !isUndefined(noise) && noise(outputChannel);
    }

    return this.running;
  }
}

const whiteNoise = (outputChannel: Float32Array) => {
  const sampleFrames = outputChannel.length;

  for (let i = 0; i < sampleFrames; i++) {
    outputChannel[i] = Math.random() * 2 - 1;
  }
};

const pinkNoise = (outputChannel: Float32Array) => {
  const sampleFrames = outputChannel.length;

  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;

  for (let i = 0; i < sampleFrames; i++) {
    const white = Math.random() * 2 - 1;

    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;

    outputChannel[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    outputChannel[i] *= 0.11; // (roughly) compensate for gain
    b6 = white * 0.115926;
  }
};

const brownNoise = (outputChannel: Float32Array) => {
  const sampleFrames = outputChannel.length;

  let lastOut = 0.0;
  for (let i = 0; i < sampleFrames; i++) {
    const white = Math.random() * 2 - 1;
    outputChannel[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = outputChannel[i];
    outputChannel[i] *= 3.5; // (roughly) compensate for gain
  }
};

const generators = new Map([
  [NoiseTypes.WHITE, whiteNoise],
  [NoiseTypes.PINK, pinkNoise],
  [NoiseTypes.BROWN, brownNoise],
]);

registerProcessor(NOISE_PROCESSOR_NAME, NoiseProcessor);
