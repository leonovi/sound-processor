import { sendMessage } from 'utils/worklet/sendMessage';
import { stopModuleMessage } from 'worklets/models/ProcessorMessages';

const stopModule = (module: AudioWorkletNode): void => {
  sendMessage(module, stopModuleMessage());
};

export { stopModule };
