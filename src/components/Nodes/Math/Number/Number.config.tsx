import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { generateId } from 'utils/generateId';
import {
  INPUT_IDENTITY,
  OUTPUT_IDENTITY,
} from 'utils/constants';

export const createConfig = () =>
  ({
    name: NodeTypes.Number,
    category: NodeCategories.Math,
    inputs: {
      input: {
        id: generateId(NodeTypes.Number, INPUT_IDENTITY),
        dataType: TypeOfData.Number,
        hint: 'Number input | number',
      },
    },
    outputs: {
      output: {
        id: generateId(NodeTypes.Number, OUTPUT_IDENTITY),
        dataType: TypeOfData.Number,
        hint: 'Number output | number',
      },
    },
  } as const);
