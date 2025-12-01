// src/components/ProductList.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaShoppingCart } from 'react-icons/fa'; // Iconos
import styled from 'styled-components'; // Requerimiento: Styled Components

// --- Styled Components para la Paginación ---
const PageButton = styled.button`
  background-color: ${props => props.$active ? '#007bff' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#007bff'};
  border: 2px solid #007bff;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
    color: #fff;
    border-color: #0056b3;
    transform: translateY(-2px);
  }
`;

function ProductList({ products }) {
  // --- Lógica de Paginación (Requerimiento Clase 14) ---
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6; // Cantidad de productos a mostrar por página

  // Calcular índices
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  
  // Obtener los productos de la página actual
  const productosActuales = products.slice(indicePrimerProducto, indiceUltimoProducto);

  // Calcular total de páginas
  const totalPaginas = Math.ceil(products.length / productosPorPagina);

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    // Opcional: Scrollear hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice)) {
      return numericPrice.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
      });
    }
    return 'Precio no disponible';
  };

  return (
    <div>
      {/* Sistema de Grillas de Bootstrap (Mobile-First) */}
      <div className="row">
        {productosActuales.map(product => (
          // Responsividad: 
          // col-12 (Móvil: 1 columna)
          // col-md-6 (Tablet: 2 columnas)
          // col-lg-4 (Escritorio: 3 columnas)
          <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              
              <img 
                src={product.image || 'https://via.placeholder.com/220'} 
                className="card-img-top product-image" 
                alt={product.nombre}
              />
              
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{product.nombre}</h5>
                <p className="card-text text-success fw-bold fs-5">
                  {formatPrice(product.precio)}
                </p>
                
                {/* Botón empujado al fondo con mt-auto */}
                <Link to={`/productos/${product.id}`} className="btn btn-primary mt-auto w-100 d-flex align-items-center justify-content-center gap-2">
                  <FaEye /> Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Controles de Paginación --- */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center my-5">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <PageButton
              key={index + 1}
              $active={paginaActual === index + 1}
              onClick={() => cambiarPagina(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;