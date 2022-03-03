import { ProcessorsMessages } from 'worklets/models/ProcessorMessages';

const isStopMessage = (message: string): boolean =>
  message === ProcessorsMessages.STOP;

export { isStopMessage };
