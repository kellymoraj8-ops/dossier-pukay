
"use strict";

// Seguridad del esqueleto PUKAY.
// ADR-002: hash de contraseñas con sal y token de autenticación.
//
// Este archivo pertenece al esqueleto Node.js utilizado
// para validar la cadena CASE.
// No sustituye al backend PHP/MySQL real de PUKAY.

const crypto = require("crypto");

// Generar hash seguro de contraseña con sal aleatoria.
function generarHash(password) {
  const sal = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .scryptSync(password, sal, 32)
    .toString("hex");

  return {
    sal,
    hash,
  };
}

// Verificar la contraseña ingresada.
function verificarPassword(password, sal, hashGuardado) {
  const hash = crypto.scryptSync(password, sal, 32);

  const esperado = Buffer.from(hashGuardado, "hex");

  return (
    hash.length === esperado.length &&
    crypto.timingSafeEqual(hash, esperado)
  );
}

// Generar token de autenticación.
//
// 32 bytes = 64 caracteres hexadecimales.
// Compatible con el formato definido en OpenAPI.
function generarToken() {
  return crypto.randomBytes(32).toString("hex");
}

module.exports = {
  generarHash,
  verificarPassword,
  generarToken,
};
