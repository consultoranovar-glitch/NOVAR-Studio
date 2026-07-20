# NOVARITO · Ficha del personaje

**Qué es:** la mascota-locutor de NOVAR — un torbellino amable con nariz, cachetes,
pulgares arriba y zapatillas azules (`novarito-referencia.jpg`). Se usa como presentador
animado en presentaciones, cápsulas y piezas del LMS.

## Voz — estado: ✅ OFICIAL · VALIDADA por Pau (20-jul-2026)

**Generarla SIEMPRE con `motor/audio/voz_novarito.py`** (aplica la receta completa solo):

```bash
python3 motor/audio/voz_novarito.py guion.txt salida   # -> salida.mp3
```

Receta cerrada (la que el script aplica — NO cambiar sin autorización de Pau):

| Parámetro | Valor |
|---|---|
| Voz Gemini TTS | **Orus** (modelo `gemini-2.5-pro-preview-tts`) |
| Pitch | ×**1.06** (+1 semitono — personaje SIN artefacto "globo"; el ×1.16 se descartó por sonar a globo desinflándose) |
| Tempo final | ×**1.05** (ágil validado) |
| Comando equivalente | `ffmpeg -i in.wav -af "asetrate=24000*1.06,aresample=24000,atempo=0.990566" out.mp3` *(0.990566 = 1.05/1.06)* |

**Dirección actoral (texto que precede al guion, literal):**
> Voz de personaje animado bonachón: redonda, cálida, de pecho, CERO nasal. Habla fluida
> y natural como conversación real, frases hiladas, nada acartonado. Español latino
> coloquial cálido. Audio limpio, sin respiraciones.

**Los tres registros del personaje** (indicarlos en la dirección cuando el guion los use):
1. **PREGUNTA** — curiosidad genuina, tono que sube, invitando de verdad a pensar.
2. **ÉNFASIS** — golpea las palabras clave con energía, como quien subraya en el aire.
3. **REFLEXIÓN** — baja ritmo y volumen, cercano, íntimo, casi confidencia.
Remates con chispa alegre. Muestra OFICIAL validada: `novarito-voz-OFICIAL-maqueta.mp3`. En el guion, los registros se marcan inline: `[PREGUNTA]` `[ÉNFASIS]` `[REFLEXIÓN]` (el generador ya instruye al modelo cómo interpretarlos).

**Descartado en el casting** (no repetir): voces agudas/nasales (Puck, Sadachbia,
Zubenelgenubi, Fenrir, Laomedeia, Achird — "esa hueá nasal", cita textual de Pau).
La ruta correcta: base grave de pecho + pitch de caricatura.

## Biblioteca de emociones — ✅ arte original de Pau, recortado y listo (`emociones/`)

PNG transparentes, 1600px de alto, con cuerpo blanco sólido (funcionan sobre cualquier fondo):

| Archivo | Emoción | Uso típico |
|---|---|---|
| `novarito-feliz.png` | Feliz sereno (presenta con la mano) | Neutral hablando, bienvenidas |
| `novarito-celebrando.png` | Risa grande + doble pulgar | Énfasis, celebración, remates |
| `novarito-pensativo.png` | Mirada arriba + nube de pensamiento vacía | Preguntas (¡la nube admite contenido!) |
| `novarito-pensativo-lentes.png` | Ídem con lentes en la nube | Variante "analizando" |
| `novarito-triste.png` | Pena contenida | Errores comunes, "esto duele" |
| `novarito-lloron.png` | Llanto abierto con lágrimas | Comedia/exageración |
| `novarito-enojado.png` | Ceño fruncido, brazos cruzados | Lo que NO se hace |
| `novarito-rabia.png` | Furia cómica (dientes apretados) | Anti-ejemplos, humor |

Los originales escaneados quedan con Pau; el recorte es reproducible (flood-fill de bordes +
cierre morfológico para el cuerpo — ver historial git).

## Animación — pendiente (plan validado conceptualmente)

Gemelo vectorial por capas (cuerpo-espiral, brazos, ojos, boca ×4 estados, piernas) en
Remotion; lip-sync por amplitud del WAV; la espiral gira cuando se emociona.
Próximos pasos: lámina del gemelo vectorial → validación → piloto 15s → plantilla en motor.
