<script setup>
import { useRouter } from 'vue-router'
import estudianteNavbar from "./estudianteNavbar.vue"

const router = useRouter()
// Función para simular la acción del botón "Cancelar" y navegar a otra vista
function cancelAction() {
  router.push('/encargado_vista')
}
</script>
<template>
  <div class="app-container">
    <estudianteNavbar />

    <main class="main-content">
      <aside class="sidebar">
        <ul>
          <li class="active">
            <a href="/encargadoi_registro" style="color: inherit; text-decoration: none; display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
              </svg>
            </a>
          </li>
          <li>
            <a href="/agregar_encargado" style="color: inherit; text-decoration: none; display: block;">
              Encargado
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
              “Bienvenido al registro de encargados, donde podrás ingresar la información de la persona responsable de acompañar tu proceso de proyección social de manera clara, ordenada y eficiente.”
            </blockquote>
            <hr class="separator" />
            <p>
              Este formulario ha sido diseñado para facilitar el registro de los encargados asociados a las instituciones en las cuales realizas tus horas de proyección social. Antes de completar la información, ten en cuenta las siguientes recomendaciones:
            </p>
            <ol>
              <li>El registro consta de seis campos, los cuales deben ser diligenciados con precisión y responsabilidad.</li>
              <li>Registra únicamente datos verificables de la persona encargada, ya que serán revisados y validados por un docente.</li>
              <li>En caso de no contar con algún dato o si este no aplica, ingresa <strong>N/A</strong> y acláralo en el campo de observaciones.</li>
              <li>Si aún no cuentas con un encargado asignado, ingresa <strong>N/A</strong> en todos los campos y justifica la razón en las observaciones.</li>
              <li>Ten en cuenta que, al eliminar un encargado registrado, se eliminarán automáticamente las actividades asociadas a este.</li>
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
export default {
  name: 'DashboardEncargadoInfo'
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: url('../assets/img/cafeteria.png') no-repeat center center fixed;
  background-size: cover;
  position: relative;
}
/* Contenido Principal (sin cambios) */
.main-content {
  flex-grow: 1;
  display: flex;
  padding: 30px;
  gap: 30px;
}

/* Efecto de Cristal (Glassmorphism) (sin cambios) */
.sidebar, .content-panel {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

/* Barra Lateral (Sidebar) - MODIFICADO para usar Flexbox y empujar el botón */
.sidebar {
  width: 387px;
  padding: 20px;
  color: #333;
  /* CAMBIO: Añadimos display flex y flex-direction column */
  display: flex;
  flex-direction: column;
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

/* Contenedor de Acción - MODIFICADO para empujar hacia abajo */
.sidebar-action {
    /* CAMBIO: Empuja este contenedor y su contenido al fondo */
    margin-top: auto; 
    padding-top: 20px;
}

/* Panel de Contenido Informativo (sin cambios) */
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
</style>