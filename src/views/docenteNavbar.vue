<script setup>
import { ref, onMounted } from 'vue'
import { getDocentePerfil } from '../services/perfilDocente' 
import { useRouter } from 'vue-router'

const router = useRouter()
const BASE_URL = "http://localhost:8000" 

const docenteData = ref({
  foto_url: null, 
  rol: "Docente" 
})

async function fetchDocenteData() {
  try {
    const data = await getDocentePerfil()
    let fotoUrlAbsoluta = data.docente.foto
    if (fotoUrlAbsoluta && fotoUrlAbsoluta.startsWith("/")) {
      fotoUrlAbsoluta = `${BASE_URL}${fotoUrlAbsoluta}`
    }

    docenteData.value.foto_url = fotoUrlAbsoluta || null
  } catch (error) {
    console.error("Error al cargar datos del docente para el header:", error)
    docenteData.value.foto_url = null
  }
}

onMounted(() => {
  fetchDocenteData()
})

function goToProfile() {
  router.push('/perfil_docente')
}
</script>

<template>
  <header class="main-header">
    <div class="header-left">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s"
        alt="La Salle Logo"
        class="logo"
      />
      <nav class="main-nav">
        <a href="/ini_docentes">Inicio</a>
        <a 
          href="/perfil_docente" 
          :class="{ 'active-link': $route.path === '/perfil_docente' }"
        >Mi perfil</a>
      </nav>
    </div>
    <div class="header-right">
      <div 
        class="profile-icon" 
        @click="goToProfile" 
        :style="{ 'background-image': docenteData.foto_url ? `url(${docenteData.foto_url})` : 'none' }"
        :title="docenteData.rol"
      >
        <svg v-if="!docenteData.foto_url"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          class="placeholder-svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0a4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.615-7.812-1.7a.75.75 0 01-.437-.695z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </header>
</template>

<style scoped>
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
.profile-icon {
  width: 36px;
  height: 36px;
  background-color: #d60000; 
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.profile-icon .placeholder-svg {
    width: 30px; 
    height: 30px;
    fill: white; 
}
.main-nav a.active-link {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>