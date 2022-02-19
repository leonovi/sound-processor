import React, { FC, useEffect, useMemo, useState } from 'react';
import { AudioContext } from 'context/AudioContext';
import { buildWorkletUrl } from 'utils/buildWorkletUrl';

const noiseProcessorWorkletUrl = buildWorkletUrl(
  '../../worklets/noise-processor.worklet.ts',
  'noiseProcessor'
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
        audioContext.audioWorklet.addModule(noiseProcessorWorkletUrl),
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

export { AudioContextProvider };
