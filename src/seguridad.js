"use strict";
// Seguridad del esqueleto (ADR-002: hash con sal y token).
// Es un esqueleto para ejercitar la cadena CASE; no sustituye al backend PHP de PUKAY.
const crypto = require("crypto");

function generarHash(password) {
  const sal = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, sal, 32).toString("hex");
  return { sal, hash };
}

function verificarPassword(password, sal, hashGuardado) {
  const hash = crypto.scryptSync(password, sal, 32);
  const esperado = Buffer.from(hashGuardado, "hex");
  return hash.length === esperado.length && crypto.timingSafeEqual(hash, esperado);
}

function generarToken() {
  return crypto.randomBytes(16).toString("hex");
}

module.exports = { generarHash, verificarPassword, generarToken };
