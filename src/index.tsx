import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { App } from 'components/App/App';
import { AudioContextProvider } from 'components/AudioContextProvider/AudioContextProvider';

ReactDOM.render((
  <AudioContextProvider>
    <App />
  </AudioContextProvider>
), document.querySelector('#root'));
