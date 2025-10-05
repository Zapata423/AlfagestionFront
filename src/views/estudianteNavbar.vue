<template>
  <header class="main-header">
    <div class="header-left">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s"
        alt="La Salle Logo"
        class="logo"
      />
      <nav class="main-nav">
        <a href="/ini_estudiante">Inicio</a>
        <a href="/perfil_estudiante" class="active-link">Mi perfil</a>
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
      <div class="profile-icon" :class="{ 'default-bg': !fotoUrl }">
        <img v-if="fotoUrl" :src="fotoUrl" alt="Foto de perfil" class="profile-img-nav" />
        <span v-else class="fallback-text">Foto</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getEstudiantePerfil } from "../services/perfilEstudiante.js"

const BASE_URL = "http://localhost:8000"
const fotoUrl = ref(null)

async function fetchProfilePhoto() {
  try {
    const data = await getEstudiantePerfil()

    if (data && data.estudiante && data.estudiante.foto) {
      const rutaRelativa = data.estudiante.foto
      fotoUrl.value = rutaRelativa.startsWith("/")
        ? `${BASE_URL}${rutaRelativa}`
        : rutaRelativa
    } else {
      fotoUrl.value = null
    }
  } catch (error) {
    console.error("No se pudo cargar la foto del perfil:", error)
    fotoUrl.value = null
  }
}

onMounted(() => {
  fetchProfilePhoto()
})
</script>

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
  fill: white;
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
  border-radius: 50%;
  border: 2px solid white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-icon.default-bg {
  background-color: #28a745;
}

.profile-img-nav {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallback-text {
  color: white;
  font-size: 10px;
  font-weight: bold;
  line-height: 1;
}
</style>
