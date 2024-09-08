import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { TableProvider } from './context/tableContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TableProvider>
      <App />
    </TableProvider>
  </React.StrictMode>
);
