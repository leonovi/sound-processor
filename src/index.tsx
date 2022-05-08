import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './index.css';

import { App } from 'components/App/App';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="patch"
        element={<div>Patch is here</div>}
      />
      <Route
        path="account"
        element={<div>Account is here</div>}
      />
    </Routes>
  </BrowserRouter>,
  document.querySelector('#root')
);
