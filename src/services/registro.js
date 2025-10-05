import api from "./api" 

export async function registrarEstudianteCompleto(registroData) {

    const res = await api.post('/estudiante/registro', registroData);
    return res.data;
}

export async function registrarDocenteCompleto(registroData) {

    const res = await api.post('/docente/registro', registroData);
    return res.data;
}