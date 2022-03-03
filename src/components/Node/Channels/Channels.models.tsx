import { ChannelOptions } from 'components/Node/Channels/Channel/Channel.models';

export enum ChannelsMode {
  INPUT = 'input',
  OUTPUT = 'output',
}

export type ChannelsProps = {
  mode: ChannelsMode;
  channels: [ChannelOptions, ChannelOptions];
};
