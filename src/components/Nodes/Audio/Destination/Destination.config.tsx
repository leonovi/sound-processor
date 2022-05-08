import { getDestination } from 'tone';
import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { generateId } from 'utils/generateId';
import {
  AUDIO_HANDLE_IDENTITY,
  INPUT_IDENTITY,
} from 'utils/constants';

export const createConfig = () =>
  ({
    name: NodeTypes.Destination,
    category: NodeCategories.Audio,
    audioNode: getDestination(),
    inputs: {
      destinationAudioInput: {
        id: generateId(
          NodeTypes.Destination,
          AUDIO_HANDLE_IDENTITY,
          INPUT_IDENTITY
        ),
        dataType: TypeOfData.Audio,
        hint: 'Destination audio input | audio',
      },
    },
  } as const);
