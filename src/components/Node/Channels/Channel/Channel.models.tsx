import { HandleType } from 'react-flow-renderer';

export type ChannelOptions = {
  id: string;
  label?: string;
};

export type ChannelProps = ChannelOptions & {
  className?: string;
  type: HandleType;
};

export const SOURCE_TYPE: HandleType = 'source';
export const TARGET_TYPE: HandleType = 'target';
