import { HandleType, Position } from 'react-flow-renderer';

export type ChannelOptions = {
  id: string;
};

export type ChannelProps = ChannelOptions & {
  type: HandleType;
  position: Position;
  label: 'Left' | 'Right';
};

export const SOURCE_TYPE: HandleType = 'source';
export const TARGET_TYPE: HandleType = 'target';

export const LEFT_CHANNEL_LABEL: ChannelProps['label'] = 'Left';
export const RIGHT_CHANNEL_LABEL: ChannelProps['label'] = 'Right';

export { Position as Position };
