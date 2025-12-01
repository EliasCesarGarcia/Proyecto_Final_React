// src/App.jsx

import './styles/App.css'; 
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Contexts
import { CarritoProvider } from './context/CarritoContext';
import { SearchProvider } from './context/SearchContext';

// Librería de notificaciones (Toastify)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RutaProtegida from './components/RutaProtegida';
import Login from './components/Login'; 

import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <SearchProvider>
      <CarritoProvider>
        <div className="app-container">
          <Header />
          <Navbar />

          {/* Contenedor de notificaciones global */}
          <ToastContainer />

          <main className="main-content container-fluid">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/productos" element={<HomePage />} />
              <Route path="/productos/:id" element={<ProductDetailPage />} />
              <Route path="/login" element={<Login />} />

              <Route path="/carrito" element={<RutaProtegida><CartPage /></RutaProtegida>} />
              <Route path="/admin" element={<RutaProtegida><AdminPage /></RutaProtegida>} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </CarritoProvider>
    </SearchProvider>
  );
}

export default App;