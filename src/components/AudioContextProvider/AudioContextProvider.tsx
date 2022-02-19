import React, { FC, useEffect, useMemo, useState } from 'react';
import { AudioContext } from 'context/AudioContext';

import { WorkerUrl } from 'worker-url';

const noiseProcessorWorkletUrl = new WorkerUrl(
  new URL('../../worklets/noise-processor.worklet.ts', import.meta.url),
  {
    name: 'noiseProcessor',
  }
);

const UserGestureHandler: FC<{ onClick: () => void }> = ({
  onClick,
  children,
}) => {
  return <div onClick={onClick}>{children}</div>;
};

const AudioContextProvider: FC = ({ children }) => {
  const [wasThereUserGesture, setWasThereUserGesture] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const audioContext = useMemo(() => {
    return wasThereUserGesture ? new window.AudioContext() : null;
  }, [wasThereUserGesture]);

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
    <UserGestureHandler onClick={() => setWasThereUserGesture(true)}>
      <AudioContext.Provider value={audioContext}>
        {children}
      </AudioContext.Provider>
    </UserGestureHandler>
  );
};

export { AudioContextProvider };
