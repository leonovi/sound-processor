import React, { FC, useState } from 'react';

import { UserGestureHandler } from 'components/UserGestureHandler/UserGestureHandler';
import { AudioContextProvider } from 'components/AudioContextProvider/AudioContextProvider';
import { VolumeWarning } from 'components/VolumeWarning/VolumeWarning';

import './App.css';

const App: FC = () => {
  const [wasThereUserGesture, setWasThereUserGesture] = useState(false);

  const content = wasThereUserGesture ? (
    <AudioContextProvider>Hello</AudioContextProvider>
  ) : (
    <UserGestureHandler onClick={() => setWasThereUserGesture(true)}>
      <VolumeWarning />
    </UserGestureHandler>
  );

  return <div className="app">{content}</div>;
};

export { App };
