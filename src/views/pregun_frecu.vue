<script setup>
import { reactive } from "vue"
import estudianteNavbar from "./estudianteNavbar.vue"

const faqItems = reactive([
  {
    question: "¿Qué es el servicio social obligatorio y por qué debo realizarlo?",
    answer:
      "Es una actividad formativa exigida por el Ministerio de Educación que busca fomentar la responsabilidad social y el compromiso con la comunidad en los estudiantes.",
    isOpen: false,
  },
  {
    question: "¿Cuántas horas debo cumplir para graduarme?",
    answer: "Debes cumplir 80 horas de servicio social obligatorio para poder graduarte.",
    isOpen: false,
  },
  {
    question: "¿En qué grados se realiza el servicio social?",
    answer: "Se desarrolla entre los grados 10° y 11°.",
    isOpen: false,
  },
  {
    question: "¿Qué tipo de actividades puedo hacer para cumplir con las horas?",
    answer:
      "Puedes participar en programas de alfabetización, apoyo académico, actividades ecológicas o de servicio comunitario aprobadas por la institución.",
    isOpen: false,
  },
  {
    question: "¿Dónde puedo realizar el servicio social?",
    answer:
      "En el Instituto San Carlos de La Salle o en entidades externas que tengan convenio con el colegio.",
    isOpen: false,
  },
  {
    question: "¿Puedo hacer el servicio social fuera del colegio?",
    answer:
      "Sí, siempre que la institución o entidad esté autorizada por el colegio y las actividades sean verificables.",
    isOpen: false,
  },
  {
    question: "¿Quién valida mis horas y actividades?",
    answer:
      "Los docentes encargados y el coordinador del programa son quienes revisan y aprueban las horas registradas.",
    isOpen: false,
  },
  {
    question: "¿Cómo registro mis horas en la plataforma?",
    answer:
      "Debes ingresar al sistema, completar el formulario de registro de actividad, subir las evidencias y esperar la validación del docente.",
    isOpen: false,
  },
  {
    question: "¿Qué pasa si no entrego las evidencias a tiempo?",
    answer: "Tus horas no serán validadas hasta que entregues las evidencias requeridas.",
    isOpen: false,
  },
  {
    question: "¿Puedo repetir una actividad si no fue aprobada?",
    answer:
      "Sí, puedes realizarla nuevamente o reemplazarla por otra con el visto bueno del docente.",
    isOpen: false,
  },
  {
    question: "¿Cómo sé cuántas horas llevo acumuladas?",
    answer:
      "La plataforma muestra un contador actualizado en el apartado 'Gestión de Horas' con tus horas registradas, aprobadas y pendientes.",
    isOpen: false,
  },
  {
    question: "¿Qué tipo de evidencia debo subir a la plataforma?",
    answer:
      "Fotografías, informes, registros de asistencia o documentos que comprueben tu participación en la actividad.",
    isOpen: false,
  },
  {
    question: "¿Qué ocurre si no completo las horas requeridas antes del grado 11°?",
    answer: "No podrás graduarte hasta cumplir la totalidad de las horas exigidas por el programa.",
    isOpen: false,
  },
  {
    question: "¿Puedo realizar el servicio social durante vacaciones o fuera del horario escolar?",
    answer:
      "Sí, siempre que las actividades estén previamente aprobadas y registradas en la plataforma.",
    isOpen: false,
  },
  {
    question: "¿A quién puedo acudir si tengo problemas con el registro o validación de mis horas?",
    answer:
      "Puedes comunicarte con el docente encargado del servicio social o el coordinador académico para recibir apoyo.",
    isOpen: false,
  },
])

function toggleFaq(item) {
  item.isOpen = !item.isOpen
}
</script>

<template>
  <div class="fondo">
    <estudianteNavbar />
    <div class="content">
      <a href="/ini_estudiante" class="back-button">←</a>
      <main class="main-faq">
        <h1 class="titulo">Preguntas Frecuentes</h1>
        <div class="faq-list">
          <ul>
            <li v-for="(item, index) in faqItems" :key="index">
              <b
                :class="{ question: true, active: item.isOpen }"
                @click="toggleFaq(item)"
              >
                {{ index + 1 }}. {{ item.question }}
              </b>
              <p v-if="item.isOpen" class="answer">
                {{ item.answer }}
              </p>
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
  background-image: url("../assets/img/cafeteria.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 1rem;
  padding-left: 60px;
}
.main-faq {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  padding: 2rem 2.5rem;
  box-shadow: 0 2px 8px #0002;
  min-width: 500px;
  max-width: 900px;
  width: 90%;
}
.titulo {
  font-family: "Orbitron", Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}
.faq-list ul {
  list-style: none;
  font-size: 1.2rem;
  font-family: "Orbitron", Arial, sans-serif;
  color: #111;
  padding-left: 0;
}
.faq-list li {
  margin-bottom: 1.5rem;
}
@media (max-width: 900px) {
  .content {
    flex-direction: column;
    padding-left: 0;
  }
  .main-faq {
    min-width: unset;
    padding: 1rem;
    margin: 1rem auto;
    width: 95%;
  }
  .back-button {
    top: 90px;
    left: 10px;
  }
}
.question {
  display: block;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 0;
  transition: color 0.2s;
  font-weight: bold;
  position: relative;
  padding-right: 30px;
}
.question::after {
  content: "+";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  line-height: 1;
  transition: transform 0.2s;
}
.question.active {
  color: #d90000;
}
.question.active::after {
  content: "−";
  transform: translateY(-50%) rotate(0deg);
}
.answer {
  padding: 10px 20px;
  margin-top: 5px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  border-left: 4px solid #d90000;
  font-size: 1.1rem;
  color: #333;
}
.back-button {
  position: fixed;
  top: 75px;
  left: 20px;
  background-color: #e53935;
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  z-index: 1000;
  text-decoration: none;
}
.back-button:hover {
  background-color: #c62828;
  transform: scale(1.1);
}
</style>
