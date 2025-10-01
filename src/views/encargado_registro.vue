<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import { getEncargadoDetalle } from "../services/evidencias"

// tomar el parámetro de la ruta
const route = useRoute()
const actividadIdRaw = route.params.actividadId ?? route.params.id ?? route.query.actividadId
const actividadId = actividadIdRaw ? Number(actividadIdRaw) : null

// estado reactivo
const formData = reactive({
  nombre: '',
  apellido: '',
  telefono: '',
  correo: '',
  cargo: '',
  observaciones: ''
})

onMounted(async () => {
  if (!actividadId) {
    console.warn("No se encontró actividadId en la ruta")
    return
  }
  try {
    const encargado = await getEncargadoDetalle(actividadId)
    // asignar solo si viene definido
    formData.nombre = encargado.nombre ?? ''
    formData.apellido = encargado.apellido ?? ''
    formData.telefono = encargado.telefono ?? ''
    formData.correo = encargado.correo ?? ''
    formData.cargo = encargado.cargo ?? ''
    formData.observaciones = encargado.observaciones ?? ''
  } catch (err) {
    console.error("Error cargando el encargado:", err)
  }
})
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-left">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" alt="La Salle Logo" class="logo">
        <nav class="main-nav">
          <a href="#">Inicio</a>
          <a href="#" class="active-link">Mi perfil</a>
        </nav>
      </div>
      <div class="header-right">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
          <input type="text" placeholder="Buscar">
        </div>
        <div class="profile-icon"></div>
      </div>
    </header>

    <main class="main-content">
      <!-- Sidebar -->
      <aside class="sidebar">
        <ul>
          <li>
            <router-link
              :to="{ name: 'actividades_registro', params: { actividadId: actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Actividad
            </router-link>
          </li>
          
          <li class="active">
            <router-link
              :to="{ name: 'encargado_registro', params: { actividadId: actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Encargado
            </router-link>
          </li> 

         <li>
            <router-link
              :to="{ name: 'organizacion_registro', params: { actividadId: actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Institucion
            </router-link>
          </li> 
          
          <li>
            <router-link
              :to="{ name: 'actividades_ver', params: { idEstudiante } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Volver
            </router-link>
          </li>
        </ul>
      </aside>

      <!-- Formulario solo lectura -->
      <section class="content-form">
        <h2>Detalle del Encargado</h2>
        <form>
          <div class="form-group half-width">
            <label>Nombre</label>
            <input class="form-input" type="text" v-model="formData.nombre" readonly>
          </div>

          <div class="form-group half-width">
            <label>Apellido</label>
            <input class="form-input" type="text" v-model="formData.apellido" readonly>
          </div>

          <div class="form-group third-width">
            <label>Teléfono</label>
            <input class="form-input" type="text" v-model="formData.telefono" readonly>
          </div>

          <div class="form-group third-width">
            <label>Correo</label>
            <input class="form-input" type="email" v-model="formData.correo" readonly>
          </div>

          <div class="form-group third-width">
            <label>Cargo</label>
            <input class="form-input" type="text" v-model="formData.cargo" readonly>
          </div>

          <div class="form-group full-width">
            <label>Observaciones</label>
            <textarea class="form-input" v-model="formData.observaciones" readonly></textarea>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Contenedor principal */
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
.header-left, .header-right { display: flex; align-items: center; gap: 25px; }
.logo { height: 45px; }
.main-nav a { color: white; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background-color 0.2s; }
.main-nav a.active-link, .main-nav a:hover { background-color: rgba(0, 0, 0, 0.2); }
.search-bar { display: flex; align-items: center; background-color: rgba(0, 0, 0, 0.2); padding: 5px 10px; border-radius: 20px; }
.search-bar svg { width: 18px; height: 18px; margin-right: 5px; }
.search-bar input { background: transparent; border: none; color: white; outline: none; }
.search-bar input::placeholder { color: rgba(255, 255, 255, 0.7); }
.profile-icon { width: 36px; height: 36px; background-color: #28a745; border-radius: 50%; border: 2px solid white; }

/* Contenido Principal */
.main-content { flex-grow: 1; display: flex; padding: 30px; gap: 30px; }
.sidebar, .content-form { background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 8px 32px 0 rgba(0,0,0,0.1); }

/* Sidebar */
.sidebar { width: 250px; padding: 20px; color: #333; }
.sidebar ul { list-style: none; padding: 0; margin: 0; }
.sidebar li { padding: 15px 20px; font-weight: 500; border-radius: 8px; margin-bottom: 5px; cursor: pointer; position: relative; }
.sidebar li.active { background-color: #ff0000; color: white; font-weight: bold; }
.sidebar li.active::before { content: ''; position: absolute; left: -20px; top: 50%; transform: translateY(-50%); border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #ff0000; }

/* Formulario */
.content-form { flex-grow: 1; padding: 25px 35px; }
.content-form h2 { color: #333; margin-top: 0; margin-bottom: 25px; font-size: 24px; }
form {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 columnas para flexibilidad */
  gap: 20px;
}

.form-group.half-width { grid-column: span 3; }   /* ocupa la mitad */
.form-group.third-width { grid-column: span 2; }  /* ocupa un tercio */
.form-group.full-width { grid-column: 1 / -1; }   /* ocupa todo el ancho */
.form-group { display: flex; flex-direction: column; }
.form-group label { margin-bottom: 6px; font-size: 14px; font-weight: 600; color: #333; }
.form-input { background-color: rgba(80,80,80,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 15px; font-size: 15px; color: white; outline: none; transition: background-color 0.3s; }
.form-input::placeholder { color: rgba(255,255,255,0.8); }
.form-input:focus { background-color: rgba(80,80,80,0.7); }
.form-group.full-width { grid-column: 1 / -1; }
textarea.form-input { height: 100px; resize: vertical; }
</style>
