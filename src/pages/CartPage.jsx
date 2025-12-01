// src/pages/CartPage.jsx

import React from 'react';
import ShoppingCart from '../components/ShoppingCart';

// Esta página ya no recibe ninguna prop.
function CartPage() {
  return (
    <div className="page-container">
      {/* El componente ShoppingCart ahora obtendrá los datos por sí mismo. */}
      <ShoppingCart />
    </div>
  );
}

export default CartPage;