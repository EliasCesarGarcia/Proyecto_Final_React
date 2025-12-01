// src/context/ProductsContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Creación del Contexto
// Este objeto será el que los componentes consuman para obtener el estado y las funciones.
const ProductsContext = createContext();

// URL de la API (es una buena práctica tenerla en una constante)
const apiUrl = 'https://68e588b521dd31f22cc2078c.mockapi.io/productos';

// 2. Creación del Proveedor del Contexto
// Este componente envolverá a nuestra aplicación y proveerá el estado y las funciones.
export function ProductsProvider({ children, onActionSuccess, onActionError }) {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para manejar los tiempos de carga
  const [isLoading, setIsLoading] = useState(true);
  // Estado para manejar posibles errores en las peticiones
  const [error, setError] = useState(null);

  // useEffect para cargar los productos desde la API cuando el componente se monta.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('La respuesta del servidor no fue exitosa.');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Error al cargar productos. Inténtalo más tarde.");
        // Si hay un error, lo notificamos a través de la función del App.jsx
        if (onActionError) onActionError("Error al cargar productos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    // El array vacío [] como segundo argumento asegura que este efecto se ejecute solo una vez.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 
  // Deshabilitamos la advertencia del linter porque onActionError no debe ser una dependencia.


  // --- FUNCIONES CRUD (Create, Read, Update, Delete) ---

  // Función para AGREGAR un nuevo producto
  const agregarProducto = async (productoNuevo) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoNuevo),
      });

      if (!response.ok) throw new Error('Error al guardar el producto en la API.');
      
      const data = await response.json();
      // Actualizamos el estado local con el nuevo producto devuelto por la API.
      setProducts(prevProducts => [...prevProducts, data]);
      // Notificamos el éxito a través de la función del App.jsx
      if (onActionSuccess) onActionSuccess('¡Producto agregado con éxito!');
      
    } catch (err) {
      console.error("Error al agregar producto:", err);
      if (onActionError) onActionError("Hubo un problema al agregar el producto.");
    }
  };

  // Función para EDITAR un producto existente
  const editarProducto = async (productoEditado) => {
    try {
      const response = await fetch(`${apiUrl}/${productoEditado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditado),
      });

      if (!response.ok) throw new Error('Error al actualizar el producto en la API.');
      
      const data = await response.json();
      // Actualizamos el producto en la lista local.
      setProducts(prevProducts => 
        prevProducts.map(p => (p.id === data.id ? data : p))
      );
      if (onActionSuccess) onActionSuccess('¡Producto actualizado correctamente!');

    } catch (err) {
      console.error("Error al editar producto:", err);
      if (onActionError) onActionError("Hubo un problema al actualizar el producto.");
    }
  };

  // Función para ELIMINAR un producto
  const eliminarProducto = async (id) => {
    // Pedimos confirmación al usuario antes de proceder.
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el producto en la API.');

      // Filtramos el producto eliminado del estado local.
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      if (onActionSuccess) onActionSuccess('Producto eliminado correctamente.');

    } catch (err) {
      console.error("Error al eliminar producto:", err);
      if (onActionError) onActionError("Hubo un problema al eliminar el producto.");
    }
  };
  
  // 3. El valor que proveeremos a los componentes hijos
  const value = {
    products,
    isLoading,
    error,
    agregarProducto,
    editarProducto,
    eliminarProducto
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

// 4. Hook personalizado para consumir el contexto fácilmente
export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext debe ser usado dentro de un ProductsProvider');
  }
  return context;
};