# Guía 00 · El flujo de trabajo del estudio

> Léela primero. Es el "cómo trabajamos" que hace que todo lo demás funcione.

## 1. El ciclo de toda pieza

```
idea/pedido → borrador (v1, v2, …) → validación de Pau → MÁSTER → pieza final rotulada
```

- **Nada es final sin validación explícita.** Los borradores se numeran (v1, v2…);
  cuando Pau valida, esa versión se marca como máster en el README del proyecto.
- Las iteraciones son **rápidas y conversadas**: se entrega el borrador, se escucha el
  feedback (a veces por notas de voz), se ajusta lo puntual — no se rehace todo.
- El feedback de Pau es soberano incluso contra "mejores prácticas": si pide algo, se hace eso.

## 2. Base única (la regla que más errores evita)

Cuando existe una pieza canónica validada (el PPTX de una sesión, el DOCX de un guion),
las variantes se generan **clonando la canónica y reemplazando contenido por código**
(`motor/presentaciones/base_unica_swap.py`, o el patrón equivalente en Word).
**PROHIBIDO** reconstruir un layout propio "parecido": siempre termina distinto y hay que rehacerlo.
Si el cliente sube una nueva versión de la base, esa pasa a ser la canónica y las variantes se regeneran.

## 3. Rotulado de entregables

Los archivos que ve el cliente llevan nombre rotulado: `(NOVAR)_<Proyecto>_<Pieza>_<VARIANTE>.<ext>`
(ej.: `(NOVAR)_S2_momentos_CALL.pdf`). Los borradores llevan la versión: `..._v3.mp3`.

## 4. Prohibiciones permanentes (aprendidas a costo real)

1. 🚫 Escribir la palabra **"linkedin"** en un footer — SIEMPRE el ícono "in" dorado
   (`sello-novar/logos/linkedin-gold.svg`), del mismo color que el texto `novarconsultores`.
2. 🚫 Usar el **logo del cliente** sin instrucción explícita.
3. 🚫 Inventar datos declarados (cifras, indicadores, citas). Ante duda, preguntar.
4. 🚫 Entregar un Word sin pasar `motor/documentos/validar_ooxml.py` (✅ obligatorio).
5. 🚫 Entregar una pieza visual sin QA visual (abrir/extraer imagen y MIRARLA).
6. 🚫 Dejar archivos de prueba ensuciando el repo — los borradores intermedios viven
   fuera del repo o se limpian; al repo entra lo que tiene valor.
7. 🚫 Claves de API en el repo (van por variables de entorno).

## 5. Validación técnica por tipo

| Pieza | Verificación obligatoria |
|---|---|
| Word (.docx) | `validar_ooxml.py` → "✅ XML OK" |
| PDF/PNG | Extraer y mirar la imagen (footer, cortes, tipografías) |
| Audio | Escuchar completo; duración vs objetivo; sin artefactos ("lluvia" = modelo equivocado) |
| Video | Extraer grilla de cuadros clave (`ffmpeg -ss N -frames:v 1`) y revisarla |
| PPTX | Abrir y revisar las láminas modificadas + 1 genérica |

## 6. Idioma y tono

- Español latinoamericano **coloquial cálido**. Dos extremos prohibidos: modismos locales
  forzados ("pa'", "po'") y neutro acartonado de doblaje. La zona correcta está al medio.
- "solo" sin tilde salvo ambigüedad.
- Tono editorial NOVAR: sobrio, directo, cuidado. En humor: naturalidad > sobreactuación.

## 7. Semántica de color (regla de Pau, 20-jul-2026)

La paleta asignada a un artefacto de aprendizaje es **EXCLUSIVA** de ese artefacto y no se
reusa con otro significado en el mismo programa: los humanos asocian inconscientemente y
los "semáforos" se contaminan. Cada artefacto nuevo recibe su propia familia de color
(una rampa monocromática de una familia nueva es una solución segura y elegante).
Esto es distinto de los colores de MARCA, que son transversales por definición.
Antes de colorear una pieza nueva: revisar qué paletas semánticas ya existen en el proyecto.
