import React, { FC, useState } from 'react';

import { UserGestureHandler } from 'components/UserGestureHandler/UserGestureHandler';
import { AudioContext } from 'components/AudioContext/AudioContext';
import { VolumeWarning } from 'components/VolumeWarning/VolumeWarning';
import { PopperMenuContext } from 'components/PopperMenuContext/PopperMenuContext';
import { Flow } from 'components/Flow/Flow';

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
      <PopperMenuContext>
        <Flow />
      </PopperMenuContext>
    </AudioContext>
  );
};

export { App };
