export enum ProcessorMessages {
  START = 'start',
  STOP = 'stop',
}

const isStartMessage = (message: string): boolean =>
  message === ProcessorMessages.START;

const isStopMessage = (message: string): boolean =>
  message === ProcessorMessages.STOP;

export { isStartMessage, isStopMessage };
