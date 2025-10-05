<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
// Función para simular la acción del botón "Cancelar" y navegar a otra vista
function cancelAction() {
  router.push('/institucion_vista')
}
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-left">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" alt="La Salle Logo" class="logo">
        <nav class="main-nav">
          <a href="/ini_estudiante">Inicio</a>
          <a href="#" class="active-link">Mi perfil</a>
        </nav>
      </div>
      <div class="header-right">
        <div class="profile-icon"></div>
      </div>
    </header>

    <main class="main-content">
      <aside class="sidebar">
        <ul class="sidebar-nav-list">
          <li class="active">
            <a
              href="/institucion_registro"
              style="color: inherit; text-decoration: none; display: flex; align-items: center; justify-content: center;"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="/agregar_institucion"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Institucion
            </a>
          </li>
        </ul>
        <div class="sidebar-action">
          <button class="back-button" @click="cancelAction">Cancelar</button>
        </div>
      </aside>
      <section class="content-panel">
        <div class="info-text">
          <blockquote class="welcome-quote">
            "Bienvenido al registro de instituciones, donde podrás gestionar, organizar y validar la información de manera sencilla y efectiva."
          </blockquote>
          <hr class="separator" />
          <p>
            Este formulario te permite registrar Instituciones de manera organizada. Está dividido en tres partes:
          </p>
          <ol>
            <li><strong>Datos de la institución:</strong> nombre, tipo, dirección, teléfono y correo institucional.</li>
            <li><strong>Encargado o representante:</strong> Información básica del responsable (nombre, cargo, correo y teléfono).</li>
            <li><strong>Gestión de registro:</strong> confirmar, guardar y disponer la institución para su uso en actividades o proyectos.</li>
            
          </ol>
          
        </div>
      </section>
    </main>
  </div>
</template>

<script>
// Elimino el export default ya que se usa <script setup> arriba
</script>

<style scoped>
/* Estilos Generales y de Encabezado (sin cambios) */
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('/img/fondo 1.jpeg');
  background-size: cover;
  background-position: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.main-header {
  background-color: #ff0000;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 60px;
  flex-shrink: 0;
}
.header-left, .header-right { display: flex; align-items: center; gap: 25px; }
.logo { height: 45px; }
.main-nav a { color: white; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; }
.main-nav a.active-link, .main-nav a:hover { background-color: rgba(0, 0, 0, 0.2); }
.profile-icon { width: 36px; height: 36px; background-color: #28a745; border-radius: 50%; border: 2px solid white; }

/* Contenido Principal */
.main-content {
  flex-grow: 1;
  display: flex;
  padding: 30px;
  gap: 30px;
}

/* Efecto de Cristal (Glassmorphism) */
.sidebar, .content-panel {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

/* ---------------------------------------------------- */
/* ESTILOS DEL SIDEBAR DEL CÓDIGO 1 (Aplicados al CÓDIGO 2) */
/* ---------------------------------------------------- */

/* Barra Lateral (Sidebar) con Flexbox para alinear botón abajo */
.sidebar {
  width: 250px;
  padding: 20px;
  color: #333;
  display: flex;
  flex-direction: column;
}

/* Se cambió de 'ul' a '.sidebar-nav-list' para aplicar los estilos del Código 1 */
.sidebar-nav-list { list-style: none; padding: 0; margin: 0; }
.sidebar-nav-list li {
    padding: 15px 20px;
    font-weight: 500;
    border-radius: 8px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Se usa '.sidebar-nav-list li.active' en lugar de '.sidebar li.active' */
.sidebar-nav-list li.active { background-color: #ff0000; color: white; font-weight: bold; }
.sidebar-nav-list li.active::before { content: ''; position: absolute; left: -20px; top: 50%; transform: translateY(-50%); border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #ff0000; }
.sidebar-nav-list li svg { width: 28px; height: 28px; }

/* Contenedor del Botón (del Código 1) */
.sidebar-action {
    margin-top: auto; /* Empuja este contenedor al fondo */
    padding-top: 20px;
}

/* Estilo para el botón "Cancelar" (llamado submit-button en el Código 1) */
.back-button {
    background-color: #ff0000;
    color: white;
    border: none;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}
.back-button:hover {
    background-color: #d60000;
}

/* ---------------------------------------------------- */
/* ESTILOS DE CONTENT-PANEL (Panel de Contenido Informativo) del CÓDIGO 2 (sin cambios) */
/* ---------------------------------------------------- */

.content-panel {
  flex-grow: 1;
  padding: 25px 45px;
  display: flex;
  flex-direction: column;
}
.content-panel h2 { color: #333; margin-top: 0; margin-bottom: 25px; font-size: 24px; text-align: left; }
.info-text {
    text-align: center;
    color: #333;
    font-size: 1.1rem;
    line-height: 1.6;
}
.welcome-quote {
    font-size: 1.3rem;
    font-style: italic;
    color: #111;
    margin: 20px 0 30px 0;
    padding: 0 20px;
    border: none;
}
.separator {
    border: none;
    height: 2px;
    background-color: #ff0000;
    width: 80%;
    margin: 0 auto 30px auto;
}
.info-text p {
    margin-bottom: 25px;
}
.info-text ol {
    text-align: left;
    padding-left: 40px;
    display: inline-block;
}
.info-text ol li {
    margin-bottom: 15px;
}
.info-text ol li strong {
    color: #000;
}
/* El estilo .back-button se elimina ya que usamos .submit-button */
</style>