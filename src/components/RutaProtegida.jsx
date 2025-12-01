// src/components/RutaProtegida.jsx

// Importamos React y las herramientas que necesitamos.
import React from 'react';
import { Navigate } from 'react-router-dom'; // 'Navigate' nos permite redirigir al usuario.
import { useAuthContext } from '../context/AuthContext'; // Nuestro hook para acceder al estado de autenticación.

// Este componente actúa como un guardián para otras rutas/páginas.
// Ya NO recibe la prop `isAuthenticated`. Ahora obtiene la información por sí mismo.
// 'children' representa el componente/página que queremos proteger (por ejemplo, <AdminPage />).
function RutaProtegida({ children }) {
  
  // Usamos nuestro hook para obtener el estado del usuario del contexto global.
  // La variable 'user' será el nombre de usuario si está logueado, o 'null' si no lo está.
  const { user } = useAuthContext();

  // Comprobamos si NO hay un usuario autenticado.
  if (!user) {
    // Si no hay usuario, significa que no ha iniciado sesión.
    // Lo redirigimos a la página de login usando el componente Navigate.
    // 'replace' es una buena práctica para que el usuario no pueda volver a la
    // página protegida usando el botón "atrás" del navegador.
    return <Navigate to="/login" replace />;
  }

  // Si SÍ hay un usuario, significa que está autenticado.
  // En este caso, simplemente renderizamos los 'children', es decir, la página protegida.
  return children;
}

// Exportamos el componente para usarlo en App.jsx.
export default RutaProtegida;