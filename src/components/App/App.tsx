import React, { FC, useState } from 'react';

import { UserGestureHandler } from 'components/UserGestureHandler/UserGestureHandler';
import { VolumeWarning } from 'components/VolumeWarning/VolumeWarning';
import { PopperMenuContext } from 'components/PopperMenuContext/PopperMenuContext';
import { NotificationsContext } from 'components/NotificationsContext/NotificationsContext';
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
    <PopperMenuContext>
      <NotificationsContext>
        <Flow />
      </NotificationsContext>
    </PopperMenuContext>
  );
};

export { App };
