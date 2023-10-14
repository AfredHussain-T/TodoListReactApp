import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import {App} from './components';
import {ToastProvider} from 'react-toast-notifications'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ToastProvider autoDismiss autoDismissTimeout={3000} placement='top-left'>
      <App />
    </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);


