# NOVAR STUDIO · Instrucciones para agentes (Codex, GPT, Claude o humano)

Este repositorio es el **estudio de producción de NOVAR Consultores**: aquí se generan recursos
audiovisuales y documentales (podcasts, reels/sketches, videos, one-pagers, decks, documentos Word)
para distintos clientes, reutilizando un motor común ya probado en producción real.

**Tu trabajo:** producir piezas para el cliente que te indiquen, usando el motor y las guías,
sin partir nunca de cero y sin romper las reglas de abajo.

---

## 1. Mapa del repo

| Carpeta | Qué es | Regla |
|---|---|---|
| `motor/` | Código reutilizable (generadores de audio, video, PDF, Word, PPT, prompts) | Se mejora, no se duplica. Si arreglas un bug, arréglalo aquí. |
| `sello-novar/` | Patrimonio de marca NOVAR: logos, fuentes Barlow, bumpers de audio validados, casting de voces | NO se modifica sin autorización de Pau. |
| `guias/` | Playbooks con TODO lo aprendido (qué funciona, qué falló y por qué) | Léelas ANTES de producir tu primera pieza de cada tipo. Si aprendes algo nuevo validado, agrégalo. |
| `marcas/` | Design tokens por cliente (`marcas/<cliente>/design-tokens.json`) | Un cliente = una carpeta. Jamás mezclar tokens entre clientes. |
| `referencias/` | Piezas terminadas ejemplares (nivel de calidad esperado) | Solo lectura. Es la vara. |
| `proyectos/` | Trabajo por cliente (`proyectos/<cliente>/…`) | TODO el material de un cliente vive solo aquí. |

## 2. Reglas de oro (no negociables)

1. **Nada se entrega sin validación.** Flujo: borrador → validación de Pau (o el líder del proyecto) → máster.
   Las piezas se iteran por versiones (v1, v2…); el máster se marca explícitamente como VALIDADO.
2. **Base única.** Cuando existe una pieza canónica validada (un PPTX, un DOCX), las variantes se generan
   **clonándola y reemplazando contenido por código** — nunca reconstruyendo un layout propio.
3. **Custodia entre clientes.** El material del cliente A jamás aparece en piezas del cliente B.
   Los ejemplos de `referencias/` son solo referencia interna de calidad.
4. **Footer NOVAR:** `novarchile.com · [ícono "in" dorado] novarconsultores`.
   🚫 **PROHIBIDO escribir la palabra "linkedin"** — siempre el ícono (`sello-novar/logos/linkedin-gold.svg`).
5. **Logos de cliente:** NO se usan salvo instrucción explícita del cliente (vía Pau).
6. **Nunca inventar datos declarados** (cifras, nombres de indicadores, citas). Ante duda: preguntar antes de producir.
7. **Claves de API** solo por variables de entorno (`GEMINI_API_KEY`, etc.). Jamás en el repo, ni en ejemplos.
8. **Verificación antes de entregar:** documentos Word → `motor/documentos/validar_ooxml.py` debe dar ✅;
   piezas visuales → extraer cuadros/páginas y MIRARLAS (QA visual), no asumir que quedaron bien.
9. **Ortografía:** "solo" sin tilde salvo ambigüedad. Español neutro-latino cálido (ver guía de guiones para el matiz).
10. **Git:** commits descriptivos en español; nunca commitear archivos temporales, `node_modules`, ni borradores no validados pesados.

## 3. Flujos por tipo de pieza

- **Audio (podcast, sketch, bumper)** → lee `guias/produccion-audio.md` (modelo TTS, casting de voces,
  prompts de dirección actoral, errores conocidos). Genera con `motor/audio/tts_gemini.py`.
- **Video (reels, cápsulas)** → lee `guias/produccion-video.md`. Proyecto base en `motor/video-remotion/`
  (Remotion: animación por código = personajes consistentes y texto sincronizado; NO usar video generativo
  para personajes de serie).
- **Documentos Word** → lee `guias/documentos-word.md`. Convierte con `motor/documentos/md2docx.py`,
  valida SIEMPRE con `validar_ooxml.py`.
- **Gráfica (one-pagers, portadas, carruseles)** → HTML+CSS con las fuentes del sello →
  `motor/graficos/html2pdf.py` (Chromium headless → PDF/PNG).
- **Presentaciones** → `motor/presentaciones/base_unica_swap.py` sobre el PPTX canónico del proyecto.
- **Guiones RRSS (reels/sketches)** → lee `guias/guiones-rrss.md` (estructuras de gancho, formato sketch,
  reglas de tono y humor). Prompts de apoyo en `motor/prompts/`.

## 4. Cómo partir un proyecto/cliente nuevo

1. Crea `marcas/<cliente>/design-tokens.json` desde `marcas/_plantilla/` (paleta, fuentes, reglas del cliente).
2. Crea `proyectos/<cliente>/README.md` con: qué se produce, quién valida, y las decisiones tomadas.
3. Produce SIEMPRE parametrizando por los tokens — nunca colores/fuentes a mano en la pieza.
4. Todo lo validado se registra en el README del proyecto (qué versión es máster y dónde está).

## 5. Contexto que te ayuda

- Este motor nació del programa HUELLA (Entel Connect, 2026), producido en `consultoranovar-glitch/NOVAR-elearning`.
  Las piezas de `referencias/` salen de ahí y muestran el estándar esperado.
- La dueña del estudio y validadora final es **Pau (Paulina Aravena, NOVAR)**. En su ausencia, el líder
  de proyecto que ella designe (p. ej. Lorena).
