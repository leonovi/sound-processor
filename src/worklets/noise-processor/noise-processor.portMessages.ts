import { WorkletMessage } from "utils/worklet/sendMessage";
import { ProcessorsMessages } from "worklets/models/ProcessorMessages";
import { NoiseTypes } from "worklets/noise-processor/noise-processor.models";

const changeNoiseType = (type: NoiseTypes): WorkletMessage => ({
  type: ProcessorsMessages.NOISE.CHANGE_TYPE,
  payload: type,
})

export { changeNoiseType };
