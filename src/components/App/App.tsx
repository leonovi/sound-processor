import React, { FC, useContext } from 'react';
import { AudioContext } from 'context/AudioContext';
import { Menu } from 'components';

const App: FC = () => {
  const audioContext = useContext(AudioContext)

  console.log(audioContext);

  return (
    <div><Menu /></div>
  );
};

export default App;
