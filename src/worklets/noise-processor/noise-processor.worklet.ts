import { isStopMessage } from 'worklets/utils/isStopMessage';
import { NoiseTypes } from 'worklets/noise-processor/noise-processor.models';
import { ProcessorsNames } from 'worklets/models/ProcessorNames';
import { ProcessorsMessages } from 'worklets/models/ProcessorMessages';

const isChangeTypeMessage = (data: any) =>
  data?.type === ProcessorsMessages.NOISE.CHANGE_TYPE;
class NoiseProcessor extends AudioWorkletProcessor {
  running: boolean;
  type: NoiseTypes;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    this.running = true;
    this.type = options?.processorOptions?.type ?? NoiseTypes.WHITE;

    this.port.onmessage = ({ data }) => {
      if (isStopMessage(data)) {
        this.running = false;
      }

      if (isChangeTypeMessage(data)) {
        this.type = data.payload;
      }
    };
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const output = outputs[0];
    for (let channel = 0; channel < output.length; ++channel) {
      generators[this.type](output[channel]);
    }

    return this.running;
  }
}

const generators = {
  [NoiseTypes.BROWN]: fillWithBrownNoise,
  [NoiseTypes.PINK]: fillWithPinkNoise,
  [NoiseTypes.WHITE]: fillWithWhiteNoise,
};

// See: https://noisehack.com/generate-noise-web-audio-api/
function fillWithWhiteNoise(data: Float32Array) {
  const sampleFrames = data.length;

  for (let i = 0; i < sampleFrames; i++) {
    data[i] = Math.random() * 2 - 1;
  }
}

// See: https://noisehack.com/generate-noise-web-audio-api/
function fillWithPinkNoise(data: Float32Array) {
  const sampleFrames = data.length;

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

    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11; // (roughly) compensate for gain
    b6 = white * 0.115926;
  }
}

// See: https://noisehack.com/generate-noise-web-audio-api/
function fillWithBrownNoise(data: Float32Array) {
  const sampleFrames = data.length;

  let lastOut = 0.0;
  for (let i = 0; i < sampleFrames; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5; // (roughly) compensate for gain
  }
}

registerProcessor(ProcessorsNames.NOISE, NoiseProcessor);
