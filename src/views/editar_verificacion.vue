<script setup>
import { reactive, onMounted } from "vue"
import { useRoute } from "vue-router"
import { editarValidacionActividad, obtenerValidacionActividad } from "../services/validaciones"

const route = useRoute()
const actividadIdRaw = route.params.actividadId ?? route.params.id ?? route.query.actividadId
const actividadId = actividadIdRaw ? Number(actividadIdRaw) : null

const formData = reactive({
  status: "",
  comentarios: ""
})

// Cargar datos existentes al montar
onMounted(async () => {
  if (!actividadId) return
  try {
    const res = await obtenerValidacionActividad(actividadId)
    console.log("Validación existente:", res)
    if (res) {
      formData.status = res.status
      formData.comentarios = res.comentarios
    } else {
      alert("❌ No se encontró la validación de esta actividad")
    }
  } catch (err) {
    console.error("Error cargando validación:", err)
    alert("❌ Hubo un error al cargar la validación")
  }
})

// Editar validación
async function onSubmit() {
  if (!actividadId) {
    alert("❌ No se pudo identificar la actividad")
    return
  }

  if (!formData.status) {
    alert("❌ Debes seleccionar un estado")
    return
  }

  try {
    const res = await editarValidacionActividad(actividadId, {
      status: formData.status,
      comentarios: formData.comentarios
    })
    console.log("Validación editada:", res)
    alert("✅ Validación editada con éxito")
  } catch (err) {
    console.error("Error editando validación:", err.response?.data || err)
    alert("❌ Hubo un error al editar la validación: " + JSON.stringify(err.response?.data))
  }
}
</script>


<template>
  <div class="app-container">
    <!-- Encabezado -->
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

    <!-- Contenido principal -->
    <main class="main-content">
      <section class="content-form">
        <h2>Validar Actividad</h2>
        <form @submit.prevent="onSubmit">
          
          <!-- Select de estado -->
          <div class="form-group select-center">
            <label>Selecciona el estado de la actividad</label>
            <select class="form-input full-width" v-model="formData.status">
              <option disabled value="">-- Selecciona --</option>
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>

          <!-- Comentarios -->
          <div class="form-group full-width">
            <label>Comentarios</label>
            <textarea
              class="form-input full-width"
              rows="5"
              placeholder="Escribe aquí tus observaciones"
              v-model="formData.comentarios"
            ></textarea>
          </div>

          <!-- Botón -->
          <div class="form-group full-width">
            <button type="submit" class="btn-guardar">Guardar Validación</button>
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
  background-image: url('/img/fondo 1.jpeg');
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
  flex-grow: 1;
  padding: 25px 35px;
}
.content-form h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 24px;
}

/* Formulario en grid */
form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group.select-center {
  grid-column: 2 / span 1;
}
.form-group.full-width {
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
}
.form-input.full-width {
  grid-column: 1 / -1;
}
.form-input[disabled] {
  opacity: 0.85;
  color: #f5f5f5;
  background-color: rgba(50, 50, 50, 0.45);
}

/* Botón guardar */
.btn-guardar {
  cursor: pointer;
  background: #28a745;
  color: white;
  font-weight: 700;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 15px;
  transition: transform 0.08s ease;
}
.btn-guardar:hover {
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 900px) {
  form {
    grid-template-columns: 1fr;
  }
  .form-group.select-center {
    grid-column: 1 / -1;
  }
}
</style>
