import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {SigmaGraph} from "./SigmaGraph";
import {GraphDropdown} from "./GraphDropdown";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <GraphDropdown></GraphDropdown>
      <SigmaGraph/>
      <App/>
  </React.StrictMode>
);

