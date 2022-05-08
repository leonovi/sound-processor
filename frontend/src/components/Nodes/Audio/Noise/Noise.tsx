import React, { FC, useEffect, useState } from 'react';
import { isNumber } from 'tone';
import cn from 'classnames';
import b_ from 'b_';
import './Noise.css';
import { Node } from 'components/Node/Node';
import { NoiseNodeT, NoiseTypes } from './Noise.models';

import { useConnections } from 'store/useConnections';
import { Select } from 'components/Select/Select';
import { flattenProps } from 'utils/flattenProps';

const b = b_.with('noise-node');

const Noise: FC<NoiseNodeT> = ({ className, ...props }) => {
  const {
    config,
    methods,
    audioNode,
    inputs: { rate },
  } = flattenProps<NoiseNodeT>(props);

  useEffect(methods.executeAudioNode(audioNode), []);

  const { getSourceValue } = useConnections();

  const [noiseType, setNoiseType] = useState<NoiseTypes>(
    NoiseTypes.White
  );
  useEffect(() => {
    audioNode.type = noiseType;
  }, [noiseType]);

  const incRate = getSourceValue(rate.id);
  useEffect(() => {
    audioNode.playbackRate = isNumber(incRate)
      ? incRate
      : audioNode.playbackRate;
  }, [incRate]);

  return (
    <Node className={cn(b(), className)} config={config}>
      <Select<NoiseTypes>
        className={b('select')}
        options={Object.values(NoiseTypes)}
        selected={noiseType}
        onChange={(type) => setNoiseType(type)}
      />
    </Node>
  );
};

export { Noise };
