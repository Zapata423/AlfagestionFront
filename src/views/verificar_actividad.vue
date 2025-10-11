<script setup>
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { validarActividad } from "../services/validaciones"
import docenteNavbar from "./docenteNavbar.vue"

const route = useRoute()
const router = useRouter()

const actividadIdRaw = route.params.actividadId ?? route.params.id ?? route.query.actividadId
const actividadId = actividadIdRaw ? Number(actividadIdRaw) : null
console.log("Actividad ID:", actividadId)

// Supongamos que idEstudiante viene como query o param
let idEstudiante = route.params.idEstudiante ?? route.query.idEstudiante ?? null

const formData = reactive({
  status: "", 
  comentarios: "" 
})

// Función para cancelar y navegar al listado de actividades del estudiante
function onCancel() {
  if (!idEstudiante) {
    alert("❌ No se pudo identificar al estudiante")
    return
  }
  router.push(`/actividades_ver/${idEstudiante}`)
}

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
    console.log("Datos a enviar:", formData)
    const res = await validarActividad(actividadId, {
      status: formData.status,
      comentarios: formData.comentarios
    })
    console.log("Respuesta validación:", res)
    alert("✅ Actividad validada con éxito")
    
    // Llama a la función de cancelación para redirigir después del éxito
    onCancel() 
    
  } catch (err) {
    console.error("Error validando actividad:", err.response?.data || err)
    alert("❌ Hubo un error al validar la actividad: " + JSON.stringify(err.response?.data))
  }
}
</script>


<template>
  <div class="app-container">
    <docenteNavbar/>

    <main class="main-content">
      <section class="content-form">
        <h2>Validar Actividad</h2>
        <form @submit.prevent="onSubmit">
          
          <div class="form-group select-center">
            <label>Selecciona el estado de la actividad</label>
            <select class="form-input full-width" v-model="formData.status">
              <option disabled value="">-- Selecciona --</option>
              <option value="pending">Pendiente</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>

          <div class="form-group full-width">
            <label>Comentarios</label>
            <textarea
              class="form-input full-width"
              rows="5"
              placeholder="Escribe aquí tus observaciones"
              v-model="formData.comentarios"
            ></textarea>
          </div>

          <div class="form-group full-width">
            <button type="submit" class="btn-guardar">Guardar Validación</button>
          </div>
          <div class="form-group full-width">
            <button type="button" class="btn-cancelar" @click="onCancel">Cancelar</button>
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
  background-image: url('../assets/img/patio.png');
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

.btn-cancelar {
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
.btn-cancelar:hover {
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