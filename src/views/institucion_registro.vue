<script setup> </script>
<template>
  <div class="app-container">
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
      <aside class="sidebar">
  <ul>
    <li class="active">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
      </svg>
    </li>
    <li>
      <a href="/agregar_institucion" style="color: inherit; text-decoration: none; display: block;">Institucion</a>
    </li>
  </ul>
</aside>

      <section class="content-panel">
        <div class="info-text">
            <blockquote class="welcome-quote">
                "Bienvenido al registro de instituciones, donde podrás gestionar, organizar y validar la información de manera sencilla y efectiva."
            </blockquote>
            <hr class="separator" />
            <p>
                Este formulario te permite registrar Instituciones de manera organizada. Está dividido en tres partes:
            </p>
            <ol>
                <li><strong>Datos de la institución:</strong> nombre, tipo, dirección, teléfono y correo institucional.</li>
                <li><strong>Encargado o representante:</strong> Información básica del responsable (nombre, cargo, correo y teléfono).</li>
                <li><strong>Gestión de registro:</strong> confirmar, guardar y disponer la institución para su uso en actividades o proyectos.</li>
            </ol>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardInstitucion'
}
</script>

<style scoped>
/* Estilos Generales y de Encabezado (sin cambios) */
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('https://scontent.feoh3-1.fna.fbcdn.net/v/t51.75761-15/481610614_18306353359227867_8885988781752331401_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG48Zk_KecLM9jpd4x-t2rKj7P_FqscypGPs_8WqxzKkZxSA_-z3Fof4PiSfNPs7L6jOELnYlGZlzGvlQLEcX-z&_nc_ohc=_mGcrzTpfGIQ7kNvwEge5VC&_nc_oc=AdkkzlL0pOOyV-hcvk2snjL4QhWpfE8Z-zkAWpDPhzoJr0X2d_uy8GKgaCIjuj6VYwKK-q41zaOoYHPX28WNk1-v&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=hWl9J-dgLl_yZm5Zo6bs5g&oh=00_AfZg3EH2GU7GPpJRh08rIw4pdgVGr5X965b7dV5I-IrrEQ&oe=68CA8FD1');
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
.sidebar, .content-panel {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

/* Barra Lateral (Sidebar) */
.sidebar {
  width: 250px;
  padding: 20px;
  color: #333;
}
.sidebar ul { list-style: none; padding: 0; margin: 0; }
.sidebar li {
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
.sidebar li.active { background-color: #ff0000; color: white; font-weight: bold; }
.sidebar li.active::before { content: ''; position: absolute; left: -20px; top: 50%; transform: translateY(-50%); border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #ff0000; }
.sidebar li svg {
    width: 28px;
    height: 28px;
}

/* Panel de Contenido Informativo (ESTILOS NUEVOS) */
.content-panel {
  flex-grow: 1;
  padding: 25px 45px;
  display: flex;
  flex-direction: column;
}
.content-panel h2 { color: #333; margin-top: 0; margin-bottom: 25px; font-size: 24px; text-align: left; }
.info-text {
    text-align: center;
    color: #333;
    font-size: 1.1rem;
    line-height: 1.6;
}
.welcome-quote {
    font-size: 1.3rem;
    font-style: italic;
    color: #111;
    margin: 20px 0 30px 0;
    padding: 0 20px;
    border: none;
}
.separator {
    border: none;
    height: 2px;
    background-color: #ff0000;
    width: 80%;
    margin: 0 auto 30px auto;
}
.info-text p {
    margin-bottom: 25px;
}
.info-text ol {
    text-align: left;
    padding-left: 40px; /* Alinea la lista un poco a la derecha */
    display: inline-block; /* Permite que la lista se centre como bloque */
}
.info-text ol li {
    margin-bottom: 15px;
}
.info-text ol li strong {
    color: #000;
}
</style>