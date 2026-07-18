# NOVAR STUDIO

Estudio de producción de NOVAR Consultores: recursos audiovisuales y documentales
(podcast, reels/sketches, video, gráfica, Word, PPT) para distintos clientes,
sobre un motor común probado en producción real (programa HUELLA, 2026).

**Si eres un agente (Codex/GPT/Claude): lee `AGENTS.md` primero. Es la ley de la casa.**

| Carpeta | Contenido |
|---|---|
| `AGENTS.md` | Reglas de operación para agentes y personas |
| `motor/` | Código: audio TTS, video Remotion, HTML→PDF, md→Word + validador OOXML, PPT base única, prompts |
| `sello-novar/` | Marca NOVAR: logos, Barlow, bumpers de audio validados |
| `guias/` | Playbooks: flujo de trabajo, audio, video, Word, guiones RRSS |
| `marcas/` | Design tokens por cliente (con plantilla) |
| `referencias/` | Piezas terminadas ejemplares (la vara) |
| `proyectos/` | Trabajo por cliente |

Requisitos del entorno: Python 3 (`python-docx`, `python-pptx`), `ffmpeg`, `pdftoppm` (poppler),
Chromium headless, Node 18+ (para Remotion), y `GEMINI_API_KEY` en el entorno.
