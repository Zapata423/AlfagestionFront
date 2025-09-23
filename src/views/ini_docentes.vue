<script setup>
import { useRouter } from 'vue-router'
import { logoutDocente } from '../services/authDocentes'  // 

const router = useRouter()

async function handleLogout() {
  try {
    await logoutDocente() // 
    router.push('/ing_profesores') // redirige al login de docentes
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    // Como fallback, igual borramos los tokens y redirigimos
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user')
    router.push('/ing_profesores')
  }
}
</script>

<template>
  <div id="app-container">
    <header class="main-header">
      <div class="logo-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s"
          alt="La Salle Instituto San Carlos Logo"
          class="logo"
        />
      </div>
      <div class="title-container">
        <h1 class="title">AlfaGestion</h1>
      </div>
    </header>

    <main class="content-area">
      <aside class="sidebar-nav">
        <div class="user-profile">
          <img
            src="https://www.footballdatabase.eu/images/photos/players/2014-2015/a_61/61663.jpg"
            alt="User Avatar"
            class="avatar"
          />
          <div class="user-info">
            <span class="user-name">Bienvenido,</span>
            <span class="user-role">Docente</span>
          </div>
        </div>

        <nav class="main-nav">
          <ul>
            <li v-for="item in menuItems" :key="item.id">
              <a
                class="nav-button"
                :class="{ active: activeItem === item.id }"
                :href="item.href"
                @click="setActiveItem(item.id)"
              >
                <span v-html="item.icon"></span>
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Botón de logout -->
        <div class="logout-section">
          <button class="nav-button logout" @click="handleLogout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 
                   2.25 0 00-2.25 2.25v13.5A2.25 2.25 
                   0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 
                   9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>
    </main>
  </div>
</template>

<style scoped>
#app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
}
.logo-container .logo {
  height: 60px;
}
.title-container .title {
  color: #d90429;
  font-size: 2.5em;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
}
.content-area {
  flex-grow: 1;
  display: flex;
  background: url('https://scontent.feoh3-1.fna.fbcdn.net/v/t51.75761-15/481610614_18306353359227867_8885988781752331401_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG48Zk_KecLM9jpd4x-t2rKj7P_FqscypGPs_8WqxzKkZxSA_-z3Fof4PiSfNPs7L6jOELnYlGZlzGvlQLEcX-z&_nc_ohc=_mGcrzTpfGIQ7kNvwEge5VC&_nc_oc=AdkkzlL0pOOyV-hcvk2snjL4QhWpfE8Z-zkAWpDPhzoJr0X2d_uy8GKgaCIjuj6VYwKK-q41zaOoYHPX28WNk1-v&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=hWl9J-dgLl_yZm5Zo6bs5g&oh=00_AfZg3EH2GU7GPpJRh08rIw4pdgVGr5X965b7dV5I-IrrEQ&oe=68CA8FD1')
    no-repeat center center;
  background-size: cover;
  position: relative;
}
.content-area::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.sidebar-nav {
  z-index: 10;
  width: 280px;
  background-color: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
}
.user-profile {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 25px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #d90429;
  margin-right: 15px;
}
.user-info {
  display: flex;
  flex-direction: column;
}
.user-name {
  color: #f0f0f0;
  font-weight: bold;
  font-size: 1.1em;
}
.user-role {
  color: #b0b0b0;
  font-size: 0.9em;
}
.main-nav {
  flex-grow: 1;
}
.main-nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nav-button {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  background-color: transparent;
  color: #e0e0e0;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  text-decoration: none;
}
.nav-button :deep(svg) {
  width: 24px;
  height: 24px;
  stroke-width: 1.5;
}
.nav-button:hover {
  background-color: rgba(217, 4, 41, 0.2);
  color: #ffffff;
}
.nav-button.active {
  background-color: #d90429;
  color: #ffffff;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(217, 4, 41, 0.4);
}
.nav-button.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 70%;
  width: 4px;
  background-color: #ffffff;
  border-radius: 0 4px 4px 0;
}
.logout-section {
  padding-top: 15px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.nav-button.logout:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
