import { createOutputId } from 'utils/createOutputId';
import { NoiseTypes } from 'worklets/NoiseProcessor/NoiseProcessor.models';

export const NOISE_OUTPUT = { id: createOutputId('noise') };

export const NOISE_OPTIONS = [
  NoiseTypes.WHITE,
  NoiseTypes.PINK,
  NoiseTypes.BROWN,
];
