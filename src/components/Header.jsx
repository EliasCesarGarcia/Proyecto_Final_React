// src/components/Header.jsx

import React from 'react';

// Este es un componente de "presentación".
// Su única responsabilidad es mostrar el encabezado de la página.
// No tiene lógica ni estado, solo devuelve una estructura HTML (JSX).
function Header() {
  return (
    // La etiqueta <header> es HTML estándar para definir un encabezado.
    // La clase "header" se usa para aplicarle estilos desde el archivo App.css.
    <header className="header">
      <h1>Mi Tienda Online</h1>
    </header>
  );
}

// La línea `export default` permite que este componente pueda ser importado
// y utilizado en otros archivos, como en App.jsx.
export default Header;