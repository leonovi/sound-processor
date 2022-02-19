import React, { FC } from 'react';
import './VolumeWarning.css';

const VolumeWarning: FC = () => {
  return (
    <span className="volume-warning">
      The app works with sound, please turn down the volume of your speakers or
      other audio device. If you are sure that you are ready to continue using,
      just <span className="volume-warning__accent-word">click</span> anywhere
      on the screen.
    </span>
  );
};

export { VolumeWarning };
