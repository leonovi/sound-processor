import React, { FC, useMemo, useState } from 'react';
import { AudioContext as Context } from 'context/AudioContext';

const UserGestureHandler: FC<{ onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return <div onClick={onClick}>{children}</div>;
};

const AudioContextProvider: FC = ({ children }) => {
  const [wasThereUserGesture, setWasThereUserGesture] = useState(false);

  const audioContext = useMemo(() => {
    return wasThereUserGesture ? new window.AudioContext() : null;
  }, [wasThereUserGesture]);

  return (
    <div>
      {wasThereUserGesture ? (
        <Context.Provider value={audioContext}>{children}</Context.Provider>
      ) : (
        <UserGestureHandler onClick={() => setWasThereUserGesture(true)}>
          {children}
        </UserGestureHandler>
      )}
    </div>
  );
};

export default AudioContextProvider;
