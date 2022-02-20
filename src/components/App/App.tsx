import React, { FC, useState } from 'react';

import { UserGestureHandler } from 'components/UserGestureHandler/UserGestureHandler';
import { AudioContext } from 'components/AudioContext/AudioContext';
import { VolumeWarning } from 'components/VolumeWarning/VolumeWarning';
import { AudioNodes } from 'components/AudioNodes/AudioNodes';

const App: FC = () => {
  const [wasThereUserGesture, setWasThereUserGesture] = useState(false);

  if (!wasThereUserGesture) {
    return (
      <UserGestureHandler onClick={() => setWasThereUserGesture(true)}>
        <VolumeWarning />
      </UserGestureHandler>
    );
  }

  return (
    <AudioContext>
      <AudioNodes />
    </AudioContext>
  );
};

export { App };
