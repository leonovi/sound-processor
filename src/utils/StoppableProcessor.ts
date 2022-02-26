import { ProcessorMessages } from "./processorMessages";

const isStopMessage = (message: string) => message === ProcessorMessages.STOP;

class StoppableProcessor extends AudioWorkletProcessor {
  running = true;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);
    this.port.onmessage = ({ data }) => isStopMessage(data) && this.stop();
  }

  stop() {
    this.running = false;
  }
}

export { StoppableProcessor };
