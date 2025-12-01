// src/pages/ProductDetailPage.jsx

import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components'; // Styled-components
import { toast } from 'react-toastify'; // Toastify

import { CarritoContext } from '../context/CarritoContext';
import { useProductsContext } from '../context/ProductsContext';
import { FaCartPlus, FaArrowLeft } from 'react-icons/fa'; // Iconos

// --- Styled Component (Requerimiento PDF) ---
const BotonCompra = styled.button`
  background-color: #ff5733;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #c70039;
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }
`;

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { products, isLoading } = useProductsContext();

  // Buscar producto
  const product = products.find(p => p.id == id);

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return !isNaN(numericPrice) 
      ? numericPrice.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) 
      : 'N/A';
  };

  if (isLoading) return <div className="text-center mt-5">Cargando detalle...</div>;
  if (!product) return <div className="container mt-5 alert alert-danger">Producto no encontrado</div>;

  const handleAddToCart = () => {
    const itemParaCarrito = {
      id: product.id,
      name: product.nombre,
      price: product.precio,
      image: product.image
    };
    agregarAlCarrito(itemParaCarrito);
    
    // Notificación visual con React Toastify (Requerimiento PDF)
    toast.success(`¡${product.nombre} agregado al carrito!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <>
      {/* SEO Dinámico */}
      <Helmet>
        <title>{product.nombre} | Detalles</title>
        <meta name="description" content={`Compra ${product.nombre} por solo ${formatPrice(product.precio)}.`} />
      </Helmet>

      <div className="container mt-5 mb-5">
        <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Volver
        </button>

        <div className="row shadow p-4 bg-white rounded align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img 
              src={product.image || 'https://via.placeholder.com/400'} 
              alt={product.nombre} 
              className="img-fluid rounded shadow-sm w-100" 
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="fw-bold display-5">{product.nombre}</h2>
            <p className="text-muted mt-3 fs-5">
              {product.description || "Descripción detallada del producto. Calidad garantizada y envío rápido a todo el país."}
            </p>
            <h3 className="text-success my-3 fw-bold">{formatPrice(product.precio)}</h3>
            
            {/* Uso del Styled Component */}
            <BotonCompra onClick={handleAddToCart}>
              <FaCartPlus size={20} /> Agregar al Carrito
            </BotonCompra>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;