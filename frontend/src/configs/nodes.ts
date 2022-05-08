import { NodeTypes } from 'components/Nodes/models';

import { createConfig as createNumberConfig } from 'components/Nodes/Math/Number/Number.config';
import { createConfig as createOperationConfig } from 'components/Nodes/Math/Operation/Operation.config';

import { createConfig as createBangConfig } from 'components/Nodes/Utilities/Bang/Bang.config';
import { createConfig as createDeferConfig } from 'components/Nodes/Utilities/Defer/Defer.config';
import { createConfig as createMetroConfig } from 'components/Nodes/Utilities/Metro/Metro.config';
import { createConfig as createSwitchConfig } from 'components/Nodes/Utilities/Switch/Switch.config';

import { createConfig as createAnalyserConfig } from 'components/Nodes/Audio/Analyser/Analyser.config';
import { createConfig as createBiquadFilterConfig } from 'components/Nodes/Audio/BiquadFilter/BiquadFilter.config';
import { createConfig as createDestinationConfig } from 'components/Nodes/Audio/Destination/Destination.config';
import { createConfig as createNoiseConfig } from 'components/Nodes/Audio/Noise/Noise.config';
import { createConfig as createOscillatorConfig } from 'components/Nodes/Audio/Oscillator/Oscillator.config';

export const nodesConfigs = {
  get [NodeTypes.Number]() {
    return createNumberConfig();
  },
  get [NodeTypes.Sum]() {
    return createOperationConfig(NodeTypes.Sum);
  },
  get [NodeTypes.Subtract]() {
    return createOperationConfig(NodeTypes.Subtract);
  },
  get [NodeTypes.Divide]() {
    return createOperationConfig(NodeTypes.Divide);
  },
  get [NodeTypes.Multiply]() {
    return createOperationConfig(NodeTypes.Multiply);
  },

  get [NodeTypes.Bang]() {
    return createBangConfig();
  },
  get [NodeTypes.Defer]() {
    return createDeferConfig();
  },
  get [NodeTypes.Metro]() {
    return createMetroConfig();
  },
  get [NodeTypes.Switch]() {
    return createSwitchConfig();
  },

  get [NodeTypes.Analyser]() {
    return createAnalyserConfig();
  },
  get [NodeTypes.BiquadFilter]() {
    return createBiquadFilterConfig();
  },
  get [NodeTypes.Destination]() {
    return createDestinationConfig();
  },
  get [NodeTypes.Noise]() {
    return createNoiseConfig();
  },
  get [NodeTypes.Sine]() {
    return createOscillatorConfig(NodeTypes.Sine);
  },
  get [NodeTypes.Triangle]() {
    return createOscillatorConfig(NodeTypes.Triangle);
  },
  get [NodeTypes.Sawtooth]() {
    return createOscillatorConfig(NodeTypes.Sawtooth);
  },
  get [NodeTypes.Square]() {
    return createOscillatorConfig(NodeTypes.Square);
  },
} as const;
