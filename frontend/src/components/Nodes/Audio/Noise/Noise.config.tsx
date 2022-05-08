import { Noise } from 'tone';
import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { generateId } from 'utils/generateId';
import {
  AUDIO_HANDLE_IDENTITY,
  OUTPUT_IDENTITY,
} from 'utils/constants';
import { NoiseTypes } from './Noise.models';

export const createConfig = () =>
  ({
    name: NodeTypes.Noise,
    category: NodeCategories.Audio,
    audioNode: new Noise(NoiseTypes.White),
    inputs: {
      rate: {
        id: generateId(NodeTypes.Noise, 'Rate'),
        name: 'Rate',
        dataType: TypeOfData.Number,
        hint: 'Noise rate input | number',
      },
    },
    outputs: {
      output: {
        id: generateId(
          NodeTypes.Noise,
          AUDIO_HANDLE_IDENTITY,
          OUTPUT_IDENTITY
        ),
        name: 'Out',
        dataType: TypeOfData.Audio,
        hint: 'Noise output | audio',
      },
    },
  } as const);
