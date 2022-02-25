import React, { FC } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import { stringCapitalize } from 'utils/stringCapitalize';

import b_ from 'b_';
import './NodeHandle.css';

export enum NodeHandleTypes {
  SOURCE = 'source',
  TARGET = 'target',
}

export enum SoundChannels {
  LEFT = 'left',
  RIGHT = 'right',
}

export const NodeHandlePositions = {
  TOP: Position.Top,
  LEFT: Position.Left,
  RIGHT: Position.Right,
  BOTTOM: Position.Bottom,
} as const;

type NodeHandlePropsT = {
  id: string;
  nodeType: NodeHandleTypes;
  soundChannel: SoundChannels;
  position: Position;
};

const b = b_.with('node-handle');

const buildHandleId = (
  id: string,
  nodeType: NodeHandleTypes,
  soundChannel: SoundChannels
): string => {
  return `${id}-${nodeType}-${soundChannel}`;
};

const NodeHandle: FC<NodeHandlePropsT> = ({
  id,
  nodeType,
  soundChannel,
  position,
}) => {
  const soundChannelLabel = stringCapitalize(soundChannel);

  const handleId = buildHandleId(id, nodeType, soundChannel);

  return (
    <div
      className={b({
        left: position === NodeHandlePositions.LEFT,
        right: position === NodeHandlePositions.RIGHT,
      })}
    >
      <Handle
        id={handleId}
        className={b('sound-channel')}
        type={nodeType}
        position={position}
      />
      <span className={b('sound-channel-label')}>{soundChannelLabel}</span>
    </div>
  );
};

export { NodeHandle };
