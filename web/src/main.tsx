import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Home from './tsx/pages/Home';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>,
);
