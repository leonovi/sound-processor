import { TypeOfData, NodeCategories, NodeTypes } from 'components/Nodes/models';
import { getDestination, Oscillator } from 'tone';
import { generateId } from 'utils/generateId';

export type NodeConfigT<T extends NodeTypes> = typeof configs[T];

const AUDIO_HANDLE_IDENTITY = 'AUDIO';

const configs = {
  get [NodeTypes.Sum]() {
    return {
      name: NodeTypes.Sum,
      category: NodeCategories.Math,
      inputs: {
        sumInputBang: {
          id: generateId('SUM_INPUT_BANG'),
          dataType: TypeOfData.Boolean,
          hint: 'Sum input (Bang) | boolean',
        },
        sumInput1: {
          id: generateId('SUM_INPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Sum input #1 | number',
        },
        sumInput2: {
          id: generateId('SUM_INPUT_2'),
          dataType: TypeOfData.Number,
          hint: 'Sum input #2 | number',
        },
      },
      outputs: {
        sumOutput: {
          id: generateId('SUM_OUTPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Sum output | number',
        },
      },
    };
  },
  get [NodeTypes.Number]() {
    return {
      name: NodeTypes.Number,
      category: NodeCategories.Math,
      inputs: {
        numberInput: {
          id: generateId('NUMBER_INPUT'),
          dataType: TypeOfData.Number,
          hint: 'Number input | number',
        },
      },
      outputs: {
        numberOutput: {
          id: generateId('NUMBER_OUTPUT'),
          dataType: TypeOfData.Number,
          hint: 'Number output | number',
        },
      },
    };
  },
  get [NodeTypes.Bang]() {
    return {
      name: NodeTypes.Bang,
      category: NodeCategories.Utilities,
      inputs: {
        bangInput: {
          id: generateId('BANG_INPUT'),
          dataType: TypeOfData.Boolean,
          hint: 'Bang input | boolean',
        },
      },
      outputs: {
        bangOutput: {
          id: generateId('BANG_OUTPUT'),
          dataType: TypeOfData.Boolean,
          hint: 'Bang output | boolean',
        },
      },
    };
  },
  get [NodeTypes.Metro]() {
    return {
      name: NodeTypes.Metro,
      category: NodeCategories.Utilities,
      inputs: {
        metroInputMs: {
          id: generateId('METRO_INPUT_MS'),
          dataType: TypeOfData.Number,
          hint: 'Metro input | number',
        },
      },
      outputs: {
        metroOutput: {
          id: generateId('METRO_OUTPUT'),
          dataType: TypeOfData.Boolean,
          hint: 'Metro output | boolean',
        },
      },
    };
  },
  get [NodeTypes.Switch]() {
    return {
      name: NodeTypes.Switch,
      category: NodeCategories.Utilities,
      inputs: {
        switchInput1: {
          id: generateId('SWITCH_INPUT'),
          dataType: TypeOfData.Any,
          hint: 'Switch input #1 | any',
        },
        switchInput2: {
          id: generateId('SWITCH_INPUT'),
          dataType: TypeOfData.Any,
          hint: 'Switch input #2 | any',
        },
        switchInput3: {
          id: generateId('SWITCH_INPUT'),
          dataType: TypeOfData.Any,
          hint: 'Switch input #3 | any',
        },
        switchInput4: {
          id: generateId('SWITCH_INPUT'),
          dataType: TypeOfData.Any,
          hint: 'Switch input #4 | any',
        },
      },
      outputs: {
        switchOutput: {
          id: generateId('SWITCH_OUTPUT'),
          dataType: TypeOfData.Any,
          hint: 'Switch input | any',
        },
      },
    };
  },
  get [NodeTypes.Defer]() {
    return {
      name: NodeTypes.Defer,
      category: NodeCategories.Utilities,
      inputs: {
        deferInputBang: {
          id: generateId('DEFER_INPUT_BANG'),
          dataType: TypeOfData.Boolean,
          hint: 'Defer input (Bang) | boolean',
        },
        deferInputStepsQty: {
          id: generateId('DEFER_INPUT_STEPS_QTY'),
          dataType: TypeOfData.Number,
          hint: 'Defer input (Steps quantity) | number',
        },
      },
      outputs: {
        deferOutput: {
          id: generateId('DEFER_OUTPUT'),
          dataType: TypeOfData.Boolean,
          hint: 'Defer output | boolean',
        },
      },
    };
  },
  get [NodeTypes.Destination]() {
    return {
      name: NodeTypes.Destination,
      category: NodeCategories.Audio,
      module: getDestination(),
      inputs: {
        destinationAudioInput: {
          id: generateId(`DESTINATION_${AUDIO_HANDLE_IDENTITY}_INPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Destination audio input | audio',
        }
      },
      outputs: {

      },
    };
  },
  get [NodeTypes.Oscillator]() {
    return {
      name: NodeTypes.Oscillator,
      category: NodeCategories.Audio,
      module: new Oscillator(),
      inputs: {

      },
      outputs: {
        oscillatorAudioOutput: {
          id: generateId(`OSCILLATOR_${AUDIO_HANDLE_IDENTITY}_OUTPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Oscillator audio output | audio',
        }
      },
    };
  },
} as const;

const getConfig = (type: NodeTypes) => configs[type];

export { AUDIO_HANDLE_IDENTITY, getConfig };
