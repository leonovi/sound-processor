export const NOISE_PROCESSOR_NAME = 'NoiseProcessor';

export enum NoiseTypes {
  WHITE = 0,
  PINK = 1,
  BROWN = 2,
}

export const NOISE_TYPE_PARAMETER = {
  name: 'type',
  defaultValue: 0,
  minValue: 0,
  maxValue: 2,
};
