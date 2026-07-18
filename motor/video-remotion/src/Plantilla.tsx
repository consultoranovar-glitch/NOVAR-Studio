import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import './fonts';

// Plantilla mínima de pieza vertical NOVAR: título + subtítulo + firma dorada.
// Es el punto de partida para nuevas composiciones (copiar, renombrar, construir encima).
// Audio: <Audio src={staticFile('pieza.mp3')} /> con el mp3 en public/.

const GOLD = '#C9A84C';

export const Plantilla: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#141414', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{opacity: op, textAlign: 'center', padding: '0 80px'}}>
        <div style={{fontFamily: 'Barlow', fontWeight: 800, fontSize: 96, color: '#fff', lineHeight: 1.05}}>
          NOVAR STUDIO
        </div>
        <div style={{fontFamily: 'Barlow', fontWeight: 500, fontSize: 44, color: GOLD, marginTop: 28}}>
          plantilla base · reemplázame
        </div>
      </div>
      <div style={{position: 'absolute', bottom: 90, fontFamily: 'Barlow', fontWeight: 600, fontSize: 30, color: GOLD}}>
        novarchile.com
      </div>
    </AbsoluteFill>
  );
};

export const DUR_PLANTILLA = 5 * 30;
