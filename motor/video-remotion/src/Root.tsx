import React, {useEffect, useState} from 'react';
import {Composition, continueRender, delayRender} from 'remotion';
import {Plantilla, DUR_PLANTILLA} from './Plantilla';
import {EjemploSubtitulos, DUR_EJEMPLO_SUBTITULOS} from './EjemploSubtitulos';
import './fonts';

// Espera a que Barlow esté lista antes de pintar los fotogramas
const useBarlowReady = () => {
  const [handle] = useState(() => delayRender('Cargando Barlow'));
  useEffect(() => {
    const anyDoc = document as any;
    if (anyDoc.fonts && anyDoc.fonts.ready) {
      Promise.all([
        anyDoc.fonts.load('800 92px Barlow'),
        anyDoc.fonts.load('600 40px Barlow'),
        anyDoc.fonts.load('500 40px Barlow'),
      ])
        .then(() => anyDoc.fonts.ready)
        .then(() => continueRender(handle))
        .catch(() => continueRender(handle));
    } else {
      continueRender(handle);
    }
  }, [handle]);
};

export const RemotionRoot: React.FC = () => {
  useBarlowReady();
  return (
    <>
      {/* Vertical 9:16 para reels. Duplicar y ajustar por pieza; ver guias/produccion-video.md */}
      <Composition
        id="EjemploSubtitulos"
        component={EjemploSubtitulos}
        durationInFrames={DUR_EJEMPLO_SUBTITULOS}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Plantilla"
        component={Plantilla}
        durationInFrames={DUR_PLANTILLA}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
