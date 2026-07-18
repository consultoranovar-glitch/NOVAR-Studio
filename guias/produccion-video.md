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
