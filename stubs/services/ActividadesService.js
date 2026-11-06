/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Actualizar actividad deportiva
* Modifica una actividad del usuario autenticado. Solo permite actualizar actividades propias. 
*
* actualizarActividadRequest ActualizarActividadRequest 
* returns EstadoResponse
* */
const actualizarActividad = ({ actualizarActividadRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        actualizarActividadRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Eliminar actividad deportiva
* Elimina una actividad perteneciente al usuario autenticado. 
*
* eliminarActividadRequest EliminarActividadRequest 
* returns EstadoResponse
* */
const eliminarActividad = ({ eliminarActividadRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        eliminarActividadRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Consultar historial deportivo
* Obtiene las actividades del usuario autenticado. Los resultados se ordenan por fecha e ID de forma descendente. 
*
* returns ListaActividadesResponse
* */
const listarActividades = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Registrar actividad deportiva
* Registra una actividad para el usuario autenticado. HU-001, CA-01, CA-02 y CA-03. La fecha debe ser valida y no futura. La duracion debe ser mayor que cero. La distancia no puede ser negativa. 
*
* actividadRequest ActividadRequest 
* returns RegistroResponse
* */
const registrarActividad = ({ actividadRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        actividadRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  actualizarActividad,
  eliminarActividad,
  listarActividades,
  registrarActividad,
};
