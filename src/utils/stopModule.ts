import { ProcessorMessages } from "utils/processorMessages";

const stopModule = (module: AudioWorkletNode): void => {
  module.port.postMessage(ProcessorMessages.STOP);
};

export { stopModule };
