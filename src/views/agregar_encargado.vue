<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router" 
import { createEncargado } from "../services/encargados"

const router = useRouter()

// Datos del formulario
const formData = ref({
  nombre: "",
  apellido: "",
  telefono: "",
  correo: "",
  cargo: "", 
  observaciones: "", 
})

// Método submit
async function submitForm() {
  try {
    const data = await createEncargado(formData.value)
    alert("Encargado creado con éxito.")
    console.log("Respuesta del backend:", data)
    router.push("/encargado_vista")
  } catch (error) {
    console.error("Error al crear Encargado:", error.response?.data || error)
    alert("No se pudo registrar el Encargado.")
  }
}
</script>

<template>

  <div class="app-container">

    <!-- Header -->
    <header class="main-header">
      <div class="header-left">

        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" 
          alt="La Salle Logo" 
          class="logo"/>

        <nav class="main-nav">
          <a href="/ini_estudiante">Inicio</a>
          <a href="#" class="active-link">Mi perfil</a>
        </nav>
      </div>

      <div class="header-right">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path 
              fill-rule="evenodd" 
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" 
              clip-rule="evenodd" />
          </svg>

          <input type="text" placeholder="Buscar" />
        </div>
        <div class="profile-icon"></div>
      </div>
    </header>

    <!-- Main content -->
    <main class="main-content">
    
      <!-- Sidebar -->
      <aside class="sidebar">
        <ul class="sidebar-nav-list">
          <li>
            <a
              href="/encargadoi_registro"
              style="color: inherit; text-decoration: none; display: flex; align-items: center; justify-content: center;">
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5"/>
              </svg>
            </a>

          </li>
          <li class="active">
            <a
              href="/agregar_encargado"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Encargado
            </a>
          </li>
        </ul>

        <div class="sidebar-action">
          <button class="submit-button" @click="submitForm">Subir</button>
        </div>
      </aside>

      <!-- Formulario -->
      <section class="content-form">
      <h2>Agregar Encargado</h2>
        <form @submit.prevent="submitForm">
          <input 
          class="form-input span-3" 
          type="text" 
          placeholder="Nombres" 
          v-model="formData.nombre" />

          <input class="form-input span-3" 
          type="text" 
          placeholder="Apellidos" 
          v-model="formData.apellido" />

          <input 
          class="form-input span-2" 
          type="text" 
          placeholder="Teléfono" 
          v-model="formData.telefono" />

          <input 
          class="form-input span-2" 
          type="email" 
          placeholder="Correo" 
          v-model="formData.correo" />

          <input 
          class="form-input span-2" 
          type="text" 
          placeholder="Cargo" 
          v-model="formData.cargo" />

          <textarea 
          class="form-input full-width" 
          placeholder="Observaciones" 
          v-model="formData.observaciones"></textarea>

        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardEncargadoForm',
  data() {
    return {
      formData: {
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        cargo: '',
        observaciones: ''
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
.search-bar { display: flex; align-items: center; background-color: rgba(0, 0, 0, 0.2); padding: 5px 10px; border-radius: 20px; }
.search-bar svg { width: 18px; height: 18px; margin-right: 5px; }
.search-bar input { background: transparent; border: none; color: white; outline: none; }
.search-bar input::placeholder { color: rgba(255, 255, 255, 0.7); }
.profile-icon { width: 36px; height: 36px; background-color: #28a745; border-radius: 50%; border: 2px solid white; }

/* Contenido Principal */
.main-content {
  flex-grow: 1;
  display: flex;
  padding: 30px;
  gap: 30px;
}

/* Efecto de Cristal (Glassmorphism) */
.sidebar, .content-form {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

/* Barra Lateral (Sidebar) con Flexbox para alinear botón abajo */
.sidebar {
  width: 250px;
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

/* Botón "Subir" en la barra lateral */
.sidebar-action {
    margin-top: auto; /* Empuja este contenedor al fondo */
    padding-top: 20px;
}
.submit-button {
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
.submit-button:hover {
    background-color: #d60000;
}
/* Estilos para el grupo de iconos */
.icon-group {
    justify-content: space-around !important;
}
.icon-btn {
    background: #e0e0e0;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #555;
}
.icon-btn svg { width: 24px; height: 24px; }
.icon-btn.code-icon {
    background-color: #28a745;
    color: white;
}

/* Botón "Subir" en la barra lateral */
.sidebar-action {
    margin-top: auto;
    padding-top: 20px;
}
.submit-button {
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
.submit-button:hover {
    background-color: #d60000;
}

/* Formulario Central */
.content-form {
  flex-grow: 1;
  padding: 25px 35px;
}
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
.form-input.span-3 { grid-column: span 3; }
.form-input.span-2 { grid-column: span 2; }
.form-input.full-width { grid-column: 1 / -1; }
.form-input::placeholder { color: rgba(255, 255, 255, 0.8); }
textarea.form-input { height: 120px; resize: vertical; }

</style>