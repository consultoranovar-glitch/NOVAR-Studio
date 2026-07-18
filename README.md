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

## Preparación del entorno (una vez por contenedor)

```bash
./setup.sh                    # instala ffmpeg, poppler, deps Python (.venv), npm y navegador de Remotion
. .venv/bin/activate          # activar el venv en cada sesión de trabajo
```

Además, el entorno debe tener **`GEMINI_API_KEY` como secreto** (variable de entorno).
Nunca en el repo, nunca en archivos.

**Si trabajas desde Codex Cloud:** en la configuración del *environment* del repo,
(1) define `./setup.sh` como *setup script*, y (2) agrega el secreto `GEMINI_API_KEY`.
El acceso a GitHub (clonar/commit/push) lo administra el propio Codex con su conector —
no se necesita `gh` ni tokens dentro del contenedor.

Verificación rápida de que todo quedó operativo: correr las pruebas del final de
`setup.sh` y un render corto (`cd motor/video-remotion && npm run render`).
