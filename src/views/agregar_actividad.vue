<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { createActividad } from "../services/actividades"
import { getMisInstituciones } from "../services/instituciones"
import { getMisEncargados } from "../services/encargados"

const router = useRouter()

// Datos del formulario
const formData = ref({
  titulo: "",
  descripcion: "",
  horas: "",
  fecha_subida: "",
  institucion: "",
  encargado: "",
  archivo: null,
})

// Listas dinámicas
const instituciones = ref([])
const encargados = ref([])

// Cargar datos al montar el componente
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

// Enviar formulario
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
</script>

<template>
  <div class="app-container">
    <!-- HEADER -->
    <header class="main-header">
      <div class="header-left">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" alt="La Salle Logo" class="logo">
        <nav class="main-nav">
          <a href="/ini_estudiante">Inicio</a>
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
      <!-- SIDEBAR -->
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

        <!-- Botón "Subir" abajo con mismo estilo que ejemplo -->
        <div class="sidebar-action">
          <button class="submit-button" @click="submitForm">Subir</button>
        </div>
      </aside>

      <!-- FORMULARIO -->
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
/* Fondo y layout general */
/* Contenedor principal y fondo */
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('https://scontent.feoh3-1.fna.fbcdn.net/v/t51.75761-15/481610614_18306353359227867_8885988781752331401_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG48Zk_KecLM9jpd4x-t2rKj7P_FqscypGPs_8WqxzKkZxSA_-z3Fof4PiSfNPs7L6jOELnYlGZlzGvlQLEcX-z&_nc_ohc=_mGcrzTpfGIQ7kNvwEge5VC&_nc_oc=AdkkzlL0pOOyV-hcvk2snjL4QhWpfE8Z-zkAWpDPhzoJr0X2d_uy8GKgaCIjuj6VYwKK-q41zaOoYHPX28WNk1-v&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=hWl9J-dgLl_yZm5Zo6bs5g&oh=00_AfZg3EH2GU7GPpJRh08rIw4pdgVGr5X965b7dV5I-IrrEQ&oe=68CA8FD1');
  background-size: cover;
  background-position: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
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

/* Main content */
.main-content { flex-grow: 1; display: flex; padding: 30px; gap: 30px; }

/* Sidebar */
.sidebar, .content-form {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.sidebar {
  width: 250px;
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

/* Botón "Subir" en sidebar */
.sidebar-action {
  margin-top: auto; /* Lo empuja al fondo */
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
.submit-button:hover { background-color: #d60000; }

/* Formulario */
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
textarea.form-input { height: 120px; resize: vertical; }

</style>