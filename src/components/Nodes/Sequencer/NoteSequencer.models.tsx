import { TARGET_TYPE } from 'components/Node/Channels/Channel/Channel.models';
import { nanoid } from 'nanoid';

export const DEFAULT_SEQUENCER_LENGTH = 8;
export const DEFAULT_BPM = 120;

export const NOTES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export const NOTE_SEQUENCER_OUTPUTS = [
  { id: `NOTE_SEQUENCER_OUTPUT-${nanoid()}`, label: 'Output' },
];
