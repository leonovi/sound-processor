import { WorkletMessage } from 'utils/worklet/sendMessage';
import { ProcessorsMessages } from 'worklets/models/ProcessorMessages';
import { OscillatorTypes } from 'worklets/oscillator-processor/oscillator-processor.models';

const changeOscillatorType = (type: OscillatorTypes): WorkletMessage => ({
  type: ProcessorsMessages.OSCILLATOR.CHANGE_TYPE,
  payload: type,
});

export { changeOscillatorType };
