export type WorkletMessage = {
  type: string;
  payload?: any;
};

const sendMessage = (
  module: AudioWorkletNode,
  message: WorkletMessage
): void => {
  module.port.postMessage(message);
};

export { sendMessage };
