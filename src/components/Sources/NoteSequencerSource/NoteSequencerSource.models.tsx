import { createOutputId } from 'utils/createOutputId';
// @ts-ignore
import noteToFrequency from 'note-to-frequency';
import { createParameterId } from 'utils/createParameterId';
import { TARGET_TYPE } from 'components/Node/Channel/Channel.models';

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

export const FIRST_NOTE_ID = 0;
export const MAX_ID = DEFAULT_SEQUENCER_LENGTH - 1;

export const MIN_OCTAVE = 1;
export const MAX_OCTAVE = 8;

export type NoteOption = {
  id: number;
  note: string;
}

export const DEFAULT_NOTES: Array<NoteOption> = new Array(DEFAULT_SEQUENCER_LENGTH)
  .fill(null)
  .map((_, index) => ({ id: index, note: 'C4' }));

export const DEFAULT_VALUE = noteToFrequency('C4');

export const NOTE_SEQUENCER_CHANNELS = {
  SYNC: {
    id: createParameterId('note-sequencer', 'sync'),
    type: TARGET_TYPE,
  },
  BPM: {
    id: createParameterId('note-sequencer', 'bpm'),
    type: TARGET_TYPE,
  }
}

export const NOTE_SEQUENCER_OUTPUT = {
  id: createOutputId('note-sequencer'),
};
