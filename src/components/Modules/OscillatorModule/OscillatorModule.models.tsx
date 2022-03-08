import { TARGET_TYPE } from 'components/Node/Channel/Channel.models';
import { createOutputId } from 'utils/createOutputId';
import { createParameterId } from 'utils/createParameterId';

export const OSCILLATOR_OUTPUT = { id: createOutputId('oscillator') };

export const OSCILLATOR_CHANNELS = {
  TYPE: {
    id: createParameterId('oscillator', 'type'),
    type: TARGET_TYPE,
  },
  FREQUENCY: {
    id: createParameterId('oscillator', 'frequency'),
    type: TARGET_TYPE,
  },
};
