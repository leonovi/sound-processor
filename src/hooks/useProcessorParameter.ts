import { useEffect } from 'react';
import { useTime } from 'context/AudioContext';
import { isAudioWorklet } from 'utils/isAudioWorklet';

const useProcessorParameter = ({
  name,
  module,
  value,
}: {
  name: string;
  module: AudioNode | null;
  value: any;
}) => {
  const currentTime = useTime();
  useEffect(() => {
    if (!isAudioWorklet(module)) {
      return;
    }

    console.log(value);

    module.parameters.get(name).setValueAtTime(value, currentTime);
  }, [value]);
};

export { useProcessorParameter };
