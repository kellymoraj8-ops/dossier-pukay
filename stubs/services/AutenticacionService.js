/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Iniciar sesion
* Valida las credenciales del deportista. Devuelve un token con vigencia de 24 horas. 
*
* loginRequest LoginRequest 
* returns LoginResponse
* */
const iniciarSesion = ({ loginRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        loginRequest,
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
  iniciarSesion,
};
