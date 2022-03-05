import { Processor } from 'worklets/Processor/Processor';
import { CONSTANT_SOURCE_PROCESSOR_NAME, CONSTANT_SOURCE_VALUE_PARAMETER } from './ConstantSourceProcessor.models';

class ConstantSourceProcessor extends Processor {
  static get parameterDescriptors() {
    return [CONSTANT_SOURCE_VALUE_PARAMETER];
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
    const value = parameters.value[0];

    for (let channel = 0; channel < output.length; ++channel) {
      // const inputChannel = input[channel];
      const outputChannel = output[channel];
      for (let i = 0; i < outputChannel.length; i++) {
        outputChannel[i] = value;
      }
    }

    return this.running;
  }
}

registerProcessor(CONSTANT_SOURCE_PROCESSOR_NAME, ConstantSourceProcessor);
