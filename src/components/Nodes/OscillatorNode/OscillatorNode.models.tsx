import { nanoid } from 'nanoid';
import { ChannelOptions } from 'components/Node/Channels/Channel/Channel.models';

export const OSCILLATOR_OUTPUTS: [ChannelOptions, ChannelOptions] = [
  { id: `OSCILLATOR_OUTPUT_L-${nanoid()}` },
  { id: `OSCILLATOR_OUTPUT_R-${nanoid()}` },
];
