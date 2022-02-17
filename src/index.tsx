import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { App, AudioContextProvider } from 'components';

ReactDOM.render((
  <AudioContextProvider>
    <App />
  </AudioContextProvider>
), document.querySelector('#root'));
