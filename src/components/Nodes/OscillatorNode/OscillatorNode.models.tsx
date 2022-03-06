import { nanoid } from 'nanoid';
import {
  ChannelOptions,
  TARGET_TYPE,
} from 'components/Node/Channels/Channel/Channel.models';

export const OSC_OUTPUTS: Array<ChannelOptions> = [
  { id: `OSCILLATOR_OUTPUT-${nanoid()}`, label: 'Output' },
];

export const OSC_CHANNELS = {
  FREQUENCY: {
    id: `OSCILLATOR_FREQUENCY_CHANNEL-${nanoid()}`,
    type: TARGET_TYPE,
  },
};
