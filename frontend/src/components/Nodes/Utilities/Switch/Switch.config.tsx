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

export const createConfig = () => ({
  name: NodeTypes.Switch,
  category: NodeCategories.Utilities,
  inputs: {
    input1: {
      id: generateId(
        NodeTypes.Switch,
        INPUT_IDENTITY,
        '1'
      ),
      dataType: TypeOfData.Any,
      hint: 'Switch input #1 | any',
    },
    input2: {
      id: generateId(
        NodeTypes.Switch,
        INPUT_IDENTITY,
        '2'
      ),
      dataType: TypeOfData.Any,
      hint: 'Switch input #2 | any',
    },
    input3: {
      id: generateId(
        NodeTypes.Switch,
        INPUT_IDENTITY,
        '3'
      ),
      dataType: TypeOfData.Any,
      hint: 'Switch input #3 | any',
    },
    input4: {
      id: generateId(
        NodeTypes.Switch,
        INPUT_IDENTITY,
        '4'
      ),
      dataType: TypeOfData.Any,
      hint: 'Switch input #4 | any',
    },
  },
  outputs: {
    output: {
      id: generateId(NodeTypes.Switch, OUTPUT_IDENTITY),
      dataType: TypeOfData.Any,
      hint: 'Switch input | any',
    },
  },
});
