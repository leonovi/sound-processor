import { nanoid } from 'nanoid';
import { ChannelOptions } from 'components/Node/Channels/Channel/Channel.models';

export const GAIN_INPUTS: [ChannelOptions, ChannelOptions] = [
  { id: `GAIN_INPUT_L-${nanoid()}` },
  { id: `GAIN_INPUT_R-${nanoid()}` },
];

export const GAIN_OUTPUTS: [ChannelOptions, ChannelOptions] = [
  { id: `GAIN_OUTPUT_L-${nanoid()}` },
  { id: `GAIN_OUTPUT_R-${nanoid()}` },
];
