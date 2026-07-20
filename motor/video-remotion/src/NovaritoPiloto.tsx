import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import amps from './novarito-amps.json';
import './fonts';

// PILOTO · Novarito locutor de presentaciones (títere digital sobre arte original).
// Patrón: voz oficial (voz_novarito.py) → amplitudes por cuadro (novarito-amps.json)
// → el personaje "habla" con rebote/balanceo proporcional al volumen, y cambia de
// emoción por tramo del guion. 1920×1080 (formato presentación).
const FPS = 30;
const GOLD = '#C9A84C';
const NAVY = '#0A1A66';
const BLUE = '#005CFF';

type Tramo = {a: number; b: number; img: string; sub: string};
const TRAMOS: Tramo[] = [
  {a: 0.0, b: 4.4, img: 'novarito-feliz.png', sub: '¡Hola! Yo soy Novarito… tu compañero en estas sesiones.'},
  {a: 4.4, b: 7.2, img: 'novarito-pensativo.png', sub: '¿Listos para aprender algo nuevo?'},
  {a: 7.2, b: 10.4, img: 'novarito-celebrando.png', sub: 'Porque esto que viene… ¡te va a encantar!'},
  {a: 10.4, b: 13.4, img: 'novarito-pensativo-lentes.png', sub: 'Y recuerda… paso a paso, se llega lejos.'},
  {a: 13.4, b: 14.8, img: 'novarito-celebrando.png', sub: '¡Vamos!'},
];

export const NovaritoPiloto: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const amp = (amps as number[])[Math.min(frame, (amps as number[]).length - 1)] ?? 0;
  const tramo = TRAMOS.find((x) => t >= x.a && t < x.b) ?? TRAMOS[TRAMOS.length - 1];
  const idx = TRAMOS.indexOf(tramo);
  const tIn = t - tramo.a;
  // pop al cambiar de emoción + habla: rebote y balanceo por amplitud
  const pop = interpolate(tIn, [0, 0.18], [0.92, 1], {extrapolateRight: 'clamp'});
  const bob = amp * 16;
  const sway = Math.sin(frame / 7) * amp * 2.2;

  return (
    <AbsoluteFill style={{background: '#fff'}}>
      <Audio src={staticFile('novarito/piloto-voz.mp3')} />
      {/* lado izquierdo: lámina simulada */}
      <div style={{position: 'absolute', left: 90, top: 120, width: 980}}>
        <div style={{fontFamily: 'Barlow', fontWeight: 700, fontSize: 26, letterSpacing: 5, color: BLUE}}>
          PROGRAMA HUELLA · SESIÓN 2
        </div>
        <div style={{width: 90, height: 8, background: '#FF3D00', borderRadius: 3, marginTop: 14}} />
        <div style={{fontFamily: 'Barlow', fontWeight: 700, fontSize: 64, color: NAVY, marginTop: 26, lineHeight: 1.05}}>
          Ayuda a tu equipo<br />a estar disponible
        </div>
        {['La Conexión: 4 formas de conversación', 'Lenguaje CESI: datos, no juicios', 'Atender a tiempo es cuidar'].map((b, i) => (
          <div key={b} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: i === 0 ? 46 : 24,
            opacity: interpolate(t, [4.4 + i * 3, 5.2 + i * 3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
            <div style={{width: 14, height: 14, borderRadius: 7, background: ['#005CFF', '#FF3D00', '#42E8B4'][i]}} />
            <div style={{fontFamily: 'Barlow', fontWeight: 500, fontSize: 34, color: '#1A1A1A'}}>{b}</div>
          </div>
        ))}
      </div>
      {/* Novarito, títere parlante */}
      <div style={{position: 'absolute', right: 60, bottom: 100, width: 760, height: 820,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
        <Img
          src={staticFile(`novarito/${tramo.img}`)}
          style={{maxWidth: '100%', maxHeight: '100%',
            transform: `translateY(${-bob}px) rotate(${sway}deg) scale(${pop})`,
            transformOrigin: 'bottom center'}}
        />
      </div>
      {/* subtítulo */}
      <div style={{position: 'absolute', left: 90, right: 90, bottom: 44, textAlign: 'center'}}>
        <span style={{fontFamily: 'Barlow', fontWeight: 800, fontSize: 40, color: NAVY,
          background: '#EAF4FF', padding: '10px 28px', borderRadius: 14}}>
          {tramo.sub}
        </span>
      </div>
      <div style={{position: 'absolute', right: 90, top: 60, fontFamily: 'Barlow', fontWeight: 600, fontSize: 22, color: GOLD}}>
        novarchile.com
      </div>
    </AbsoluteFill>
  );
};

export const DUR_NOVARITO_PILOTO = Math.ceil(15.4 * FPS);
