// src/pages/HomePage.jsx

import React from 'react';
import { Helmet } from 'react-helmet-async'; // Requerimiento: SEO con Helmet
import ProductList from '../components/ProductList';
import { useProductsContext } from '../context/ProductsContext';
import { useSearch } from '../context/SearchContext';

function HomePage() {
  const { products, isLoading, error } = useProductsContext();
  const { busqueda } = useSearch(); 

  if (isLoading) return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  // Lógica de filtrado por búsqueda
  const productosFiltrados = products.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* Optimización SEO */}
      <Helmet>
        <title>Inicio | TiendaTech</title>
        <meta name="description" content="Descubre las mejores ofertas en tecnología. Computadoras, celulares y accesorios con envío a todo el país." />
        <meta name="keywords" content="tecnologia, ecommerce, react, computadoras" />
      </Helmet>

      <section className="container my-5">
        <h2 className="mb-4 text-center display-6 fw-bold">Nuestro Catálogo</h2>
        
        {productosFiltrados.length > 0 ? (
           // Pasamos los productos a ProductList, quien se encarga de la paginación
           <ProductList products={productosFiltrados} />
        ) : (
          <div className="alert alert-warning text-center p-4">
            <h4>No se encontraron productos</h4>
            <p>Intenta con otro término de búsqueda: "{busqueda}".</p>
          </div>
        )}
      </section>
    </>
  );
}

export default HomePage;