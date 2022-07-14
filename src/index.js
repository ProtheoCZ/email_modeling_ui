import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {SigmaGraph} from "./SigmaGraph";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <SigmaGraph/>
      <App/>
  </React.StrictMode>
);

