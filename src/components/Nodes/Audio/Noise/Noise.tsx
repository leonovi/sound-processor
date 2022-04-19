import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './Noise.css';
import { Node } from 'components/Node/Node';
import { useConnection } from 'hooks/useConnection';
import { Select } from 'components/Select/Select';
import { NoiseNodeT } from './Noise.models';
import { NoiseTypes } from 'data/configs';

const b = b_.with('noise-node');

const Noise: FC<NoiseNodeT> = ({ type, data, className }) => {
  const {
    inputs: { noiseRateInput },
    module,
  } = data.config;

  const executeNoise = () => {
    module.start();
    return () => {
      module.stop();
    };
  };
  useEffect(executeNoise, []);

  const [noiseType, setNoiseType] = useState<NoiseTypes>(NoiseTypes.White);
  useEffect(() => {
    module.type = noiseType;
  }, [noiseType]);

  useConnection(noiseRateInput.id, (value) => (module.playbackRate = value));

  return (
    <Node className={cn(b(), className)} {...data.config}>
      <Select
        className={b('select')}
        options={Object.values(NoiseTypes)}
        selected={noiseType}
        onChange={(type) => setNoiseType(type)}
      />
    </Node>
  );
};

export { Noise };
