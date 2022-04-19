import React, { FC, useEffect, useState } from 'react';
import b_ from 'b_';
import './BiquadFilter.css';
import { Node } from 'components/Node/Node';
import { BiquadFilterNodeT } from './BiquadFilter.models';
import { first } from 'utils/first';
import { useConnection } from 'hooks/useConnection';
import { Select } from 'components/Select/Select';

const filterTypes: Array<BiquadFilterType> = [
  'allpass',
  'bandpass',
  'highpass',
  'highshelf',
  'lowpass',
  'lowshelf',
  'notch',
  'peaking',
];

const b = b_.with('biquad-filter-node');

const BiquadFilter: FC<BiquadFilterNodeT> = ({ data }) => {
  const {
    inputs: { biquadFilterFrequencyInput, biquadFilterQInput },
    module,
  } = data.config;

  const [selectedType, setSelectedType] = useState(first(filterTypes));
  useEffect(() => {
    module.type = selectedType;
  }, [selectedType]);

  useConnection(biquadFilterFrequencyInput.id, (value) => {
    module.frequency.rampTo(value, 0.2 /* RAMP_TIME */);
  });

  useConnection(biquadFilterQInput.id, (value) => {
    module.Q.rampTo(value, 0.2 /* RAMP_TIME */);
  });

  return (
    <Node className={b()} {...data.config}>
      <Select<BiquadFilterType>
        className={b('select')}
        options={filterTypes}
        selected={selectedType}
        onChange={(type) => setSelectedType(type)}
      />
    </Node>
  );
};

export { BiquadFilter };
