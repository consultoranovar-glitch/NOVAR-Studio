# Guía · Producción de video (Remotion)

> Proyecto base: `motor/video-remotion/`. Video por código: personajes consistentes,
> texto sincronizado al frame, todo editable y versionable. Validado en producción
> (cápsulas HUELLA + reel de sketch con personajes).

## 1. Setup

```bash
cd motor/video-remotion
npm install                      # (~2 min; node_modules NO va al repo)
npx remotion studio              # editor interactivo
npx remotion render <IdComposicion> out/pieza.mp4 --log=error
```

- **Binario de Chromium:** ya configurado en `remotion.config.ts` →
  `chromium_headless_shell` (el Chromium completo eliminó el modo headless antiguo; si el
  render falla con error de headless, revisa esa ruta con `ls /opt/pw-browsers/`).
- Formato reel: **1080×1920, 30 fps**. Cápsulas horizontales: 1920×1080.
- El audio va en `public/` y se monta con `<Audio src={staticFile('pieza.mp3')} />`.

## 2. El método que funciona

1. **El audio manda.** Primero se produce y valida el audio máster (ver `produccion-audio.md`).
2. Se mide la línea de tiempo real (duración de cada segmento con `ffprobe`; para hallar
   cortes internos: `ffmpeg -af silencedetect=noise=-32dB:d=0.3`).
3. La composición se estructura por escenas con una tabla de tiempos `T = {...}` en segundos
   y subtítulos como lista `{a, b, texto}` (frase a frase, estilo reel: Barlow 800, blanco,
   borde negro grueso via `WebkitTextStroke` + `paintOrder: 'stroke'`).
4. **QA visual obligatorio**: extraer cuadros clave y mirarlos en grilla antes de entregar:
   `for t in 2 15 40 60; do ffmpeg -ss $t -i out.mp4 -frames:v 1 qa_$t.png; done`

## 3. Personajes "palotes" (formato sketch RRSS)

- Monitos de palote **ridículamente simples** dibujados como SVG inline en React:
  cabeza círculo + líneas; cada personaje se distingue por UN atributo (sombrero, pelos,
  anteojos, melena). Expresiones = variantes de ojos/boca (idle, talk, laugh, angry, shock/meme).
- Animación mínima: el que habla rebota y abre/cierra la boca (`Math.sin(frame*k)`), las risas
  sacuden (`rotate`), los "JAJAJA" flotan. El freeze de cara-meme cierra el sketch.
- Ver ejemplo real completo: `NOVAR-elearning:huella/remotion/src/Sketch01.tsx` (y su guion en
  `referencias/sketch-club-desmotivacion-GUION.md`).

## 4. Video generativo (Veo, etc.)

NO usarlo para personajes de serie ni diálogo sincronizado (inconsistencia entre tomas).
Sirve para b-roll o fondos puntuales. La identidad del estudio es la animación por código.

## 5. Audiogramas (reel de podcast)

Onda de audio con ffmpeg `showwaves`, portada estática + `-tune stillimage` para mp4 liviano.
Mezclas: `amix=duration=longest` (NUNCA `first`: trunca la música de fondo).

## 6. Stingers generativos con Veo (validado 20-jul-2026)

Excepción CONTROLADA a la regla anti-video-generativo: Veo sirve para **cortinillas/entradas
de mascota SIN diálogo** (4-8 s). Todo lo que habla sigue siendo títere Remotion.

Receta probada (identidad preservada — a diferencia de Flow a mano alzada):
- Modelo: `veo-3.1-fast-generate-preview` vía API Gemini (`predictLongRunning` + poll del operation + download del file URI con la API key).
- **SIEMPRE image-to-video condicionado con el arte oficial** (PNG del sello sobre fondo blanco, ~1280px).
- Prompt: describir al personaje EXPLÍCITAMENTE (cuerpo espiral blanco con trazos grises, nariz y manos naranjas, zapatillas azules, textura lápiz), la acción, y el entorno DE MARCA ("bright minimal corporate learning studio, white walls, soft light-blue accents"). Cerrar con: "CRITICAL: preserve the exact 2D hand-drawn character design… do not convert to 3D… No text, no logos, no watermark."
- Parámetros: `aspectRatio 16:9 · durationSeconds 8 · resolution 720p`.
- 💰 **Costo real por clip (dólares, no centavos): usar con cuentagotas y con ok de Pau.**
- QA obligatorio: extraer 5 cuadros y verificar identidad (espiral blanca, nariz/manos naranjas, zapatillas) + entorno de marca + sin texto/marca de agua.

**Variante HABLADA (doblaje, validada):** para que la mascota hable en el clip Veo:
1. En el prompt, pedir que el personaje "talks enthusiastically to the camera in Spanish, saying: '<la frase>' — his mouth moves naturally while speaking". Incluir la frase real hace que el ritmo de boca calce mejor.
2. Generar EN PARALELO la voz oficial (`motor/audio/voz_novarito.py`) con la misma frase.
3. **Doblar**: descartar el audio inventado de Veo y montar la voz oficial:
   `ffmpeg -i veo.mp4 -i voz.mp3 -filter_complex "[1:a]adelay=200|200,apad[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest out.mp4`
   (Convención de doblaje: la boca no calza fonema a fonema y está bien — como el animé.)
4. La voz oficial NUNCA se reemplaza por la voz que invente Veo.
