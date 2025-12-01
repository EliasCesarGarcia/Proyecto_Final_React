import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { toast } from 'react-toastify';

function ShoppingCart() {
  const { carrito, vaciarCarrito, realizarCompra } = useContext(CarritoContext);

  const total = carrito.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handlePurchase = () => {
    if (carrito.length > 0) {
      realizarCompra();
      toast.success("¡Compra realizada con éxito! Gracias por tu preferencia.");
    } else {
      toast.error("El carrito está vacío.");
    }
  };

  return (
    <section className="container my-5">
      <h2 className="mb-4">Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div className="alert alert-info">Tu carrito está vacío.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th className="text-end">Precio</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-end">${parseFloat(item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3">
            <h3 className="me-4">Total: ${total.toFixed(2)}</h3>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
            <button className="btn btn-success btn-lg" onClick={handlePurchase}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default ShoppingCart;