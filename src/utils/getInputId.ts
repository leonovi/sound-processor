import { InputT } from "components/Node/Node.models";

const getInputId = (inputs: Array<InputT> | undefined, name: string) => {
  return inputs?.find((input) => input.name === name)?.id;
};

export { getInputId };
