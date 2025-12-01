// src/components/FormularioProducto.jsx

import React, { useState, useEffect } from 'react';
import { useProductsContext } from '../context/ProductsContext'; // Importamos el hook del contexto
import '../styles/FormularioProducto.css';

// El formulario ahora recibe el producto a editar y una función para cuando se finalice.
function FormularioProducto({ productoAEditar, alFinalizar }) {
  
  // Estado inicial del formulario, vacío.
  const estadoInicial = {
    nombre: '',
    precio: '',
    descripcion: ''
  };

  const [producto, setProducto] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  
  // Obtenemos las funciones para agregar y editar desde el contexto.
  const { agregarProducto, editarProducto } = useProductsContext();

  // Determinamos si estamos en modo edición.
  const modoEdicion = Boolean(productoAEditar);

  // useEffect se ejecuta si `productoAEditar` cambia.
  // Si nos pasan un producto, llenamos el formulario con sus datos.
  // Si no, lo reseteamos.
  useEffect(() => {
    if (modoEdicion) {
      setProducto(productoAEditar);
    } else {
      setProducto(estadoInicial);
    }
  }, [productoAEditar]); // eslint-disable-line react-hooks/exhaustive-deps

  // Maneja los cambios en los inputs y limpia los errores en tiempo real.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores(prev => {
        const nuevosErrores = { ...prev };
        delete nuevosErrores[name];
        return nuevosErrores;
      });
    }
  };

  // Función para validar los campos del formulario.
  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!producto.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!producto.precio || parseFloat(producto.precio) <= 0) nuevosErrores.precio = 'El precio debe ser un número mayor a 0.';
    if (producto.descripcion.length < 10) nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Se ejecuta al enviar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      if (modoEdicion) {
        // Si estamos en modo edición, llamamos a la función de editar.
        await editarProducto(producto);
      } else {
        // Si no, llamamos a la función de agregar.
        await agregarProducto(producto);
      }
      // Llamamos a la función `alFinalizar` para, por ejemplo, cerrar el formulario.
      alFinalizar();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      {/* El título cambia según el modo */}
      <h3>{modoEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
      
      <div className="form-group">
        <label>Nombre:</label>
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} />
        <div className="error-message">{errores.nombre}</div>
      </div>

      <div className="form-group">
        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} />
        <div className="error-message">{errores.precio}</div>
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} />
        <div className="error-message">{errores.descripcion}</div>
      </div>
      
      {/* El texto del botón también cambia */}
      <button type="submit">{modoEdicion ? 'Actualizar Producto' : 'Agregar Producto'}</button>
      {/* Botón para cancelar y cerrar el formulario */}
      <button type="button" className="btn-cancel" onClick={alFinalizar}>Cancelar</button>
    </form>
  );
}

export default FormularioProducto;