import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';
import { useSearch } from '../context/SearchContext'; // Contexto de búsqueda

// Importamos Iconos
import { FaShoppingCart, FaSearch, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useAuthContext();
  const { vaciarCarrito, carrito } = useContext(CarritoContext);
  const { busqueda, setBusqueda } = useSearch(); // Estado global de búsqueda

  const handleLogout = () => {
    logout();
    vaciarCarrito();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        {/* Logo / Brand */}
        <NavLink className="navbar-brand" to="/">TiendaTech</NavLink>

        {/* Botón colapso para móvil (Bootstrap) */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">Admin</NavLink>
            </li>
          </ul>

          {/* Barra de Búsqueda */}
          <div className="d-flex mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch color="#888" />
              </span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Buscar productos..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          {/* Controles de Usuario y Carrito */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <NavLink to="/carrito" className="btn btn-outline-light position-relative">
              <FaShoppingCart />
              {carrito.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carrito.length}
                </span>
              )}
            </NavLink>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-white"><FaUser /> {user}</span>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                  <FaSignOutAlt /> Salir
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-success btn-sm">
                <FaSignInAlt /> Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;