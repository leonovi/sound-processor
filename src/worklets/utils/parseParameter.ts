import { first } from 'utils/first';

type WorkletParameter = {
  value: any;
};

const parseParameter = (
  parameter: string,
  parameters: Record<string, Float32Array>
): WorkletParameter => ({
  value: first(parameters[parameter]),
});

export { parseParameter };
