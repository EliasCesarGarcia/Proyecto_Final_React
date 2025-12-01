# 🛒 TiendaTech - eCommerce React

Proyecto final para el curso "Talento Tech" de React JS. Esta aplicación es un eCommerce funcional que simula un entorno de producción, incluyendo gestión de estado global, enrutamiento, autenticación simulada y operaciones CRUD.

## 📋 Características Principales

*   **Catálogo de Productos:** Visualización de productos con paginación y buscador en tiempo real.
*   **Detalle de Producto:** Vista individual con rutas dinámicas.
*   **Carrito de Compras:** Gestión de estado global (Context API) para agregar, eliminar y comprar productos.
*   **Autenticación:** Login simulado (Context API + localStorage) con rutas protegidas.
*   **Panel de Administración (CRUD):**
    *   Crear nuevos productos.
    *   Editar productos existentes.
    *   Eliminar productos.
    *   Validaciones de formulario.
    *   Conexión a **MockAPI**.
*   **Diseño:** Interfaz responsiva utilizando **Bootstrap**, **Styled-Components** e iconos de **React Icons**.
*   **Feedback:** Notificaciones al usuario usando **React Toastify**.
*   **SEO:** Optimización de metadatos con **React Helmet**.

## 🚀 Instalación y Ejecución

Sigue estos pasos para correr el proyecto en tu entorno local:

1.  **Clonar el repositorio (o descargar los archivos):**
    Asegúrate de estar en la carpeta del proyecto desde tu terminal.

2.  **Instalar dependencias:**
    Ejecuta el siguiente comando para instalar todas las librerías necesarias (React Router, Bootstrap, etc.):
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Normalmente disponible en `http://localhost:5173/` (o el puerto que indique la consola).

## 🔐 Credenciales de Acceso

Para acceder a las **Rutas Protegidas** (Carrito de compras y Panel de Administración), debes iniciar sesión con el siguiente usuario de prueba:

*   **Usuario:** `admin`
*   **Contraseña:** `1234`

## 🛠️ Tecnologías Utilizadas

*   React JS + Vite
*   React Router DOM (Enrutamiento)
*   Context API (Manejo de estado global)
*   Bootstrap 5 (Estilos y grillas)
*   Styled Components (Estilos personalizados)
*   React Toastify (Notificaciones)
*   React Helmet Async (SEO)
*   MockAPI (Backend simulado)

---
© 2025 Mi Tienda Online - Talento Tech