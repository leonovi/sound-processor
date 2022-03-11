import { AdsrModule } from 'components/Modules/AdsrModule/AdsrModule';
import { DestinationModule } from 'components/Modules/DestinationModule/DestinationModule';
import { GainModule } from 'components/Modules/GainModule/GainModule';
import { NoiseModule } from 'components/Modules/NoiseModule/NoiseModule';
import { OscillatorModule } from 'components/Modules/OscillatorModule/OscillatorModule';
import { ConstantSource } from 'components/Sources/ConstantSource/ConstantSource';
import { GateSource } from 'components/Sources/GateSource/GateSource';
import { NoteSequencerSource } from 'components/Sources/NoteSequencerSource/NoteSequencerSource';
import { Node as _Node } from 'react-flow-renderer';

export type Node<T> = _Node<T> & {
  type: NodeTypes;
};

export type Module = {
  module: AudioNode | null;
};

export type Source<T> = {
  value: T;
};

export const BACKSPACE_KEYCODE = 8;

export const EDGE_TYPES = {}; // TODO create custom edge

export const MODULE_PREFIX = 'MODULE_';
export const SOURCE_PREFIX = 'SOURCE_';
export enum NodeTypes {
  // Modules
  NOISE = 'MODULE_Noise',
  OSCILLATOR = 'MODULE_Osc',
  DESTINATION = 'MODULE_Destination',
  GAIN = 'MODULE_Gain',
  ADSR = 'MODULE_Adsr',

  // Sources
  CONSTANT = 'SOURCE_Constant',
  NOTE_SEQUENCER = 'SOURCE_NoteSequencer',
  GATE = 'SOURCE_Gate',
};

export const NODE_TYPES = {
  [NodeTypes.DESTINATION]: DestinationModule,
  [NodeTypes.NOISE]: NoiseModule,
  [NodeTypes.OSCILLATOR]: OscillatorModule,
  [NodeTypes.GAIN]: GainModule,
  [NodeTypes.CONSTANT]: ConstantSource,
  [NodeTypes.NOTE_SEQUENCER]: NoteSequencerSource,
  [NodeTypes.GATE]: GateSource,
  [NodeTypes.ADSR]: AdsrModule,
};
