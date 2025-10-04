<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; 
import { getComentariosPorActividad } from "../services/progreso";

const comentarios = ref("Cargando comentarios...");
const cargando = ref(true);
const errorCarga = ref(false);

// 1. Obtener la instancia de la ruta
const route = useRoute();
const router = useRouter()


// 2. Obtener el ID dinámicamente del parámetro de la URL
// Asegúrate de que el parámetro en tu router se llama 'actividadId'
const actividadId = route.params.actividadId;

async function cargarComentarios() {
  // Si no hay ID en la URL (solo ocurre si la configuración del router falla)
  if (!actividadId) {
    comentarios.value = "Error: ID de actividad no encontrado en la URL.";
    errorCarga.value = true;
    cargando.value = false;
    return;
  }

  cargando.value = true;
  errorCarga.value = false;
  try {
    const data = await getComentariosPorActividad(actividadId);

    if (data && data.length > 0) {
      comentarios.value = data[0].comentarios;
    } else {
      comentarios.value = "Esta actividad no tiene comentarios de validación.";
    }
  } catch (error) {
    comentarios.value = "Error al cargar los comentarios. Intenta de nuevo más tarde.";
    errorCarga.value = true;
  } finally {
    cargando.value = false;
  }
}

function onCancel() {
  router.push(`/student_progress`)
}
onMounted(() => {
  cargarComentarios();
});
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s"
          alt="La Salle Logo"
          class="logo"
        />
        <nav class="main-nav">
          <a href="#">Inicio</a>
          <a href="#" class="active-link">Mi perfil</a>
        </nav>
      </div>
      <div class="header-right">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd"
            />
          </svg>
          <input type="text" placeholder="Buscar" />
        </div>
        <div class="profile-icon"></div>
      </div>
    </header>

    <main class="main-content">
      <section class="content-form">
        <h2>Comentarios de la Actividad </h2>

        <div v-if="cargando" class="loading-message">
          Cargando comentarios...
        </div>
        <div v-else-if="errorCarga" class="error-message">
          {{ comentarios }}
        </div>

        <form @submit.prevent="" v-else>
          <div class="form-group solo-comentarios">
            <label>Comentarios de Validación</label>
            <textarea
              class="form-input full-width"
              rows="10"
              v-model="comentarios"
              readonly
            ></textarea>
          </div>
            <div class="form-group full-width">
                <button type="button" class="btn-volver" @click="onCancel">Volver</button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Contenedor general */
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url("/img/fondo 1.jpeg");
  background-size: cover;
  background-position: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Encabezado */
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
.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 25px;
}
.logo {
  height: 45px;
}
.main-nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 6px;
  transition: background-color 0.2s;
}
.main-nav a.active-link,
.main-nav a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
}
.search-bar svg {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.search-bar input {
  background: transparent;
  border: none;
  color: white;
  outline: none;
}
.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.profile-icon {
  width: 36px;
  height: 36px;
  background-color: #28a745;
  border-radius: 50%;
  border: 2px solid white;
}

/* Contenido principal */
.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 30px;
}

/* Caja con efecto cristal */
.content-form {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  padding: 25px 35px;
}
.content-form h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 24px;
  text-align: center;
}

/* Formulario */
form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group.full-width {
  grid-column: 1 / -1;
}
.form-group.solo-comentarios {
  grid-column: 1 / -1;
}

/* Inputs */
.form-input {
  background-color: rgba(80, 80, 80, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 15px;
  color: white;
  outline: none;
  transition: background-color 0.3s;
  resize: none;
}

/* Estilos específicos para mostrar el comentario cargado */
.form-input[readonly] {
  background-color: rgba(0, 0, 0, 0.7);
  color: #f5f5f5;
  cursor: default;
}

/* Mensajes de estado */
.loading-message,
.error-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  font-weight: 600;
}
.error-message {
  color: #ff0000;
}

/* Botón guardar (oculto) */
.btn-guardar {
  display: none;
}

/* Responsive */
@media (max-width: 900px) {
  form {
    grid-template-columns: 1fr;
  }
  .content-form {
    margin: 0 10px;
  }
}

.btn-volver {
  cursor: pointer;
  background: #ff0000;
  color: white;
  font-weight: 700;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 15px;
  transition: transform 0.08s ease;
}
.btn-volver:hover {
  transform: translateY(-2px);
}
</style>
