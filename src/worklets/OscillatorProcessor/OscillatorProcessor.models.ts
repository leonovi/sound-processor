export const OSCILLATOR_PROCESSOR_NAME = 'OscillatorProcessor';

export enum OscillatorTypes {
  SINE = 0,
  TRIANGLE = 1,
  SAW = 2,
  SQUARE = 3,
}

export type OscFunction = (freq: number, sampleRate: number, index: number) => number;

export const OSCILLATOR_TYPE_PARAMETER = {
  name: 'type',
  defaultValue: 0,
  minValue: 0,
  maxValue: 3,
};

export const OSCILLATOR_FREQUENCY_PARAMETER = {
  name: 'frequency',
  defaultValue: 220,
  minValue: 20,
  maxValue: 20000,
};
