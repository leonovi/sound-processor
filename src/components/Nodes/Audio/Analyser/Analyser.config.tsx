import { Analyser } from 'tone';
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
    name: NodeTypes.Analyser,
    category: NodeCategories.Audio,
    audioNode: new Analyser('waveform', 256),
    inputs: {
      input: {
        id: generateId(
          NodeTypes.Analyser,
          AUDIO_HANDLE_IDENTITY,
          INPUT_IDENTITY
        ),
        name: 'In',
        dataType: TypeOfData.Audio,
        hint: 'Analyser input | audio',
      },
    },
    outputs: {
      output: {
        id: generateId(
          NodeTypes.Analyser,
          AUDIO_HANDLE_IDENTITY,
          OUTPUT_IDENTITY
        ),
        name: 'Out',
        dataType: TypeOfData.Audio,
        hint: 'Analyser output | audio',
      },
    },
  } as const);
