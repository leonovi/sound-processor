import { ProcessorMessages } from "utils/processorMessages";

const startModule = (module: AudioWorkletNode): void => {
  module.port.postMessage(ProcessorMessages.START);
};

export { startModule };
