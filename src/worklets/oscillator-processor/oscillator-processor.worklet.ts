import { getParameterValue } from 'utils/getParameterValue';
import { isStopMessage } from 'utils/processorMessages';
import {
  OscillatorParameters,
  OscillatorTypes,
} from 'worklets/oscillator-processor/oscillator-processor.types';

class OscillatorProcessor extends AudioWorkletProcessor {
  index: number;
  running: boolean;
  sampleRate: number;
  type: OscillatorTypes;

  static get parameterDescriptors() {
    return [
      {
        name: 'frequency',
        defaultValue: 220,
        minValue: 20,
        maxValue: 1200,
      },
    ];
  }

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    this.index = 0;
    this.running = true;
    this.sampleRate = options?.processorOptions?.sampleRate;
    this.type = options?.processorOptions?.type ?? OscillatorTypes.SINE;

    this.port.onmessage = ({ data }) => {
      if (isStopMessage(data)) {
        this.running = false;
      }

      if (data?.type === 'CHANGE_TYPE') {
        this.type = data.payload;
      }
    };
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    const output = outputs[0];

    const frequencyValue = getParameterValue(
      OscillatorParameters.FREQUENCY,
      parameters
    );

    for (let channel = 0; channel < output.length; ++channel) {
      const outputChannel = output[channel];
      const period = sampleRate / frequencyValue;

      for (let i = 0; i < outputChannel.length; i++) {
        if (this.type === OscillatorTypes.SINE) {
          outputChannel[i] = Math.sin(
            (2 * Math.PI * frequencyValue * this.index) / sampleRate
          );
        }

        if (this.type === OscillatorTypes.TRIANGLE) {
          outputChannel[i] =
            this.index < period / 2
              ? -1 + (4 * this.index) / period
              : 3 - (4 * this.index) / period;
        }

        if (this.type === OscillatorTypes.SAW) {
          outputChannel[i] = (2 * this.index) / period - 1;
        }

        if (this.type === OscillatorTypes.SQUARE) {
          outputChannel[i] = this.index < period / 2 ? 1 : -1;
        }

        this.index++;
        if (this.index >= period) {
          this.index = 0;
        }
      }
    }

    return this.running;
  }
}

registerProcessor('oscillator-processor', OscillatorProcessor);
