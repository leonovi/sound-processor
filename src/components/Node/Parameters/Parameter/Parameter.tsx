import React, { FC } from 'react';

import { ParameterProps } from 'components/Node/Parameters/Parameter/Parameter.models';
import { Channel } from 'components/Node/Channels/Channel/Channel';
import { TARGET_TYPE } from 'components/Node/Channels/Channel/Channel.models';
import { isUndefined } from 'utils/isUndefined';

import b_ from 'b_';
import './Parameter.css';

const b = b_.with('parameter');

const Parameter: FC<ParameterProps> = ({ controller, label, channel }) => (
  <div className={b()}>
    {!isUndefined(channel) && <Channel className={b('channel')} id={channel.id} type={TARGET_TYPE} />}
    {controller}
    <span className={b('label')}>{label}</span>
  </div>
);

export { Parameter };
