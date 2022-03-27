import React, { FC, useEffect, useMemo, useState } from 'react';
import { AudioContext } from 'context/AudioContext';

// import { WorkerUrl } from 'worker-url';

// const someProcessorUrl = new WorkerUrl(
//   new URL(
//     '../../worklets/someProcessor/someProcessor.worklet.ts',
//     import.meta.url
//   ),
//   {
//     name: SOME_PROCESSOR_NAME,
//   }
// );

const AudioContextProvider: FC = ({ children }) => {
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const audioContext = useMemo(() => new window.AudioContext(), []);

  useEffect(() => {
    if (!audioContext) {
      return;
    }

    const loadAudioWorklets = async () => {
      await Promise.all([
        // audioContext.audioWorklet.addModule(someProcessorUrl),
      ]);

      setShouldShowLoader(false);
    };

    setShouldShowLoader(true);
    loadAudioWorklets();
  }, [audioContext]);

  if (shouldShowLoader) {
    return null; // TODO make loader
  }

  return (
    <AudioContext.Provider value={audioContext}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContextProvider as AudioContext };
