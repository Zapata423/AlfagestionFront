<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; 
import { getComentariosPorActividad } from "../services/progreso";
import estudianteNavbar from "./estudianteNavbar.vue"


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
    <estudianteNavbar/>
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
