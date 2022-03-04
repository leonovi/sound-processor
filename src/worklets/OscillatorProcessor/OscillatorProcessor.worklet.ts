import { Processor } from 'worklets/Processor/Processor';
import {
  OscFunction,
  OscillatorTypes,
  OSCILLATOR_FREQUENCY_PARAMETER,
  OSCILLATOR_PROCESSOR_NAME,
  OSCILLATOR_TYPE_PARAMETER,
} from 'worklets/OscillatorProcessor/OscillatorProcessor.models';
import { isUndefined } from 'utils/isUndefined';

class OscillatorProcessor extends Processor {
  index: number;
  sampleRate: number;

  static get parameterDescriptors() {
    return [OSCILLATOR_TYPE_PARAMETER, OSCILLATOR_FREQUENCY_PARAMETER];
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
    // const input = inputs[0];
    const output = outputs[0];
    const type = parameters[OSCILLATOR_TYPE_PARAMETER.name][0];
    const freq = parameters[OSCILLATOR_FREQUENCY_PARAMETER.name][0];

    const osc = generators.get(type);
    for (let channel = 0; channel < output.length; ++channel) {
      // const inputChannel = input[channel];
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

const generators = new Map<OscillatorTypes, OscFunction>([
  [
    OscillatorTypes.SINE,
    (freq, sampleRate, index) =>
      Math.sin((2 * Math.PI * freq * index) / sampleRate),
  ],
  [
    OscillatorTypes.TRIANGLE,
    (freq, sampleRate, index) =>
      index < sampleRate / freq / 2
        ? -1 + (4 * index) / (sampleRate / freq)
        : 3 - (4 * index) / (sampleRate / freq),
  ],
  [
    OscillatorTypes.SAW,
    (freq, sampleRate, index) => (2 * index) / (sampleRate / freq) - 1,
  ],
  [
    OscillatorTypes.SQUARE,
    (freq, sampleRate, index) => (index < sampleRate / freq / 2 ? 1 : -1),
  ],
]);

registerProcessor(OSCILLATOR_PROCESSOR_NAME, OscillatorProcessor);
