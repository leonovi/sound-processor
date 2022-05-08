import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { OUTPUT_IDENTITY } from 'utils/constants';
import { generateId } from 'utils/generateId';

export const createConfig = () =>
  ({
    name: NodeTypes.Defer,
    category: NodeCategories.Utilities,
    inputs: {
      bang: {
        id: generateId(NodeTypes.Defer, 'Bang'),
        name: 'Bang',
        dataType: TypeOfData.Boolean,
        hint: 'Defer input (Bang) | boolean',
      },
      steps: {
        id: generateId(NodeTypes.Defer, 'Steps'),
        name: 'Steps',
        dataType: TypeOfData.Number,
        hint: 'Defer input (Steps quantity) | number',
      },
    },
    outputs: {
      deferOutput: {
        id: generateId(NodeTypes.Defer, OUTPUT_IDENTITY),
        name: 'Out',
        dataType: TypeOfData.Boolean,
        hint: 'Defer output | boolean',
      },
    },
  } as const);
