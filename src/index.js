import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App_old from './App_old';
import {SigmaGraph} from "./SigmaGraph";
import {App} from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App/>
      {/*<SigmaGraph/>*/}
  </React.StrictMode>
);

