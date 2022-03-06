import { Processor } from 'worklets/Processor/Processor';
import {
  OscFunction,
  OscTypes,
  OSC_PARAMS,
  OSC_PROCESSOR_NAME,
} from 'worklets/OscillatorProcessor/OscillatorProcessor.models';
import { isUndefined } from 'utils/isUndefined';

class OscillatorProcessor extends Processor {
  index: number;
  sampleRate: number;

  static get parameterDescriptors() {
    return [OSC_PARAMS.TYPE, OSC_PARAMS.FREQ];
  }

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    this.index = 0;
    this.sampleRate = options?.processorOptions?.sampleRate;
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    const output = outputs[0];
    const type = parameters[OSC_PARAMS.TYPE.name][0];
    const freq = parameters[OSC_PARAMS.FREQ.name][0];

    const osc = generators.get(type);
    for (let channel = 0; channel < output.length; ++channel) {
      const outputChannel = output[channel];

      for (let i = 0; i < outputChannel.length; i++) {
        !isUndefined(osc) &&
          (outputChannel[i] = osc(freq, this.sampleRate, this.index));

        this.index++;
        if (this.index >= this.sampleRate / freq) {
          this.index = 0;
        }
      }
    }

    return this.running;
  }
}

const generators = new Map<OscTypes, OscFunction>([
  [
    OscTypes.SINE,
    (freq, sampleRate, index) =>
      Math.sin((2 * Math.PI * freq * index) / sampleRate),
  ],
  [
    OscTypes.TRIANGLE,
    (freq, sampleRate, index) =>
      index < sampleRate / freq / 2
        ? -1 + (4 * index) / (sampleRate / freq)
        : 3 - (4 * index) / (sampleRate / freq),
  ],
  [
    OscTypes.SAW,
    (freq, sampleRate, index) => (2 * index) / (sampleRate / freq) - 1,
  ],
  [
    OscTypes.SQUARE,
    (freq, sampleRate, index) => (index < sampleRate / freq / 2 ? 1 : -1),
  ],
]);

registerProcessor(OSC_PROCESSOR_NAME, OscillatorProcessor);
