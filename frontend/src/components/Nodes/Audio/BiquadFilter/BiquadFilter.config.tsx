import { BiquadFilter } from 'tone';
import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { generateId } from 'utils/generateId';
import {
  AUDIO_HANDLE_IDENTITY,
  INPUT_IDENTITY,
  OUTPUT_IDENTITY,
} from 'utils/constants';

export const createConfig = () =>
  ({
    name: NodeTypes.BiquadFilter,
    category: NodeCategories.Audio,
    audioNode: new BiquadFilter(),
    inputs: {
      input: {
        id: generateId(
          NodeTypes.BiquadFilter,
          AUDIO_HANDLE_IDENTITY,
          INPUT_IDENTITY
        ),
        name: 'In',
        dataType: TypeOfData.Audio,
        hint: 'Filter input | audio',
      },
      frequency: {
        id: generateId(NodeTypes.BiquadFilter, 'Freq'),
        name: 'Freq',
        dataType: TypeOfData.Number,
        hint: 'Filter input frequency | number',
      },
      Q: {
        id: generateId(NodeTypes.BiquadFilter, 'Q'),
        name: 'Q',
        dataType: TypeOfData.Number,
        hint: 'Filter input Q | number',
      },
    },
    outputs: {
      output: {
        id: generateId(
          NodeTypes.BiquadFilter,
          AUDIO_HANDLE_IDENTITY,
          OUTPUT_IDENTITY
        ),
        name: 'Out',
        dataType: TypeOfData.Audio,
        hint: 'Filter output | audio',
      },
    },
  } as const);
