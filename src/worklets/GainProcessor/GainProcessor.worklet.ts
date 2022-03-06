import { Processor } from 'worklets/Processor/Processor';
import {
  GAIN_PARAMETER,
  GAIN_PROCESSOR_NAME,
} from 'worklets/GainProcessor/GainProcessor.models';

class GainProcessor extends Processor {
  static get parameterDescriptors() {
    return [GAIN_PARAMETER];
  }

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    const input = inputs[0];
    const output = outputs[0];
    const gain = parameters[GAIN_PARAMETER.name][0];

    for (let channel = 0; channel < input.length; ++channel) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      for (let i = 0; i < inputChannel.length; ++i)
        outputChannel[i] = inputChannel[i] * gain;
    }

    return this.running;
  }
}

registerProcessor(GAIN_PROCESSOR_NAME, GainProcessor);
