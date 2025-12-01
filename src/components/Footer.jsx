// src/components/Footer.jsx

import React from 'react';

// Al igual que el Header, este es otro componente de presentación para el pie de página.
// Su función es simplemente mostrar la información final de la web.
function Footer() {
  return (
    // La etiqueta <footer> es HTML estándar para el pie de página.
    // La clase "footer" se usa para aplicarle los estilos definidos en App.css.
    <footer className="footer">
      <p>&copy; 2025 Mi Tienda Online. Todos los derechos reservados.</p>
    </footer>
  );
}

// Exportamos el componente para que pueda ser utilizado en App.jsx.
export default Footer;