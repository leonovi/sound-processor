import { Source, Node } from 'components/Flow/Flow.models';
import { useTime } from 'context/AudioContext';
import { useEffect } from 'react';
import { clamp } from 'utils/clamp';
import { isUndefined } from 'utils/isUndefined';
import { isAudioWorklet } from 'utils/isAudioWorklet';

const extractValue = (node: Node<Source<any>> | undefined) => node?.data?.value;

const useParameter = ({
  name,
  module,
  state: [value, setValue],
  minValue,
  maxValue,
  input,
}: {
  name: string;
  module: AudioNode | null;
  state: [any, React.Dispatch<React.SetStateAction<any>>];
  minValue: number;
  maxValue: number;
  input: Node<any> | undefined;
}) => {
  const currentTime = useTime();

  useEffect(() => {
    const value = extractValue(input);
    if (isUndefined(value)) {
      return;
    }

    setValue(
      typeof value === 'number' ? clamp(value, minValue, maxValue) : value
    );
  }, [input]);

  useEffect(() => {
    if (isAudioWorklet(module)) {
      module.parameters.get(name).setValueAtTime(value, currentTime);
    }
  }, [value]);
};

export { useParameter };
