import { STOP_MESSAGE } from 'worklets/Processor/Processor.models';

class Processor extends AudioWorkletProcessor {
  running: boolean;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    this.running = true;
    this.port.onmessage = ({ data: message }) => {
      if (message === STOP_MESSAGE) {
        this.running = false;
      }
    };
  }
}

export { Processor };
