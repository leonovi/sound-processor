import { useTime } from 'context/AudioContext';
import { DependencyList, useEffect } from 'react';
import { isAudioWorklet } from 'utils/worklet/isAudioWorklet';

const useChangeParameter = (
  {
    module,
    parameter,
    value,
  }: {
    module: AudioNode | null;
    parameter: string;
    value: number;
  },
  deps: DependencyList
) => {
  const currentTime = useTime();
  useEffect(() => {
    if (isAudioWorklet(module)) {
      module.parameters.get(parameter).setValueAtTime(value, currentTime);
    }
  }, deps);
};

export { useChangeParameter };
