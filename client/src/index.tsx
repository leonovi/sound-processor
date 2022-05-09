import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { RouterConfig } from 'components/RouterConfig';

ReactDOM.render(
  <BrowserRouter children={<RouterConfig />} />,
  document.querySelector('#root')
);
