import { ChannelProps } from 'components/Node/Channel/Channel.models';
import { ReactNode } from 'react';

export type ParameterOptions = {
  channel?: ChannelProps;
  controller: ReactNode;
  label?: string;
};

export type ParameterProps = ParameterOptions & {};

export const NO_LABEL = ' ';
