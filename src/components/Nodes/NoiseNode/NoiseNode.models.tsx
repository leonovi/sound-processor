import { nanoid } from 'nanoid';
import { NoiseTypes } from 'worklets/NoiseProcessor/NoiseProcessor.models';

export const NOISE_OUTPUTS = [
  { id: `NOISE_OUTPUT-${nanoid()}`, label: 'Output' },
];

export const NOISE_OPTIONS = [
  NoiseTypes.WHITE,
  NoiseTypes.PINK,
  NoiseTypes.BROWN,
];
