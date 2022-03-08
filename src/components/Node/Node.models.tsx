import { ChannelOptions } from 'components/Node/Channel/Channel.models';
import { ParameterOptions } from 'components/Node/Parameters/Parameter/Parameter.models';

export type NodeProps = {
  className?: string;
  label: string;
  input?: ChannelOptions;
  output?: ChannelOptions;
  parameters?: Array<ParameterOptions>;
};
