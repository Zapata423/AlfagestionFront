
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
      <div class="profile-icon" :class="{ 'default-bg': !fotoUrl }">
        <img v-if="fotoUrl" :src="fotoUrl" alt="Foto de perfil" class="profile-img-nav" />
        <span v-else class="fallback-text">Foto</span>
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
