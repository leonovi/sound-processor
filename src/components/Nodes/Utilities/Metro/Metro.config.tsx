import {
  NodeCategories,
  NodeTypes,
  TypeOfData,
} from 'components/Nodes/models';
import { generateId } from 'utils/generateId';

export const createConfig = () => ({
  name: NodeTypes.Metro,
  category: NodeCategories.Utilities,
  inputs: {
    ms: {
      id: generateId('METRO_INPUT_MS'),
      dataType: TypeOfData.Number,
      hint: 'Metro input | number',
    },
  },
  outputs: {
    output: {
      id: generateId('METRO_OUTPUT'),
      dataType: TypeOfData.Boolean,
      hint: 'Metro output | boolean',
    },
  },
});
