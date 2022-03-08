export const OSC_PROCESSOR_NAME = 'OscillatorProcessor';

export enum OscTypes {
  SINE = 0,
  TRIANGLE = 1,
  SAW = 2,
  SQUARE = 3,
}

export type OscFunction = (freq: number, sampleRate: number, index: number) => number;

export const OSC_PARAMETERS = {
  TYPE: {
    name: 'type',
    defaultValue: 0,
    minValue: 0,
    maxValue: 3,
  },
  FREQUENCY: {
    name: 'frequency',
    defaultValue: 220,
    minValue: 20,
    maxValue: 20000,
  }
}
