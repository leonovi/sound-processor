import { getDestination, Oscillator } from 'tone';
import { generateId } from 'utils/generateId';
import { TypeOfData, NodeCategories, NodeTypes } from 'components/Nodes/models';
import { OscTypes } from 'components/Nodes/Audio/Oscillator/Oscillator.models';

const DEFAULT_FREQ = 333;

export const AUDIO_HANDLE_IDENTITY = 'AUDIO';

export const configs = {
  get [NodeTypes.Sum]() {
    return {
      name: NodeTypes.Sum,
      category: NodeCategories.Math,
      inputs: {
        operationInputBang: {
          id: generateId('SUM_INPUT_BANG'),
          dataType: TypeOfData.Boolean,
          hint: 'Sum input (Bang) | boolean',
        },
        operationInput1: {
          id: generateId('SUM_INPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Sum input #1 | number',
        },
        operationInput2: {
          id: generateId('SUM_INPUT_2'),
          dataType: TypeOfData.Number,
          hint: 'Sum input #2 | number',
        },
      },
      outputs: {
        operationOutput: {
          id: generateId('SUM_OUTPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Sum output | number',
        },
      },
    };
  },
  get [NodeTypes.Subtract]() {
    return {
      name: NodeTypes.Subtract,
      category: NodeCategories.Math,
      inputs: {
        operationInputBang: {
          id: generateId('SUBTRACT_INPUT_BANG'),
          dataType: TypeOfData.Boolean,
          hint: 'Subtract input (Bang) | boolean',
        },
        operationInput1: {
          id: generateId('SUBTRACT_INPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Subtract input #1 | number',
        },
        operationInput2: {
          id: generateId('SUBTRACT_INPUT_2'),
          dataType: TypeOfData.Number,
          hint: 'Subtract input #2 | number',
        },
      },
      outputs: {
        operationOutput: {
          id: generateId('SUBTRACT_OUTPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Subtract output | number',
        },
      },
    };
  },
  get [NodeTypes.Divide]() {
    return {
      name: NodeTypes.Divide,
      category: NodeCategories.Math,
      inputs: {
        operationInputBang: {
          id: generateId('DIVIDE_INPUT_BANG'),
          dataType: TypeOfData.Boolean,
          hint: 'Divide input (Bang) | boolean',
        },
        operationInput1: {
          id: generateId('DIVIDE_INPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Divide input #1 | number',
        },
        operationInput2: {
          id: generateId('DIVIDE_INPUT_2'),
          dataType: TypeOfData.Number,
          hint: 'Divide input #2 | number',
        },
      },
      outputs: {
        operationOutput: {
          id: generateId('DIVIDE_OUTPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Divide output | number',
        },
      },
    };
  },
  get [NodeTypes.Multiply]() {
    return {
      name: NodeTypes.Multiply,
      category: NodeCategories.Math,
      inputs: {
        operationInputBang: {
          id: generateId('MULTIPLY_INPUT_BANG'),
          dataType: TypeOfData.Boolean,
          hint: 'Multiply input (Bang) | boolean',
        },
        operationInput1: {
          id: generateId('MULTIPLY_INPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Multiply input #1 | number',
        },
        operationInput2: {
          id: generateId('MULTIPLY_INPUT_2'),
          dataType: TypeOfData.Number,
          hint: 'Multiply input #2 | number',
        },
      },
      outputs: {
        operationOutput: {
          id: generateId('MULTIPLY_OUTPUT_1'),
          dataType: TypeOfData.Number,
          hint: 'Multiply output | number',
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
        },
      },
      outputs: {},
    };
  },
  get [NodeTypes.Sine]() {
    return {
      name: NodeTypes.Sine,
      category: NodeCategories.Audio,
      module: new Oscillator(DEFAULT_FREQ, OscTypes.Sine),
      inputs: {
        oscillatorFrequencyInput: {
          id: generateId(`SINE_OSCILLATOR_FREQUENCY_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator frequency input | number',
        },
        oscillatorDetuneInput: {
          id: generateId(`SINE_OSCILLATOR_DETUNE_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator detune input | number',
        },
        oscillatorPartialsInput: {
          id: generateId(`SINE_OSCILLATOR_PARTIALS_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator detune input | number',
        },
        oscillatorPhaseInput: {
          id: generateId(`SINE_OSCILLATOR_PHASE_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator phase input | number',
        },
        oscillatorVolumeInput: {
          id: generateId(`SINE_OSCILLATOR_VOLUME_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator volume input | number',
        },
      },
      outputs: {
        oscillatorAudioOutput: {
          id: generateId(`SINE_OSCILLATOR_${AUDIO_HANDLE_IDENTITY}_OUTPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Oscillator audio output | audio',
        },
      },
    };
  },
  get [NodeTypes.Triangle]() {
    return {
      name: NodeTypes.Triangle,
      category: NodeCategories.Audio,
      module: new Oscillator(DEFAULT_FREQ, OscTypes.Triangle),
      inputs: {
        oscillatorFrequencyInput: {
          id: generateId(`TRIANGLE_OSCILLATOR_FREQUENCY_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator frequency input | number',
        },
        oscillatorDetuneInput: {
          id: generateId(`TRIANGLE_OSCILLATOR_DETUNE_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator detune input | number',
        },
        oscillatorPartialsInput: {
          id: generateId(`TRIANGLE_OSCILLATOR_PARTIALS_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator detune input | number',
        },
        oscillatorPhaseInput: {
          id: generateId(`TRIANGLE_OSCILLATOR_PHASE_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator phase input | number',
        },
        oscillatorVolumeInput: {
          id: generateId(`TRIANGLE_OSCILLATOR_VOLUME_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator volume input | number',
        },
      },
      outputs: {
        oscillatorAudioOutput: {
          id: generateId(`TRIANGLE_OSCILLATOR_${AUDIO_HANDLE_IDENTITY}_OUTPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Oscillator audio output | audio',
        },
      },
    };
  },
  get [NodeTypes.Sawtooth]() {
    return {
      name: NodeTypes.Sawtooth,
      category: NodeCategories.Audio,
      module: new Oscillator(DEFAULT_FREQ, OscTypes.Sawtooth),
      inputs: {
        oscillatorFrequencyInput: {
          id: generateId(`SAWTOOTH_OSCILLATOR_FREQUENCY_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator frequency input | number',
        },
        oscillatorDetuneInput: {
          id: generateId(`SAWTOOTH_OSCILLATOR_DETUNE_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator detune input | number',
        },
        oscillatorPartialsInput: {
          id: generateId(`SAWTOOTH_OSCILLATOR_PARTIALS_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator detune input | number',
        },
        oscillatorPhaseInput: {
          id: generateId(`SAWTOOTH_OSCILLATOR_PHASE_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator phase input | number',
        },
        oscillatorVolumeInput: {
          id: generateId(`SAWTOOTH_OSCILLATOR_VOLUME_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator volume input | number',
        },
      },
      outputs: {
        oscillatorAudioOutput: {
          id: generateId(`OSCILLATOR_${AUDIO_HANDLE_IDENTITY}_OUTPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Oscillator audio output | audio',
        },
      },
    };
  },
  get [NodeTypes.Square]() {
    return {
      name: NodeTypes.Square,
      category: NodeCategories.Audio,
      module: new Oscillator(DEFAULT_FREQ, OscTypes.Square),
      inputs: {
        oscillatorFrequencyInput: {
          id: generateId(`SQUARE_OSCILLATOR_FREQUENCY_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator frequency input | number',
        },
        oscillatorDetuneInput: {
          id: generateId(`SQUARE_OSCILLATOR_DETUNE_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator detune input | number',
        },
        oscillatorPartialsInput: {
          id: generateId(`SQUARE_OSCILLATOR_PARTIALS_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator detune input | number',
        },
        oscillatorPhaseInput: {
          id: generateId(`SQUARE_OSCILLATOR_PHASE_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator phase input | number',
        },
        oscillatorVolumeInput: {
          id: generateId(`SQUARE_OSCILLATOR_VOLUME_INPUT`),
          dataType: TypeOfData.Number,
          hint: 'Oscillator volume input | number',
        },
      },
      outputs: {
        oscillatorAudioOutput: {
          id: generateId(`SQUARE_OSCILLATOR_${AUDIO_HANDLE_IDENTITY}_OUTPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Oscillator audio output | audio',
        },
      },
    };
  },
} as const;
