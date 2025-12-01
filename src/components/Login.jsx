// src/components/Login.jsx

// Importamos las herramientas necesarias de React y de otras librerías.
import React, { useState } from 'react'; // useState para manejar el estado de los inputs.
import { useNavigate } from 'react-router-dom'; // useNavigate para redirigir al usuario después del login.
import { useAuthContext } from '../context/AuthContext'; // Nuestro hook personalizado para acceder al contexto de autenticación.

// Definimos el componente funcional Login.
function Login() {
  // Creamos estados locales para guardar lo que el usuario escribe en los campos.
  const [usuario, setUsuario] = useState(''); // Estado para el nombre de usuario.
  const [password, setPassword] = useState(''); // Estado para la contraseña.

  // Obtenemos la función 'login' de nuestro contexto de autenticación.
  const { login } = useAuthContext();
  
  // Obtenemos la función 'navigate' para poder redirigir al usuario.
  const navigate = useNavigate();

  // Esta función se ejecutará cuando el usuario envíe el formulario (haciendo clic en el botón).
  const handleSubmit = (e) => {
    // Prevenimos el comportamiento por defecto del formulario, que es recargar la página.
    e.preventDefault();

    // --- Simulación de Autenticación ---
    // En una aplicación real, aquí enviaríamos 'usuario' y 'password' a un servidor.
    // Por ahora, simplemente comprobamos si las credenciales son las correctas ('admin' y '1234').
    if (usuario === 'admin' && password === '1234') {
      
      // Si las credenciales son correctas, llamamos a la función 'login' del contexto.
      // Le pasamos el nombre de usuario para que lo guarde en el estado global.
      login(usuario);
      
      // Después de iniciar sesión, redirigimos al usuario a la página del carrito.
      // El usuario ahora podrá ver esta página porque está autenticado.
      navigate('/carrito');

    } else {
      // Si las credenciales son incorrectas, mostramos una alerta simple.
      alert('Credenciales incorrectas');
    }
  };

  // Esto es lo que el componente renderizará en la pantalla.
  return (
    // Un formulario HTML estándar. La prop 'onSubmit' se vincula a nuestra función 'handleSubmit'.
    <form onSubmit={handleSubmit} className="page-container">
      <h2>Iniciar Sesión</h2>
      
      {/* Contenedor para el campo de usuario */}
      <div>
        <label>Usuario:</label>
        <input
          type="text" // El tipo de input.
          value={usuario} // El valor del input está controlado por nuestro estado 'usuario'.
          // Cada vez que el usuario teclea, se ejecuta esta función.
          // 'e.target.value' contiene el texto actual del input.
          // 'setUsuario' actualiza nuestro estado con ese texto.
          onChange={(e) => setUsuario(e.target.value)}
          required // Hace que el campo sea obligatorio.
        />
      </div>

      {/* Contenedor para el campo de contraseña */}
      <div>
        <label>Contraseña:</label>
        <input
          type="password" // El tipo 'password' oculta los caracteres.
          value={password} // El valor está controlado por nuestro estado 'password'.
          // Funciona igual que el input de usuario, pero actualiza el estado 'password'.
          onChange={(e) => setPassword(e.target.value)}
          required // También es obligatorio.
        />
      </div>
      
      {/* El botón que envía el formulario. */}
      <button type="submit" className="btn">Iniciar sesión</button>
    </form>
  );
}

// Exportamos el componente para poder usarlo en otras partes de la aplicación (como en App.jsx).
export default Login;