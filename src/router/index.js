import { createRouter, createWebHistory } from 'vue-router'
import ing_profesores from '../views/ing_profesores.vue'
import ing_estudiantes from '../views/ing_estudiantes.vue'
import olvid_contrasena from '../views/olvid_contrasena.vue'
import Student_progress from '../views/student_progress.vue'
import evidencia_sub from '../views/evidencia_sub.vue'
import pregun_frecu from '../views/pregun_frecu.vue'
import solicitud_apro from '../views/solicitud_apro.vue'
import ini_estudiante from '../views/ini_estudiante.vue'
import ini_docentes from '../views/ini_docentes.vue'
import actividades_ver from '../views/actividades_ver.vue'
import actividades_registro from '../views/actividades_registro.vue'
import encargado_registro from '../views/encargado_registro.vue'
import organizacion_registro from '../views/organizacion_registro.vue'
import ini_rol from '../views/ini_rol.vue'
import institucion_registro from '@/views/institucion_registro.vue'
import agregar_institucion from '@/views/agregar_institucion.vue'
import encargadoi_registro from '@/views/encargadoi_registro.vue'
import agregar_encargado from '@/views/agregar_encargado.vue'
import actividad_registro from '@/views/actividad_registro.vue'
import agregar_actividad from '@/views/agregar_actividad.vue'
import actividad_vista from '@/views/actividad_vista.vue'
import encargado_vista from '@/views/encargado_vista.vue'
import institucion_vista from '@/views/institucion_vista.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/ing_profesores",
      name: "ing_profesores",
      component: ing_profesores
    },
    {
      path: "/ing_estudiantes",
      name: "ing_estudiantes",
      component: ing_estudiantes
    },
    {
      path: "/olvid_contrasena",
      name: "olvid_contrasena",
      component: olvid_contrasena
    },
    {
      path: "/student_progress",
      name: "student_progress",
      component: Student_progress
    },
    {
      path: "/pregun_frecu",
      name: "pregun_frecu",
      component: pregun_frecu
    },
    {
      path: "/evidencia_sub",
      name: "evidencia_sub",
      component: evidencia_sub
    },
    {
      path: "/solicitud_apro",
      name: "solicitud_apro",
      component: solicitud_apro
    },
    {
      path: "/ini_estudiante",
      name: "ini_estudiante",
      component: ini_estudiante
    },
    {
      path: "/ini_docentes",
      name: "ini_docentes",
      component: ini_docentes
    },
    {

      path: "/actividades_ver/:idEstudiante",
      name: "actividades_ver",
      component: actividades_ver, 
      props: true

    },
    {
      path: "/actividades_registro/:actividadId",
      name: "actividades_registro",
      component: actividades_registro,
      props: true
    },
    {
      path: "/encargado_registro/:actividadId",
      name: "encargado_registro",
      component: encargado_registro,
      props: true
    },
    {
      path: "/organizacion_registro/:actividadId",
      name: "organizacion_registro",
      component: organizacion_registro,
      props: true
    },
    {
      path: "/",
      name: "ini_rol",
      component: ini_rol
    },
    {
      path: "/institucion_registro",
      name: "institucion_registro",
      component: institucion_registro
    },
    {
      path: "/agregar_institucion",
      name: "agregar_institucion",
      component: agregar_institucion
    },
    {
      path: "/encargadoi_registro",
      name: "encargadoi_registro",
      component: encargadoi_registro
    },
    {
      path: "/agregar_encargado",
      name: "agregar_encargado",
      component: agregar_encargado
    },
    {
      path: "/actividad_registro",
      name: "actividad_registro",
      component: actividad_registro
    },
    {
      path: "/agregar_actividad",
      name: "agregar_actividad",
      component: agregar_actividad
    },
    {
      path: "/actividad_vista",
      name: "actividad_vista",
      component: actividad_vista
    },
    {
      path: "/encargado_vista",
      name: "encargado_vista",
      component: encargado_vista
    },
    {
      path: "/institucion_vista",
      name: "institucion_vista",
      component: institucion_vista
    }
  ]
})

export default router;