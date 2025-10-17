<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router" 
import { createInstitucion } from "../services/instituciones" 
import estudianteNavbar from "./estudianteNavbar.vue"
const router = useRouter()

const formData = ref({
  nombre: "",
  telefono: "",
  poblacion_intervenida: "",
  email: "",
  direccion: "", 
  barrio: "", 
  ciudad: "", 
})

async function submitForm() {
  try {
    const data = await createInstitucion(formData.value)
    alert("Institución creada con éxito. ")
    console.log("Respuesta del backend:", data)
    router.push("/institucion_vista")
  } catch (error) {
    console.error("Error al crear institución:", error.response?.data || error)
    alert("No se pudo registrar la institución.")
  }
}
function cancelAction() {
  router.push('/institucion_vista')
}
</script>

<template>
  <div class="app-container">
    <estudianteNavbar />

    <main class="main-content">
      <aside class="sidebar">
        <ul class="sidebar-nav-list">
          <li>
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
          <li class="active">
            <a
              href="/agregar_institucion"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Institución
            </a>
          </li>
        </ul>
        <div class="sidebar-action action-margin">
          <button class="submit-button" @click="submitForm">Subir</button>
        </div>
        <div class="sidebar-action">
          <button class="cancel-button" @click="cancelAction">Cancelar</button>
        </div>
        </aside>

      <section class="content-form">
      <h2>Agregar Institución</h2>
        <form @submit.prevent="submitForm">
          <input
            class="form-input full-width"
            type="text"
            placeholder="Centro o lugar de proyección social"
            v-model="formData.nombre"
          />

          <input
            class="form-input"
            type="text"
            placeholder="Teléfono"
            v-model="formData.telefono"
          />
          <input
            class="form-input"
            type="text"
            placeholder="Población Intervenida"
            v-model="formData.poblacion_intervenida"
          />
          <input
            class="form-input"
            type="email"
            placeholder="Correo"
            v-model="formData.email"
          />

          <input
            class="form-input"
            type="text"
            placeholder="Direccion"
            v-model="formData.direccion"
          />
          <input
            class="form-input"
            type="text"
            placeholder="Barrio"
            v-model="formData.barrio"
          />
          <input
            class="form-input"
            type="text"
            placeholder="Ciudad"
            v-model="formData.ciudad"
          />
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardInstitucionForm',
  data() {
    return {
      formData: {
        centroSocial: '',
        telefono: '',
        poblacion: '',
        correo: '',
        direccion: '',
        barrio: '',
        ciudad: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log('Datos del formulario:', this.formData);
      alert('Revisa la consola para ver los datos del formulario.');
    }
  }
}
</script>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/img/prescolar.png');
  background-size: cover;
  background-position: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex-grow: 1;
  display: flex;
  padding: 30px;
  gap: 30px;
}
.sidebar, .content-form {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}
.sidebar {
  width: 227px;
  padding: 20px;
  color: #333;
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
.sidebar-nav-list li.active::before { content: ''; position: absolute; left: -20px; top: 50%; transform: translateY(-50%); border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #ff0000; }
.sidebar-nav-list li svg { width: 28px; height: 28px; }
.sidebar-action {
    padding-top: 5px; 
}
.action-margin {
    margin-top: auto; 
    padding-top: 20px !important;
}
.submit-button {
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
    margin-bottom: 10px; 
}
.submit-button:hover {
    background-color: #218838;
}
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
.content-form {
  flex-grow: 1;
  padding: 25px 35px;
}
.content-form h2 { color: #333; margin-top: 0; margin-bottom: 25px; font-size: 24px; }
form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  transition: background-color 0.3s;
}
.form-input.full-width {
  grid-column: 1 / -1;
}
.form-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.form-input:focus {
  background-color: rgba(80, 80, 80, 0.7);
}
</style>