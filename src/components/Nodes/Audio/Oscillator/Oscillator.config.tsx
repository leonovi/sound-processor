import { Oscillator } from 'tone';
import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { generateId } from 'utils/generateId';
import { OscTypes } from './Oscillator.models';
import {
  AUDIO_HANDLE_IDENTITY,
  OUTPUT_IDENTITY,
} from 'utils/constants';

const DEFAULT_FREQ = 333;

const OSC_ARGS = {
  [NodeTypes.Sine]: [DEFAULT_FREQ, OscTypes.Sine],
  [NodeTypes.Triangle]: [DEFAULT_FREQ, OscTypes.Triangle],
  [NodeTypes.Sawtooth]: [DEFAULT_FREQ, OscTypes.Sawtooth],
  [NodeTypes.Square]: [DEFAULT_FREQ, OscTypes.Square],
};

export const createConfig = (
  type:
    | NodeTypes.Sine
    | NodeTypes.Triangle
    | NodeTypes.Sawtooth
    | NodeTypes.Square
) => ({
  name: type,
  category: NodeCategories.Audio,
  audioNode: new Oscillator(...OSC_ARGS[type]),
  inputs: {
    frequency: {
      id: generateId(type, 'Freq'),
      name: 'Freq',
      dataType: TypeOfData.Number,
      hint: 'Oscillator frequency input | number',
    },
    detune: {
      id: generateId(type, 'Detune'),
      name: 'Detune',
      dataType: TypeOfData.Number,
      hint: 'Oscillator detune input | number',
    },
    partialCount: {
      id: generateId(type, 'PartialCount'),
      name: 'Partial count',
      dataType: TypeOfData.Number,
      hint: 'Oscillator detune input | number',
    },
    phase: {
      id: generateId(type, 'Phase'),
      name: 'Phase',
      dataType: TypeOfData.Number,
      hint: 'Oscillator phase input | number',
    },
    volume: {
      id: generateId(type, 'Volume'),
      dataType: TypeOfData.Number,
      name: 'Vol',
      hint: 'Oscillator volume input | number',
    },
  },
  outputs: {
    oscillatorAudioOutput: {
      id: generateId(
        type,
        AUDIO_HANDLE_IDENTITY,
        OUTPUT_IDENTITY
      ),
      dataType: TypeOfData.Audio,
      hint: 'Oscillator audio output | audio',
    },
  },
});
