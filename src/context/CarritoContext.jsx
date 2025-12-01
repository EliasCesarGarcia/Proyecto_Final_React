// src/context/CarritoContext.jsx

import React, { createContext, useState } from 'react';

export const CarritoContext = createContext();

// MODIFICADO: El proveedor ahora recibe una prop 'onPurchase' que será la función de notificación.
export function CarritoProvider({ children, onPurchase }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (product) => {
    setCarrito(prevCarrito => [...prevCarrito, product]);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // NUEVO: Función para realizar la compra.
  const realizarCompra = () => {
    // Nos aseguramos de que haya productos y que la función de notificación exista.
    if (carrito.length > 0 && typeof onPurchase === 'function') {
      onPurchase(); // 1. Llama a la función de notificación pasada desde App.jsx.
      vaciarCarrito(); // 2. Vacía el carrito.
    }
  };

  // MODIFICADO: Añadimos 'realizarCompra' al valor del contexto para que esté disponible en la app.
  const value = {
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    realizarCompra,
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}