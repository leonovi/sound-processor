import React, { FC, useEffect, useMemo, useState } from 'react';
import { AudioContext } from 'context/AudioContext';
import { WorkerUrl } from 'worker-url';

const noiseProcessorUrl = new WorkerUrl(
  new URL('../../worklets/noise-processor.worklet.ts', import.meta.url),
  {
    name: 'noise-processor',
  }
);

const AudioContextProvider: FC = ({ children }) => {
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const audioContext = useMemo(() => {
    return new window.AudioContext();
  }, []);

  useEffect(() => {
    if (!audioContext) {
      return;
    }

    const loadAudioWorklets = async () => {
      await Promise.all([
        audioContext.audioWorklet.addModule(noiseProcessorUrl),
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
