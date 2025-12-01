import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Importamos HelmetProvider

// Importamos Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';

import './index.css';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);