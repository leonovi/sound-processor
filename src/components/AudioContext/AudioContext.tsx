import React, { FC, useEffect, useMemo, useState } from 'react';
import { AudioContext } from 'context/AudioContext';
import { WorkerUrl } from 'worker-url';

import { NOISE_PROCESSOR_NAME } from 'worklets/NoiseProcessor/NoiseProcessor.models';
import { OSC_PROCESSOR_NAME } from 'worklets/OscillatorProcessor/OscillatorProcessor.models';
import { GAIN_PROCESSOR_NAME } from 'worklets/GainProcessor/GainProcessor.models';
import { CONSTANT_SOURCE_PROCESSOR_NAME } from 'worklets/ConstantSourceProcessor/ConstantSourceProcessor.models';

const noiseProcessorUrl = new WorkerUrl(
  new URL(
    '../../worklets/noiseProcessor/noiseProcessor.worklet.ts',
    import.meta.url
  ),
  {
    name: NOISE_PROCESSOR_NAME,
  }
);

const oscillatorProcessorUrl = new WorkerUrl(
  new URL(
    '../../worklets/oscillatorProcessor/oscillatorProcessor.worklet.ts',
    import.meta.url
  ),
  {
    name: OSC_PROCESSOR_NAME,
  }
);

const gainProcessorUrl = new WorkerUrl(
  new URL(
    '../../worklets/gainProcessor/gainProcessor.worklet.ts',
    import.meta.url
  ),
  {
    name: GAIN_PROCESSOR_NAME,
  }
);

const constantSourceProcessorUrl = new WorkerUrl(
  new URL(
    '../../worklets/ConstantSourceProcessor/ConstantSourceProcessor.worklet.ts',
    import.meta.url
  ),
  {
    name: CONSTANT_SOURCE_PROCESSOR_NAME,
  }
);

const AudioContextProvider: FC = ({ children }) => {
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const audioContext = useMemo(() => new window.AudioContext(), []);

  useEffect(() => {
    if (!audioContext) {
      return;
    }

    const loadAudioWorklets = async () => {
      await Promise.all([
        audioContext.audioWorklet.addModule(noiseProcessorUrl),
        audioContext.audioWorklet.addModule(oscillatorProcessorUrl),
        audioContext.audioWorklet.addModule(gainProcessorUrl),
        audioContext.audioWorklet.addModule(constantSourceProcessorUrl),
      ]);

      setShouldShowLoader(false);
    };

    setShouldShowLoader(true);
    loadAudioWorklets();
  }, [audioContext]);

  if (shouldShowLoader) {
    return null;
  }

  return (
    <AudioContext.Provider value={audioContext}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContextProvider as AudioContext };
