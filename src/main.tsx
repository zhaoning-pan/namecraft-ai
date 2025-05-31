import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ReactGA from 'react-ga4';

// Initialize GA4
ReactGA.initialize('G-XXXXXXXX'); // 替换为您的 GA4 测量 ID

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
