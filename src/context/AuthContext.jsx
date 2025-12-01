// src/context/AuthContext.jsx

// Importamos las herramientas necesarias de React.
// createContext nos permite crear el "almacén" global.
// useState nos permite crear y manejar el estado dentro de nuestro componente proveedor.
// useContext nos permite acceder al contexto desde cualquier otro componente.
import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto de Autenticación.
// Este es el objeto que los componentes "consumirán" para obtener los datos de autenticación.
const AuthContext = createContext();

// 2. Crear el Proveedor (AuthProvider).
// Este es un componente que envolverá a toda nuestra aplicación (o a las partes que lo necesiten).
// Su trabajo es manejar el estado de autenticación y proveerlo a todos sus hijos.
export function AuthProvider({ children }) {
  
  // Creamos un estado llamado 'user'.
  // Al principio, el usuario no está autenticado, por lo que su valor es 'null'.
  // Cuando el usuario inicie sesión, aquí guardaremos su nombre de usuario.
  const [user, setUser] = useState(null);

  // Función para iniciar sesión.
  // Recibe el nombre de usuario como argumento.
  const login = (username) => {
    
    // Simulamos la creación de un "token" de autenticación.
    // En una aplicación real, este token lo generaría y enviaría el servidor.
    // Aquí, simplemente creamos un texto que incluye el nombre de usuario.
    const fakeToken = `fake-token-${username}`;
    
    // Guardamos este token en el 'localStorage' del navegador.
    // localStorage es un pequeño almacenamiento en el navegador que persiste
    // incluso si cerramos la pestaña o el navegador. Esto nos permitirá
    // recordar que el usuario ya ha iniciado sesión.
    localStorage.setItem('authToken', fakeToken);
    
    // Actualizamos el estado 'user' con el nombre de usuario.
    // Esto hará que la aplicación "reaccione" y se actualice para mostrar
    // que el usuario ha iniciado sesión.
    setUser(username);
  };

  // Función para cerrar sesión.
  const logout = () => {
    
    // Eliminamos el token que habíamos guardado en localStorage.
    localStorage.removeItem('authToken');
    
    // Restablecemos el estado 'user' a 'null'.
    // Esto le indicará a la aplicación que el usuario ya no está autenticado.
    setUser(null);
  };

  // 3. Devolvemos el componente Provider del contexto.
  // La prop 'value' es MUY importante. Aquí definimos qué datos y funciones
  // estarán disponibles para todos los componentes hijos que consuman este contexto.
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* 'children' representa todos los componentes que estarán envueltos por este AuthProvider. */}
      {children}
    </AuthContext.Provider>
  );
}

// 4. Crear un "Hook" personalizado para usar el contexto.
// Esto es una buena práctica que nos facilita la vida.
// En lugar de importar 'AuthContext' y 'useContext' en cada componente,
// solo importaremos y usaremos 'useAuthContext()'.
export const useAuthContext = () => {
  return useContext(AuthContext);
};