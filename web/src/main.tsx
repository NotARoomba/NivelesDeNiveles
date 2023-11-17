import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/app-banner.css';
import Home from './tsx/pages/Home';
import Error from './tsx/pages/Error';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
