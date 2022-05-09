import { ReactNode } from 'react';
import { ToneAudioNode } from 'tone';
import { NodeCategories } from 'components/Nodes/models';
import { HandleT } from './components/Handle/Handle.models';

export type ConfigT = {
  name: ReactNode;
  category: NodeCategories;
  audioNode?: ToneAudioNode;
  inputs?: Record<string, HandleT>;
  outputs?: Record<string, HandleT>;
};

export type NodePropsT = {
  compact?: true;
  className?: string;
  config: ConfigT;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};
