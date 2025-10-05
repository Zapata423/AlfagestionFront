import { createRouter, createWebHistory } from 'vue-router'
import ing_profesores from '../views/ing_profesores.vue'
import ing_estudiantes from '../views/ing_estudiantes.vue'
import ing_admin from '../views/ing_admin.vue'
import olvid_contrasena from '../views/olvid_contrasena.vue'
import Student_progress from '../views/student_progress.vue'
import pregun_frecu from '../views/pregun_frecu.vue'
import solicitud_apro from '../views/solicitud_apro.vue'
import ini_estudiante from '../views/ini_estudiante.vue'
import ini_docentes from '../views/ini_docentes.vue'
import ini_admin from '../views/ini_admin.vue'
import actividades_ver from '../views/actividades_ver.vue'
import verificar_actividad from '../views/verificar_actividad.vue'
import editar_verificacion from '../views/editar_verificacion.vue'
import ver_comentarios from '../views/ver_comentarios.vue'
import perfil_estudiante from '../views/perfil_estudiante.vue'
import actividades_registro from '../views/actividades_registro.vue'
import encargado_registro from '../views/encargado_registro.vue'
import organizacion_registro from '../views/organizacion_registro.vue'
import ini_rol from '../views/ini_rol.vue'
import registrar_estudiante from '../views/registrar_estudiante.vue'
import registrar_docente from '../views/registrar_docente.vue'
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
      path: "/ing_admin",
      name: "ing_admin",
      component: ing_admin
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
      path: "/ini_admin",
      name: "ini_admin",
      component: ini_admin
    },
    {

      path: "/actividades_ver/:idEstudiante",
      name: "actividades_ver",
      component: actividades_ver, 
      props: true

    },
    {
      path: "/verificar_actividad/:idEstudiante/:actividadId",
      name: "verificar_actividad",
      component: verificar_actividad,
      props: true
    },
    { 
    path: "/ver_comentarios/:actividadId",
    name: "ver_comentarios",
    component: ver_comentarios,
    props: true
    },
    {
    path: "/editar_verificacion/:idEstudiante/:actividadId/:verificacionId",
    name: "editar_verificacion",
    component: editar_verificacion,
    props: true
    },
    {
      path: "/actividades_registro/:idEstudiante/:actividadId",
      name: "actividades_registro",
      component: actividades_registro,
      props: true
    },
    {
      path: "/encargado_registro/:idEstudiante/:actividadId",
      name: "encargado_registro",
      component: encargado_registro,
      props: true
    },
    {
      path: "/organizacion_registro/:idEstudiante/:actividadId",
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
      path: "/perfil_estudiante",
      name: "perfil_estudiante",
      component: perfil_estudiante
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
    },
    {
      path: "/registrar_estudiante",
      name: "registrar_estudiante",
      component: registrar_estudiante
    },
    {
      path: "/registrar_docente",
      name: "registrar_docente",
      component: registrar_docente
    }

  ]
})

export default router;