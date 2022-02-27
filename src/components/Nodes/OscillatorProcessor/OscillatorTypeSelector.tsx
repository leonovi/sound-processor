import React, { Dispatch, FC, useState } from 'react';
import { OscillatorTypes } from 'worklets/oscillator-processor/oscillator-processor.types';

import b_ from 'b_';
import './OscillatorTypeSelector.css';

const b = b_.with('oscillator-type-selector');

type OscillatorTypeSelectorPropsT = {
  oscillatorWave: OscillatorTypes;
  setOscillatorWave: Dispatch<React.SetStateAction<OscillatorTypes>>;
};

const oscillatorTypes = {
  SQUARE: {
    icon: 'square',
    wave: OscillatorTypes.SQUARE,
  },
  SAW: {
    icon: 'saw',
    wave: OscillatorTypes.SAW,
  },
  TRIANGLE: {
    icon: 'triangle',
    wave: OscillatorTypes.TRIANGLE,
  },
  SINE: {
    icon: 'sine',
    wave: OscillatorTypes.SINE,
  },
};

const OscillatorTypeSelector: FC<OscillatorTypeSelectorPropsT> = ({
  oscillatorWave,
  setOscillatorWave,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div
      className={b({ expanded: isExpanded })}
      onClick={() => setExpanded((isExpanded) => !isExpanded)}
    >
      <button
        key={oscillatorTypes.SQUARE.wave}
        className={b('type-button', { selected: oscillatorWave === OscillatorTypes.SQUARE })}
        onClick={() => setOscillatorWave(oscillatorTypes.SQUARE.wave)}
      >
        {oscillatorTypes.SQUARE.icon}
      </button>

      <button
        key={oscillatorTypes.SAW.wave}
        className={b('type-button', { selected: oscillatorWave === OscillatorTypes.SAW })}
        onClick={() => setOscillatorWave(oscillatorTypes.SAW.wave)}
      >
        {oscillatorTypes.SAW.icon}
      </button>

      <button
        key={oscillatorTypes.TRIANGLE.wave}
        className={b('type-button', { selected: oscillatorWave === OscillatorTypes.TRIANGLE })}
        onClick={() => setOscillatorWave(oscillatorTypes.TRIANGLE.wave)}
      >
        {oscillatorTypes.TRIANGLE.icon}
      </button>

      <button
        key={oscillatorTypes.SINE.wave}
        className={b('type-button', { selected: oscillatorWave === OscillatorTypes.SINE })}
        onClick={() => setOscillatorWave(oscillatorTypes.SINE.wave)}
      >
        {oscillatorTypes.SINE.icon}
      </button>

      <span className={b('arrow', { expanded: isExpanded })}>‣</span>
    </div>
  );
};

export { OscillatorTypeSelector };
