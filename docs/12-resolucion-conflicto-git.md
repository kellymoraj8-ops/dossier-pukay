# Resolución de conflicto Git — PUKAY

## 1. Objetivo
Demostrar la detección y resolución de un conflicto real de integración entre dos ramas del repositorio PUKAY.

## 2. Escenario
Se crearon dos ramas independientes desde `main`:
- `test/conflicto-oscar`
- `test/conflicto-kelly`

Ambos integrantes modificaron la misma línea del archivo `evidencias/prueba-conflicto-git.md`, utilizando contenidos diferentes.

## 3. Causa del conflicto
La rama de Oscar fue integrada primero en `main`. Al intentar integrar la rama de Kelly mediante el Pull Request #16, Git detectó cambios incompatibles sobre la misma región del archivo.

GitHub bloqueó la fusión automática y mostró el mensaje `This branch has conflicts that must be resolved`.

## 4. Identificación
Se observaron los marcadores de conflicto:
- `<<<<<<<`: inicio de una versión.
- `=======`: separación entre versiones.
- `>>>>>>>`: final de la otra versión.

## 5. Resolución aplicada
Se utilizó el editor de conflictos de GitHub para sustituir las versiones incompatibles por un resultado consensuado que reconoce los aportes de Oscar y Kelly.

Se eliminaron los marcadores, se seleccionó `Mark as resolved` y se confirmó mediante `Commit merge`.

Posteriormente, se verificó el mensaje `No conflicts with base branch`, se obtuvo la aprobación correspondiente y se fusionó el Pull Request #16.

## 6. Medidas preventivas
- Sincronizar las ramas de trabajo con `main` antes de integrar cambios.
- Coordinar las modificaciones sobre archivos compartidos.
- Mantener cambios pequeños y commits descriptivos.
- Utilizar Pull Requests con revisión de otros integrantes.
- Verificar los conflictos antes de aprobar una fusión.

## 7. Evidencias
- [Conflicto detectado](../evidencias/conflicto-git-detectado.png)
- [Marcadores del conflicto](../evidencias/conflicto-git-marcadores.png)
- [Pull Request #16](https://github.com/kellymoraj8-ops/dossier-pukay/pull/16)
- [Issue #13](https://github.com/kellymoraj8-ops/dossier-pukay/issues/13)

## 8. Resultado
Se demostró la detección, resolución manual, revisión y fusión de un conflicto Git real, manteniendo la trazabilidad de las modificaciones en PUKAY.
