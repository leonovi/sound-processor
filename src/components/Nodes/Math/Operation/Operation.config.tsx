import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { OUTPUT_IDENTITY } from 'utils/constants';
import { generateId } from 'utils/generateId';

export const createConfig = (
  type:
    | NodeTypes.Sum
    | NodeTypes.Subtract
    | NodeTypes.Multiply
    | NodeTypes.Divide
) =>
  ({
    name: type,
    category: NodeCategories.Math,
    inputs: {
      bang: {
        id: generateId(type, 'Bang'),
        dataType: TypeOfData.Boolean,
        hint: '',
      },
      first: {
        id: generateId(type, 'First'),
        dataType: TypeOfData.Number,
        hint: '',
      },
      second: {
        id: generateId(type, 'Second'),
        dataType: TypeOfData.Number,
        hint: '',
      },
    },
    outputs: {
      result: {
        id: generateId(type, OUTPUT_IDENTITY),
        dataType: TypeOfData.Number,
        hint: '',
      },
    },
  } as const);
