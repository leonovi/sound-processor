import { nanoid } from 'nanoid';
import { ChannelOptions } from 'components/Node/Channels/Channel/Channel.models';
import { NoiseTypes } from 'worklets/NoiseProcessor/NoiseProcessor.models';

export const NOISE_OUTPUTS: [ChannelOptions, ChannelOptions] = [
  { id: `NOISE_OUTPUT_L-${nanoid()}` },
  { id: `NOISE_OUTPUT_R-${nanoid()}` },
];

export const NOISE_OPTIONS = [NoiseTypes.WHITE, NoiseTypes.PINK, NoiseTypes.BROWN];
