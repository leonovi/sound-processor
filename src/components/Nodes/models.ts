export enum NodeCategories {
  Math = 'Math',
  Utilities = 'Utilities',
  Audio = 'Audio',
}

export enum NodeTypes {
  // Math
  Sum = 'Sum',
  Subtract = 'Subtract',
  Multiply = 'Multiply',
  Divide = 'Divide',
  Number = 'Number',
  // Utilities
  Bang = 'Bang',
  Metro = 'Metro',
  Switch = 'Switch',
  Defer = 'Defer',
  // Audio
  Sine = 'Sine',
  Triangle = 'Triangle',
  Sawtooth = 'Sawtooth',
  Square = 'Square',
  Destination = 'Destination',
  Analyser = 'Analyser',
  Noise = 'Noise',
  BiquadFilter = 'BiquadFilter',
}

export enum TypeOfData {
  Any = 'any',
  Boolean = 'boolean',
  Number = 'number',
  Audio = 'audio',
}
