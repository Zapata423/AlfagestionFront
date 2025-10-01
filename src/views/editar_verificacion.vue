<script setup> </script>
<template>
<div class="fondo">
  <header class="header">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" class="logo" />
    <nav>
      <a href="/ini_estudiante">Inicio</a>
    </nav>
    <input class="search" placeholder="Buscar" />
    <div class="avatar"></div>
  </header>
  <div class="content">
    <aside class="sidebar">
      <button class="btn-soporte">Ir a soporte tecnico</button>
      <button class="btn-volver">Volver</button>
      <img class="manual" src="https://i.calameoassets.com/240116160850-4e89cb7844ff07bf7ada72186e89b381/large.jpg" alt="Manual de Convivencia" />
    </aside>
    <main class="main-faq">
      <h1 class="titulo">Preguntas Frecuentes</h1>
      <div class="faq-list">
        <ul>
          <li>
            <b>1. ¿Qué es el servicio social estudiantil obligatorio en Colombia?</b>
          </li>
          <li>
            <b>2. ¿Qué actividades realiza un estudiante voluntario en un proyecto de alfabetización?</b>
            <ul class="sub-list">
              <li>- Alfabetizar jóvenes y adultos</li>
              <li>- Apoyar procesos educativos</li>
              <li>- Colaborar en actividades lúdico-pedagógicas</li>
              <li>- Acompañar tareas escolares</li>
              <li>- Organizar y participar en campañas educativas</li>
            </ul>
          </li>
          <li>
            <b>3. ¿Dónde se pueden realizar estas actividades?</b>
          </li>
          <li>
            <b>4. ¿Cómo se registra y valida este trabajo como horas sociales?</b>
          </li>
        </ul>
      </div>
    </main>
  </div>
</div>
</template>

<style scoped>
.fondo {
  min-height: 100vh;
  background: #7a7a7a;
  background-image: url('/img/fondo 1.jpeg');
  background-size: cover;
  background-position: center;
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
width: 320px; background: transparent; display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
}
.btn-soporte, .btn-volver {
width: 90%; background: #eaeaea; border: none; border-radius: 12px; padding: 0.7em 0; font-size: 1.1em; font-weight: bold; margin-bottom: 0.5rem; cursor: pointer;
}
.manual {
width: 90%; border-radius: 12px; margin-top: 1rem; box-shadow: 0 2px 8px #0002;
}
.main-faq {
flex: 1; margin-left: 2rem; background: rgba(255,255,255,0.85); border-radius: 24px; padding: 2rem 2.5rem; box-shadow: 0 2px 8px #0002; min-width: 500px;
}
.titulo {
font-family: 'Orbitron', Arial, sans-serif; font-size: 2.2rem; font-weight: bold; margin-bottom: 1.5rem; text-align: center;
}
.faq-list ul {
list-style: disc inside; font-size: 1.2rem; font-family: 'Orbitron', Arial, sans-serif; color: #111; padding-left: 0;
}
.faq-list li {
margin-bottom: 1.1rem;
}
.sub-list {
list-style: none; margin-top: 0.5rem; margin-left: 1.5rem; font-size: 1.1rem;
}
.sub-list li { margin-bottom: 0.3rem; }
@media (max-width: 900px) {
.content { flex-direction: column; }
.sidebar { width: 100%; flex-direction: row; gap: 0.5rem; }
.main-faq { min-width: unset; padding: 1rem; margin-left: 0;  }
}
</style>