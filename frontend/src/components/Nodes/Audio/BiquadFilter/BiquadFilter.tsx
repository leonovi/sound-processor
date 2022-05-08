import React, { FC, useEffect, useState } from 'react';
import { isNumber } from 'tone';
import b_ from 'b_';
import './BiquadFilter.css';
import { Node } from 'components/Node/Node';
import { BiquadFilterNodeT } from './BiquadFilter.models';

import { useConnections } from 'store/useConnections';
import { Select } from 'components/Select/Select';
import { flattenProps } from 'utils/flattenProps';
import { RAMP_TIME } from 'utils/constants';

const b = b_.with('biquad-filter-node');

const BiquadFilter: FC<BiquadFilterNodeT> = (props) => {
  const {
    methods,
    config,
    audioNode,
    inputs: { frequency, Q },
  } = flattenProps<BiquadFilterNodeT>(props);

  const { getSourceValue } = useConnections();

  const [type, setType] =
    useState<BiquadFilterType>('lowpass');
  useEffect(() => {
    audioNode.type = type;
  }, [type]);

  const incFreq = getSourceValue(frequency.id);
  useEffect(() => {
    methods.setParam(audioNode.frequency, (param) =>
      param.rampTo(
        //@ts-ignore
        isNumber(incFreq) ? incFreq : param.defaultValue,
        RAMP_TIME
      )
    );
  }, [incFreq]);

  const incQ = getSourceValue(Q.id);
  useEffect(() => {
    methods.setParam(audioNode.Q, (param) =>
      param.rampTo(
        //@ts-ignore
        isNumber(incQ) ? incQ : param.defaultValue,
        RAMP_TIME
      )
    );
  }, [incFreq]);

  return (
    <Node className={b()} config={config}>
      <Select<BiquadFilterType>
        className={b('select')}
        options={[
          'allpass',
          'bandpass',
          'highpass',
          'highshelf',
          'lowpass',
          'lowshelf',
          'notch',
          'peaking',
        ]}
        selected={type}
        onChange={(type) => setType(type)}
      />
    </Node>
  );
};

export { BiquadFilter };
