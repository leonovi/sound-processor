enum NodeCategories {
  Math = 'Math',
  Utilities = 'Utilities',
}

export enum NodeTypes {
  Sum = 'Sum',
  Number = 'Number',
  Bang = 'Bang',
  Metro = 'Metro'
}

const propsData = new Map([
  [
    NodeTypes.Sum,
    {
      name: NodeTypes.Sum,
      category: NodeCategories.Math,
      inputs: [{ id: 'SUM_INPUT_1', hint: 'Sum input #1 | number' }, { id: 'SUM_INPUT_2', hint: 'Sum input #2 | number' }],
      outputs: [{ id: 'SUM_OUTPUT_1' }],
    },
  ],
  [
    NodeTypes.Number,
    {
      name: NodeTypes.Number,
      category: NodeCategories.Math,
      inputs: [{ id: 'NUMBER_INPUT' }],
      outputs: [{ id: 'NUMBER_OUTPUT' }],
    },
  ],
  [
    NodeTypes.Bang,
    {
      name: NodeTypes.Bang,
      category: NodeCategories.Utilities,
      inputs: [{ id: 'BANG_INPUT' }],
      outputs: [{ id: 'BANG_OUTPUT' }],
    },
  ],
  [
    NodeTypes.Metro,
    {
      name: NodeTypes.Metro,
      category: NodeCategories.Utilities,
      inputs: [{ id: 'METRO_INPUT' }],
      outputs: [{ id: 'METRO_OUTPUT' }],
    },
  ],
]);

export { propsData };
