import { ChannelOptions } from 'components/Node/Channels/Channel/Channel.models';
import { ParameterOptions } from 'components/Node/Parameters/Parameter/Parameter.models';

export type NodeProps = {
  className?: string;
  label: string;
  inputs?: [ChannelOptions, ChannelOptions];
  outputs?: [ChannelOptions, ChannelOptions];
  parameters?: Array<ParameterOptions>;
};
