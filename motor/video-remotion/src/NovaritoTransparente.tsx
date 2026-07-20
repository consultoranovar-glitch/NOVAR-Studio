import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import amps from './novarito-amps.json';
import './fonts';

// Novarito títere SIN FONDO (canal alfa) — para superponer sobre cualquier cosa.
// Render: npx remotion render NovaritoTransparente out.webm --codec=vp9 --image-format=png --pixel-format=yuva420p
const FPS = 30;
type Tramo = {a: number; b: number; img: string};
const TRAMOS: Tramo[] = [
  {a: 0.0, b: 4.4, img: 'novarito-feliz.png'},
  {a: 4.4, b: 7.2, img: 'novarito-pensativo.png'},
  {a: 7.2, b: 10.4, img: 'novarito-celebrando.png'},
  {a: 10.4, b: 13.4, img: 'novarito-pensativo-lentes.png'},
  {a: 13.4, b: 15.4, img: 'novarito-celebrando.png'},
];

export const NovaritoTransparente: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const amp = (amps as number[])[Math.min(frame, (amps as number[]).length - 1)] ?? 0;
  const tramo = TRAMOS.find((x) => t >= x.a && t < x.b) ?? TRAMOS[TRAMOS.length - 1];
  const pop = interpolate(t - tramo.a, [0, 0.18], [0.92, 1], {extrapolateRight: 'clamp'});
  const bob = amp * 16;
  const sway = Math.sin(frame / 7) * amp * 2.2;
  return (
    <AbsoluteFill style={{background: 'transparent', alignItems: 'flex-end', justifyContent: 'center'}}>
      <Audio src={staticFile('novarito/piloto-voz.mp3')} />
      <Img
        src={staticFile(`novarito/${tramo.img}`)}
        style={{maxWidth: '96%', maxHeight: '96%',
          transform: `translateY(${-bob}px) rotate(${sway}deg) scale(${pop})`,
          transformOrigin: 'bottom center'}}
      />
    </AbsoluteFill>
  );
};
export const DUR_NOVARITO_TRANSPARENTE = Math.ceil(15.4 * FPS);
