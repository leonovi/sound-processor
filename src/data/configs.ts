import {
  Analyser,
  AnalyserType,
  getDestination,
  Noise,
  Oscillator,
  BiquadFilter,
} from 'tone';
import { generateId } from 'utils/generateId';
import { TypeOfData, NodeCategories, NodeTypes } from 'components/Nodes/models';

export const AUDIO_HANDLE_IDENTITY = 'AUDIO';

enum OscTypes {
  Sine = 'sine',
  Triangle = 'triangle',
  Sawtooth = 'sawtooth',
  Square = 'square',
}

const DEFAULT_FREQ = 333;

const OSC_OPTIONS = {
  [NodeTypes.Sine]: [DEFAULT_FREQ, OscTypes.Sine],
  [NodeTypes.Triangle]: [DEFAULT_FREQ, OscTypes.Triangle],
  [NodeTypes.Sawtooth]: [DEFAULT_FREQ, OscTypes.Sawtooth],
  [NodeTypes.Square]: [DEFAULT_FREQ, OscTypes.Square],
};

const generateOscConfig = (
  type:
    | NodeTypes.Sine
    | NodeTypes.Triangle
    | NodeTypes.Sawtooth
    | NodeTypes.Square
) => ({
  name: type,
  category: NodeCategories.Audio,
  module: new Oscillator(...OSC_OPTIONS[type]),
  inputs: {
    frequency: {
      id: generateId(`${type.toUpperCase()}_OSCILLATOR_FREQUENCY_INPUT`),
      name: 'Freq',
      dataType: TypeOfData.Number,
      hint: 'Oscillator frequency input | number',
    },
    detune: {
      id: generateId(`${type.toUpperCase()}_OSCILLATOR_DETUNE_INPUT`),
      name: 'Detune',
      dataType: TypeOfData.Number,
      hint: 'Oscillator detune input | number',
    },
    partials: {
      id: generateId(`${type.toUpperCase()}_OSCILLATOR_PARTIALS_INPUT`),
      name: 'Partials',
      dataType: TypeOfData.Number,
      hint: 'Oscillator detune input | number',
    },
    phase: {
      id: generateId(`${type.toUpperCase()}_OSCILLATOR_PHASE_INPUT`),
      name: 'Phase',
      dataType: TypeOfData.Number,
      hint: 'Oscillator phase input | number',
    },
    volume: {
      id: generateId(`${type.toUpperCase()}_OSCILLATOR_VOLUME_INPUT`),
      dataType: TypeOfData.Number,
      name: 'Vol',
      hint: 'Oscillator volume input | number',
    },
  },
  outputs: {
    oscillatorAudioOutput: {
      id: generateId(
        `${type.toUpperCase()}_OSCILLATOR_${AUDIO_HANDLE_IDENTITY}_OUTPUT`
      ),
      dataType: TypeOfData.Audio,
      hint: 'Oscillator audio output | audio',
    },
  },
});

const ANALYZER_OPTIONS: [AnalyserType, number] = ['waveform', 256];

export enum NoiseTypes {
  White = 'white',
  Brown = 'brown',
  Pink = 'pink',
};

const DEFAULT_NOISE = NoiseTypes.White;

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
    return generateOscConfig(NodeTypes.Sine);
  },
  get [NodeTypes.Triangle]() {
    return generateOscConfig(NodeTypes.Triangle);
  },
  get [NodeTypes.Sawtooth]() {
    return generateOscConfig(NodeTypes.Sawtooth);
  },
  get [NodeTypes.Square]() {
    return generateOscConfig(NodeTypes.Square);
  },
  get [NodeTypes.Analyser]() {
    return {
      name: NodeTypes.Analyser,
      category: NodeCategories.Audio,
      module: new Analyser(...ANALYZER_OPTIONS),
      inputs: {
        analyzerInput: {
          id: generateId(`ANALYSER_INPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Analyser input | audio',
        },
      },
      outputs: {
        analyzerOutput: {
          id: generateId(`ANALYSER_OUTPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Analyser output | audio',
        },
      },
    };
  },
  get [NodeTypes.Noise]() {
    return {
      name: NodeTypes.Noise,
      category: NodeCategories.Audio,
      module: new Noise(DEFAULT_NOISE),
      inputs: {
        noiseRateInput: {
          id: generateId(`NOISE_RATE_INPUT`),
          name: 'Rate',
          dataType: TypeOfData.Number,
          hint: 'Noise rate input | number',
        },
      },
      outputs: {
        analyzerOutput: {
          id: generateId(`NOISE_OUTPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Noise output | audio',
        },
      },
    }
  },
  get [NodeTypes.BiquadFilter]() {
    return {
      name: NodeTypes.BiquadFilter,
      category: NodeCategories.Audio,
      module: new BiquadFilter(),
      inputs: {
        biquadFilterInput: {
          id: generateId(`BIQUAD_FILTER_INPUT`),
          name: 'In',
          dataType: TypeOfData.Audio,
          hint: 'Filter input | audio',
        },
        biquadFilterFrequencyInput: {
          id: generateId(`BIQUAD_FILTER_FREQ_INPUT`),
          name: 'Freq',
          dataType: TypeOfData.Number,
          hint: 'Filter input frequency | number',
        },
        biquadFilterQInput: {
          id: generateId(`BIQUAD_FILTER_Q_INPUT`),
          name: 'Q',
          dataType: TypeOfData.Number,
          hint: 'Filter input Q | number',
        },
      },
      outputs: {
        biquadFilterOutput: {
          id: generateId(`BIQUAD_FILTER_OUTPUT`),
          dataType: TypeOfData.Audio,
          hint: 'Filter output | audio',
        },
      },
    };
  },
} as const;
