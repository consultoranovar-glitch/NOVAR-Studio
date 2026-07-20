import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate} from 'remotion';
import './fonts';

// EJEMPLO del flujo audio + subtítulos estilo reel (el patrón real de producción):
// 1) se produce y valida el audio (motor/audio) · 2) se mide con ffprobe
// 3) se subtitula frase a frase con la tabla SUBS {a, b, texto} en segundos.
const FPS = 30;
const GOLD = '#C9A84C';

type Sub = {a: number; b: number; t: string; hl?: boolean};
const SUBS: Sub[] = [
  {a: 0.2, b: 1.6, t: 'NOVAR Studio,'},
  {a: 1.6, b: 3.4, t: 'certificado y operativo.'},
  {a: 3.7, b: 6.4, t: 'De la intención… a la acción.', hl: true},
];

export const EjemploSubtitulos: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const s = SUBS.find((x) => t >= x.a && t < x.b);
  const pulse = 1 + Math.sin(frame / 9) * 0.012;
  return (
    <AbsoluteFill style={{background: '#141414', alignItems: 'center', justifyContent: 'center'}}>
      <Audio src={staticFile('ejemplo-voz.mp3')} />
      {/* onda decorativa simple que “respira” con el tiempo */}
      <div style={{position: 'absolute', top: 560, display: 'flex', gap: 14, transform: `scale(${pulse})`}}>
        {Array.from({length: 7}).map((_, i) => {
          const h = 40 + Math.abs(Math.sin(frame / 6 + i * 1.1)) * 90;
          return <div key={i} style={{width: 16, height: h, borderRadius: 8, background: GOLD, opacity: 0.85}} />;
        })}
      </div>
      {s && (
        <div style={{position: 'absolute', left: 70, right: 70, top: 880, textAlign: 'center'}}>
          <span style={{
            fontFamily: 'Barlow', fontWeight: 800, fontSize: 84, lineHeight: 1.12,
            color: s.hl ? GOLD : '#fff', WebkitTextStroke: '10px #000', paintOrder: 'stroke',
          }}>{s.t}</span>
        </div>
      )}
      <div style={{position: 'absolute', bottom: 90, opacity: interpolate(frame, [0, 20], [0, 1]),
        fontFamily: 'Barlow', fontWeight: 600, fontSize: 30, color: GOLD}}>
        novarchile.com
      </div>
    </AbsoluteFill>
  );
};

export const DUR_EJEMPLO_SUBTITULOS = Math.ceil(7.0 * FPS);
