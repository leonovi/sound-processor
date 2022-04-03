import { InputT } from 'components/Nodes/models';

const getInputId = (inputs: Array<InputT> | undefined, name: string) => {
  return inputs?.find((input) => input.name === name)?.id;
};

export { getInputId };
