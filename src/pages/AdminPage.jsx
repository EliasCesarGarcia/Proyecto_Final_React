// src/pages/AdminPage.jsx

import React, { useState } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import FormularioProducto from '../components/FormularioProducto';
import '../styles/AdminPage.css'; // Crearemos este archivo de estilos

function AdminPage() {
  // Obtenemos los productos y las funciones del contexto.
  const { products, eliminarProducto, isLoading, error } = useProductsContext();
  
  // Estado para saber si el formulario está visible.
  const [formularioVisible, setFormularioVisible] = useState(false);
  // Estado para guardar el producto que se va a editar.
  const [productoAEditar, setProductoAEditar] = useState(null);

  // Función para abrir el formulario en modo EDICIÓN.
  const handleEditar = (producto) => {
    setProductoAEditar(producto);
    setFormularioVisible(true);
  };

  // Función para abrir el formulario en modo AGREGAR.
  const handleAgregar = () => {
    setProductoAEditar(null); // Nos aseguramos de que no haya ningún producto seleccionado.
    setFormularioVisible(true);
  };

  // Función para cerrar el formulario.
  const handleFinalizar = () => {
    setFormularioVisible(false);
    setProductoAEditar(null);
  };

  if (isLoading) return <p>Cargando productos...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-page">
      <h2>Panel de Administración</h2>

      {/* Si el formulario está visible, lo mostramos. Si no, mostramos la lista de productos. */}
      {formularioVisible ? (
        <FormularioProducto 
          productoAEditar={productoAEditar} 
          alFinalizar={handleFinalizar} 
        />
      ) : (
        <>
          <button onClick={handleAgregar} className="btn btn-add btn-agregar-nuevo">
            + Agregar Nuevo Producto
          </button>
          
          <table className="admin-product-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>${parseFloat(product.precio).toFixed(2)}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEditar(product)} className="btn btn-edit">
                        Editar
                      </button>
                      <button onClick={() => eliminarProducto(product.id)} className="btn btn-delete">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AdminPage;