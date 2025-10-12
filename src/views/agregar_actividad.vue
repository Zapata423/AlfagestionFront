<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { createActividad } from "../services/actividades"
import { getMisInstituciones } from "../services/instituciones"
import { getMisEncargados } from "../services/encargados"
import estudianteNavbar from "./estudianteNavbar.vue"

const router = useRouter()

const formData = ref({
  titulo: "",
  descripcion: "",
  horas: "",
  fecha_subida: "",
  institucion: "",
  encargado: "",
  archivo: null,
})

const instituciones = ref([])
const encargados = ref([])

onMounted(async () => {
  try {
    instituciones.value = await getMisInstituciones()
    console.log("Instituciones cargadas:", instituciones.value)
    encargados.value = await getMisEncargados()
    console.log("Encargados cargados:", encargados.value)
  } catch (error) {
    console.error("Error cargando datos:", error)
  }
})

async function submitForm() {
  try {
    const payload = new FormData()
    Object.keys(formData.value).forEach(key => {
      if (formData.value[key] !== null) payload.append(key, formData.value[key])
    })

    const data = await createActividad(payload)
    alert("Actividad creada con éxito.")
    console.log("Respuesta del backend:", data)
    router.push("/actividad_vista")
  } catch (error) {
    console.error("Error al crear actividad:", error.response?.data || error)
    alert("No se pudo registrar la actividad.")
  }
}

function cancelAction() {
  router.push('/actividad_vista')
}
</script>

<template>
  <div class="app-container">
    <estudianteNavbar />

    <main class="main-content">
      <aside class="sidebar">
        <ul class="sidebar-nav-list">
          <li>
            <a href="/actividad_registro" style="color: inherit; text-decoration: none; display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5"/>
              </svg>
            </a>
          </li>
          <li class="active">
            <a href="/agregar_actividad" style="color: inherit; text-decoration: none; display: block;">Actividad</a>
          </li>
        </ul>

        <div class="sidebar-action action-margin">
          <button class="submit-button green-button" @click="submitForm">Subir</button>
        </div>
        <div class="sidebar-action">
          <button class="cancel-button" @click="cancelAction">Cancelar</button>
        </div>
        </aside>

      <section class="content-form">
        <h2>Agregar Actividad</h2>
        <form>
          <input class="form-input span-3" type="text" placeholder="Título de la Actividad" v-model="formData.titulo" />
          <input class="form-input span-2" type="date" placeholder="Fecha" v-model="formData.fecha_subida" />
          <input class="form-input span-2" type="number" placeholder="Número de horas" v-model="formData.horas" />
          <select class="form-input span-3" v-model="formData.institucion">
            <option disabled value="">Institución de proyección</option>
            <option 
              v-for="inst in instituciones" 
              :key="inst.id" 
              :value="inst.id">
              {{ inst.nombre }}
            </option>
          </select>

          <select class="form-input span-3" v-model="formData.encargado">
            <option disabled value="">Encargado</option>
            <option 
              v-for="enc in encargados" 
              :key="enc.id" 
              :value="enc.id">
              {{ enc.nombre }} {{ enc.apellido }}
            </option>
          </select>

          <textarea class="form-input full-width" placeholder="Descripción" v-model="formData.descripcion"></textarea>
          <input class="form-input full-width" type="file" @change="e => formData.archivo = e.target.files[0]" />
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/img/juegos.png');
  background-size: cover;
  background-position: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.main-content { flex-grow: 1; display: flex; padding: 30px; gap: 30px; }
.sidebar, .content-form {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.sidebar {
  width: 227px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
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
.sidebar-nav-list li.active { background-color: #ff0000; color: white; font-weight: bold; }
.sidebar-nav-list li.active::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #ff0000;
}
.sidebar-nav-list li svg { width: 28px; height: 28px; }
.sidebar-action {
  padding-top: 10px; 
}
.sidebar-action.action-margin {
  margin-top: auto; 
  padding-top: 20px; 
}
.submit-button.green-button {
  background-color: #28a745; 
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
.submit-button.green-button:hover { background-color: #218838; }
.cancel-button {
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
.cancel-button:hover {
  background-color: #d60000;
}
.content-form { flex-grow: 1; padding: 25px 35px; }
.content-form h2 { color: #333; margin-top: 0; margin-bottom: 25px; font-size: 24px; }
form {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}
.form-input {
  background-color: rgba(80, 80, 80, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 15px;
  color: white;
  outline: none;
}
.form-input.span-2 { grid-column: span 2; }
.form-input.span-3 { grid-column: span 3; }
.form-input.full-width { grid-column: 1 / -1; }
.form-input::placeholder { color: rgba(255, 255, 255, 0.8); }
textarea.form-input { height: 120px; resize: vertical; }
</style>