import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { INPUT_IDENTITY, OUTPUT_IDENTITY } from 'utils/constants';
import { generateId } from 'utils/generateId';

export const createConfig = () => ({
  name: NodeTypes.Bang,
  category: NodeCategories.Utilities,
  inputs: {
    input: {
      id: generateId(NodeTypes.Bang, INPUT_IDENTITY),
      dataType: TypeOfData.Boolean,
      hint: 'Bang input | boolean',
    },
  },
  outputs: {
    output: {
      id: generateId(NodeTypes.Bang, OUTPUT_IDENTITY),
      dataType: TypeOfData.Boolean,
      hint: 'Bang output | boolean',
    },
  },
});
