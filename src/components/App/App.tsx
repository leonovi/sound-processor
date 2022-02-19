import React, { FC, useContext, useState } from 'react';
import { AudioContext } from 'context/AudioContext';
// import { Menu } from 'components/Menu/Menu';

import './App.css';

const App: FC = () => {
  const audioContext = useContext(AudioContext);

  if (!audioContext) {
    return <div></div>;
  }

  const [isPlaying, setPlaying] = useState(false);

  const onClick = () => {
    const noiseProcessorNode = new AudioWorkletNode(audioContext!, 'noise-processor');
    noiseProcessorNode.connect(audioContext?.destination!);
    setPlaying(true);

    setTimeout(() => {
      noiseProcessorNode.disconnect();
      setPlaying(false);
    }, 500);
  };

  return (
    <div className="app">
      {/* <Menu /> */}
      <button onClick={onClick}>{isPlaying ? 'stop' : 'start'}</button>
    </div>
  );
};

export { App };
