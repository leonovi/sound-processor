import { parseParameter } from 'worklets/utils/parseParameter';
import { isStopMessage } from 'worklets/utils/isStopMessage';
import { OscillatorTypes } from 'worklets/oscillator-processor/oscillator-processor.models';
import { ProcessorsParameters } from 'worklets/models/ProcessorParameters';
import { ProcessorsMessages } from 'worklets/models/ProcessorMessages';
import { ProcessorsNames } from 'worklets/models/ProcessorNames';

const OSCILLATOR_PARAMETERS = ProcessorsParameters.OSCILLATOR

const isChangeTypeMessage = (data: any) =>
  data?.type === ProcessorsMessages.OSCILLATOR.CHANGE_TYPE;
class OscillatorProcessor extends AudioWorkletProcessor {
  periodIndex: number;
  running: boolean;
  sampleRate: number;
  type: OscillatorTypes;

  static get parameterDescriptors() {
    return [OSCILLATOR_PARAMETERS.FREQUENCY];
  }

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    this.periodIndex = 0;
    this.running = true;
    this.sampleRate = options?.processorOptions?.sampleRate;
    this.type = options?.processorOptions?.type ?? OscillatorTypes.SINE;

    this.port.onmessage = ({ data }) => {
      if (isStopMessage(data)) {
        this.running = false;
      }

      if (isChangeTypeMessage(data)) {
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

    const frequency = parseParameter(OSCILLATOR_PARAMETERS.FREQUENCY.name, parameters);

    for (let channel = 0; channel < output.length; ++channel) {
      const outputChannel = output[channel];
      const sampleFrames = outputChannel.length;
      const period = this.sampleRate / frequency.value;

      for (let i = 0; i < sampleFrames; i++) {
        if (this.type === OscillatorTypes.SINE) {
          outputChannel[i] = Math.sin(
            (2 * Math.PI * frequency.value * this.periodIndex) / this.sampleRate
          );
        }

        if (this.type === OscillatorTypes.TRIANGLE) {
          outputChannel[i] =
            this.periodIndex < period / 2
              ? -1 + (4 * this.periodIndex) / period
              : 3 - (4 * this.periodIndex) / period;
        }

        if (this.type === OscillatorTypes.SAW) {
          outputChannel[i] = (2 * this.periodIndex) / period - 1;
        }

        if (this.type === OscillatorTypes.SQUARE) {
          outputChannel[i] = this.periodIndex < period / 2 ? 1 : -1;
        }

        this.periodIndex++;
        if (this.periodIndex >= period) {
          this.periodIndex = 0;
        }
      }
    }

    return this.running;
  }
}

registerProcessor(ProcessorsNames.OSCILLATOR, OscillatorProcessor);
