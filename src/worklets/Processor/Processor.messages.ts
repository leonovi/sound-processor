import { STOP_MESSAGE } from './Processor.models';

const sendStopMessage = (module: AudioWorkletNode) => {
  module.port.postMessage(STOP_MESSAGE);
};

export { sendStopMessage };
