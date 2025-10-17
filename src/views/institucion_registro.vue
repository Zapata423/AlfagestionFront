<script setup>
import { useRouter } from 'vue-router'
import estudianteNavbar from "./estudianteNavbar.vue"

const router = useRouter()

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
          <li class="active">
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
          <li>
            <a
              href="/agregar_institucion"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Institución
            </a>
          </li>
        </ul>
        <div class="sidebar-action">
          <button class="back-button" @click="cancelAction">Cancelar</button>
        </div>
      </aside>
      <section class="content-panel">
        <div class="info-text">
          <blockquote class="welcome-quote">
            “Bienvenido al registro de instituciones, donde podrás ingresar la información de las entidades de manera clara, ordenada y eficiente.”
          </blockquote>
          <hr class="separator" />
          <p>
            Este formulario ha sido diseñado para facilitar el registro de las instituciones en las cuales realizas tus horas de proyección social. Antes de completar la información, ten en cuenta las siguientes recomendaciones:
          </p>
          <ol>
            <li>El registro consta de siete campos, los cuales deben ser diligenciados con precisión y responsabilidad.</li>
            <li>Antes de completar el formulario, asegúrate de que la institución esté autorizada por el colegio.</li>
            <li>Registra únicamente datos verificables de las instituciones, ya que serán revisados y validados por un docente.</li>
            <li>En caso de no contar con algún dato o si este no aplica, ingresa <strong>N/A</strong> </li>
            <li>Ten en cuenta que, al eliminar una institución registrada, se eliminarán automáticamente las actividades asociadas a ella.</li>
          </ol>
          <p>
            Ante cualquier duda, dirígete al <strong>Módulo Informativo</strong> o contacta a un docente responsable.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
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
.sidebar, .content-panel {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}
.sidebar {
  width: 342px;
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
    margin-top: auto; 
    padding-top: 20px;
}
.back-button {
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
.back-button:hover {
    background-color: #d60000;
}
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
    height: 3px; 
    background-color: #ff0000;
    width: 100%; 
    margin: 0 auto 30px auto;
}
.info-text p {
    margin-bottom: 25px;
    text-align: left; 
}
.info-text ol {
    text-align: left;
    padding-left: 25px; 
}
.info-text ol li {
    margin-bottom: 15px;
}
.info-text ol li strong {
    color: #000;
}
</style>