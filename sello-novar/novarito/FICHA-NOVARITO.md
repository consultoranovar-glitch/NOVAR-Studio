# NOVARITO · Ficha del personaje

**Qué es:** la mascota-locutor de NOVAR — un torbellino amable con nariz, cachetes,
pulgares arriba y zapatillas azules (`novarito-referencia.jpg`). Se usa como presentador
animado en presentaciones, cápsulas y piezas del LMS.

## Voz — estado: ✅ PRE-APROBADA por Pau (20-jul-2026) · base válida, admite ajustes finos

Receta EXACTA y reproducible:

| Parámetro | Valor |
|---|---|
| Voz Gemini TTS | **Orus** (modelo `gemini-2.5-pro-preview-tts`) |
| Post-proceso | pitch ×**1.16** + tempo compensado a ×**1.05** final |
| Comando | `ffmpeg -i in.wav -af "asetrate=24000*1.16,aresample=24000,atempo=0.9052" out.mp3` *(0.9052 = 1.05/1.16)* |

**Dirección actoral (texto que precede al guion, literal):**
> Voz de personaje animado bonachón: redonda, cálida, de pecho, CERO nasal. Habla fluida
> y natural como conversación real, frases hiladas, nada acartonado. Español latino
> coloquial cálido. Audio limpio, sin respiraciones.

**Los tres registros del personaje** (indicarlos en la dirección cuando el guion los use):
1. **PREGUNTA** — curiosidad genuina, tono que sube, invitando de verdad a pensar.
2. **ÉNFASIS** — golpea las palabras clave con energía, como quien subraya en el aire.
3. **REFLEXIÓN** — baja ritmo y volumen, cercano, íntimo, casi confidencia.
Remates con chispa alegre. Muestra validada: `novarito-voz-maqueta-registros.mp3`.

**Descartado en el casting** (no repetir): voces agudas/nasales (Puck, Sadachbia,
Zubenelgenubi, Fenrir, Laomedeia, Achird — "esa hueá nasal", cita textual de Pau).
La ruta correcta: base grave de pecho + pitch de caricatura.

## Animación — pendiente (plan validado conceptualmente)

Gemelo vectorial por capas (cuerpo-espiral, brazos, ojos, boca ×4 estados, piernas) en
Remotion; lip-sync por amplitud del WAV; la espiral gira cuando se emociona.
Próximos pasos: lámina del gemelo vectorial → validación → piloto 15s → plantilla en motor.
