<script setup> </script>
<template>
<div class="fondo">
  <header class="header">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" class="logo" />
    <nav>
      <a href="#">Inicio</a>
      <a href="#">Mi perfil</a>
    </nav>
    <input class="search" placeholder="Buscar" />
    <div class="avatar"></div>
  </header>
  <div class="content">
    <aside class="sidebar">
      <div class="section-label"></div>
      <ul class="menu">
  <li :class="{ active: activeMenu === 'Inicio' }" @click="activeMenu = 'Inicio'">
    <a href="#inicio" style="color: inherit; text-decoration: none;">🏠 Inicio</a>
  </li>
  <li :class="{ active: activeMenu === 'Solicitudes' }" @click="activeMenu = 'Solicitudes'">
    <a href="/solicitud_apro" style="color: inherit; text-decoration: none;">📄 Solicitudes</a>
  </li>
  <li :class="{ active: activeMenu === 'Evidencia' }" @click="activeMenu = 'Evidencia'">
    <a href="/evidencia_sub" style="color: inherit; text-decoration: none;">🖼️ Evidencia</a>
  </li>
</ul>
      <button class="btn-subir">Subir</button>
    </aside>
    <main class="main-form">
      <div class="section-label section-main"></div>
      <form class="formulario">
        <div class="fila">
          <input placeholder="Nombre" />
          <input placeholder="Apellidos" />
          <input placeholder="teléfono" />
        </div>
        <div class="fila">
          <input placeholder="Ocupación" />
          <input placeholder="Numero de horas" />
          <input placeholder="Fecha" />
        </div>
        <div class="fila">
          <input placeholder="Centro o lugar de acción social" />
          <input placeholder="Poblacion intervenida" />
        </div>
        <div class="fila">
          <input placeholder="Dirección" />
          <input placeholder="Barrio" />
          <input placeholder="Ciudad" />
        </div>
        <div class="fila firma">
          <button type="button" class="btn-firma">
            Verificación firma <span class="icon-firma">📁</span>
          </button>
        </div>
      </form>
    </main>
  </div>
</div>
</template>

<style scoped>
.fondo {
min-height: 100vh;
background: #fff;
}
.header {
display: flex; align-items: center; background: #d90000; padding: 0 2rem; height: 80px;
}
.logo { height: 60px; margin-right: 1rem; background: #fff; padding: 0.2rem 0.5rem; border-radius: 4px; }
.header nav { flex: 1; }
.header nav a { color: #000; font-weight: bold; margin: 0 1rem; text-decoration: none; }
.search { border-radius: 20px; border: none; padding: 0.5rem 1rem; margin-right: 1rem; background: #fff; width: 180px; }
.avatar { width: 40px; height: 40px; background: #1ec900; border-radius: 50%; margin-left: 1rem; }
.content { display: flex; margin-top: 1rem; }
.sidebar {
width: 220px; background: #fff; border-radius: 20px; margin-left: 1rem; padding: 1.5rem 1rem 1rem 1rem;
box-shadow: 0 2px 8px #0001; display: flex; flex-direction: column; align-items: flex-start;
}
.section-label {
background: #eee; border-radius: 8px; padding: 0.4rem 0.7rem; font-size: 1rem; color: #222; font-weight: 600; text-align: center; margin-bottom: 1.2rem;
}
.menu { list-style: none; padding: 0; margin: 0 0 2rem 0; width: 100%; }
.menu li { padding: 0.7rem 1rem; border-radius: 8px; margin-bottom: 0.5rem; cursor: pointer; font-weight: 600; color: #222; }
.menu li.active, .menu li:hover { background: #ffd6d6; color: #d90000; }
.btn-subir { background: #d90000; color: #fff; border: none; border-radius: 12px; padding: 0.7em 2em; font-size: 1.1em; font-weight: bold; margin-top: auto; cursor: pointer; width: 100%; }
.main-form {
flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
}
.section-main { margin-bottom: 1.5rem; margin-top: 0.5rem; }
.formulario {
background: rgba(255,255,255,0.85); border-radius: 24px; padding: 2rem 2rem 1rem 2rem; box-shadow: 0 2px 8px #0002;
display: flex; flex-direction: column; gap: 1.1rem; min-width: 600px;
}
.fila { display: flex; gap: 1.1rem; }
.fila input {
flex: 1; padding: 0.7em 1em; border-radius: 10px; border: none; background: #bdbdbd; color: #333; font-size: 1em; font-weight: 600;
}
.fila.firma { justify-content: flex-end; }
.btn-firma {
background: #222; color: #fff; border: none; border-radius: 12px; padding: 0.7em 2.5em; font-size: 1.1em; font-weight: bold; display: flex; align-items: center; gap: 0.7em; cursor: pointer;
}
.icon-firma { font-size: 1.2em; }
@media (max-width: 900px) {
.formulario { min-width: 90vw; padding: 1rem; }
.sidebar { width: 100px; padding: 1rem 0.5rem; }
.fila { flex-direction: column; gap: 0.7rem; }
}
</style>