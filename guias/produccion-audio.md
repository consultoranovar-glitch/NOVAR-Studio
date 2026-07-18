# FICHA TÉCNICA · Producción de audio HUELLA / NOVAR

> Referencia reproducible de la fábrica de audio (podcasts, bumpers, cápsulas/reels).
> Objetivo: que cualquier IA o persona, en otro hilo, sepa **exactamente qué funciona** y con qué parámetros.
> Última actualización: 15-jul-2026. Validado en la producción del podcast de supervisores S2.

---

## 1. Plataforma y modelo

| Ítem | Valor validado |
|---|---|
| Proveedor | Google **Gemini API** (AI Studio) |
| Modelo TTS | **`gemini-2.5-pro-preview-tts`** ✅ |
| Modelo descartado | `gemini-2.5-flash-preview-tts` ❌ (menos natural + artefacto de ruido tipo "lluvia") |
| Endpoint | `POST https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={GEMINI_API_KEY}` |
| Modalidad | `generationConfig.responseModalities = ["AUDIO"]` |
| Clave | Variable `GEMINI_API_KEY` (formato AI Studio `AQ.Ab8…`). En scratchpad, **nunca** al repo. |
| Transcripción/QA | `gemini-2.5-flash` con audio `inlineData` (mimeType `audio/mpeg`) |

**Red:** desde el entorno de nube solo Gemini es alcanzable. OpenAI y ElevenLabs quedan bloqueadas salvo allowlist Custom.

---

## 2. Formato de audio (constante en todo)

| Parámetro | Valor |
|---|---|
| Salida cruda de Gemini | PCM **L16, 24000 Hz, mono** (base64 en `candidates[0].content.parts[0].inlineData.data`) |
| Máster | WAV: `nchannels=1, sampwidth=2, framerate=24000` |
| Entregable/compartir | MP3 `ffmpeg -b:a 160k` |

---

## 3. Voces (casting validado)

Todas voces **prebuilt** de Gemini. Rol → voz → carácter:

| Rol / pieza | Voz | Carácter | Notas |
|---|---|---|---|
| **Conversación · Paula** | `Leda` | cálida, juvenil | ✅ excelente para diálogo |
| **Conversación · Diego** | `Enceladus` | masculina tranquila, "breathy" | ✅ excelente para diálogo |
| **Remate / cápsula grave** ("la señal de cuidado") | `Charon` | grave, sobria, reflexiva | ✅ para reels y sellos profundos. **Dirigir con intención o suena cansado.** |
| **Bumper marca · femenino** | `Autonoe` | brillante, con energía | ✅ intro+outro femenino |
| **Bumper marca · masculino** | `Orus` | firme, con energía | ✅ intro+outro masculino |

**Voces probadas y DESCARTADAS para marca:**
- `Leda` en frase de marca → suena juvenil/"zonza".
- `Charon` sin dirección de energía → suena fatigado.

**Regla:** multi-hablante admite **máximo 2 speakers** por request.

---

## 4. Prompts de estilo (texto exacto que funciona)

El "prompt" es texto en lenguaje natural que precede al guion, dentro del mismo `parts[0].text`.

### 4.1 Conversación (diálogo 2 voces)
```
Genera esta conversación como un podcast entre dos supervisores chilenos, Paula y Diego,
que retoman una charla después de una capacitación. Español de Chile natural, cálido y cercano,
conversacional, NO tono de radio ni lectura. Ritmo pausado con pequeñas pausas de sentido.
Paula: reflexiva, cálida, piensa mientras habla. Diego: directo, tranquilo, operativo, humor leve.
Risas muy leves solo si el texto lo pide.
IMPORTANTE: audio de estudio perfectamente limpio y nítido, SIN respiraciones audibles, sin
sonidos de boca, sin ruido ambiente, sin susurros. Voces claras y presentes.

<GUION con líneas "PAULA: ..." / "DIEGO: ...">
```

### 4.2 Bumper de marca femenino (`Autonoe`)
```
Locuta esta apertura/cierre de marca de una escuela de liderazgo con voz femenina BRILLANTE,
con ENERGÍA positiva y entusiasmo genuino, segura, cálida e inspiradora, con impulso hacia adelante.
Nada apagada, nada infantil, nada plana. Audio de estudio limpio, sin respiraciones ni ruido.
Pronuncia 'Novár' con acento en la a final.

<FRASE>
```

### 4.3 Bumper de marca masculino (`Orus`)
```
Locuta este cierre de marca con voz masculina con ENERGÍA, convicción y calidez, motivadora,
sin sonar cansado ni sobreactuar. Audio de estudio limpio, sin respiraciones ni ruido.
FRASEO: di 'de la intención a la acción' de forma FLUIDA y resuelta, en un solo impulso, sin pausas
bruscas, aterrizando con seguridad y calidez en la palabra 'acción'. Que suene redondo, no cortado.
PRONUNCIACIÓN: 'Novár' = 'no-VAR', dos sílabas, acento fuerte en la última. NO 'nóvar' ni 'nova'.

<FRASE>
```

### 4.4 Remate grave / cápsula (`Charon`)
```
Locuta esta frase de cierre de marca con voz masculina grave, sobria y reflexiva, pausada, sin
dramatismo. Cierra con calma, como un punto final sereno. Audio de estudio limpio, sin
respiraciones ni ruido.

<FRASE>
```

**Frases de marca canónicas:**
- Intro: `De la intención... a la acción. Conversaciones que inspiran.`
- Outro: `Sigue aprendiendo con Novár. De la intención a la acción.`
- Remate/cápsula: `HUELLA. La Conexión convierte una señal en una oportunidad de cuidado.`

---

## 5. Estructura del request (JSON)

### Multi-hablante (conversación)
```json
{
  "contents": [{"parts": [{"text": "<STYLE>\n\n<GUION>"}]}],
  "generationConfig": {
    "responseModalities": ["AUDIO"],
    "speechConfig": {
      "multiSpeakerVoiceConfig": {
        "speakerVoiceConfigs": [
          {"speaker": "PAULA", "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Leda"}}},
          {"speaker": "DIEGO", "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Enceladus"}}}
        ]
      }
    }
  }
}
```

### Voz única (bumper / remate)
```json
{
  "contents": [{"parts": [{"text": "<STYLE>\n\n<FRASE>"}]}],
  "generationConfig": {
    "responseModalities": ["AUDIO"],
    "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Autonoe"}}}
  }
}
```

---

## 6. Cortina musical (sello NOVAR)

- **Fuente:** la música NO existe como archivo suelto; se **extrae del podcast publicado** `PODCAST_HUELLA_TUTOR_GPS_S2.mp3` (que ya trae el sello mezclado).
- **Base instrumental (`bed`):** cola instrumental del outro del tutor, ~9 s, con fades:
  ```
  ffmpeg -y -ss 8.0 -t 9.0 -i tutor_OUTRO_v2.mp3 -ac 1 -ar 24000 \
    -af "afade=t=in:st=0:d=0.4,afade=t=out:st=7.6:d=1.4" bed9.wav
  ```
  (`tutor_OUTRO_v2.mp3` = cierre del tutor recortado, desde absoluto ~672 s hasta el final.)
- Diagnóstico de "dónde hay música sin voz": ventanas de 0,25 s → RMS estable + **ZCR < 0,03** = instrumental; ZCR > 0,05 = voz.

---

## 7. Mezcla voz + música (receta de bumper)

```
ffmpeg -y -i <voz>.wav -i bed9.wav -filter_complex \
"[0:a]adelay=1200|1200,volume=1.1[v];[1:a]volume=0.55[b];\
[v][b]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.95[o]" \
-map "[o]" -ar 24000 -ac 1 <bumper>.wav
```

| Parámetro | Valor | Por qué |
|---|---|---|
| `adelay 1200` | voz entra a 1,2 s | deja arrancar la música |
| voz `volume=1.1` | +1 dB | presencia |
| música `volume=0.55` | música por debajo | no tapa la voz |
| **`amix duration=longest`** | ⚠️ **crítico** | `duration=first` CORTA la música al largo de la voz → suena "básico/abrupto" |
| `normalize=0` | mantiene niveles | evita bajón de volumen del amix |
| `alimiter=limit=0.95` | techo | evita clipping |

---

## 8. Ensamble del episodio

1. **Guion largo → por bloques.** Cada sección = 1 request TTS (multi-hablante). No mandar 9 min de una.
2. **Unir bloques de voz** con silencios de respiro: **0,9 s** entre secciones.
3. **Episodio = intro + voz + outro** con crossfades:
   ```
   ffmpeg -y -i intro.wav -i voz.wav -i outro.wav -filter_complex \
   "[0:a][1:a]acrossfade=d=0.8:c1=tri:c2=tri[a01];\
   [a01][2:a]acrossfade=d=1.0:c1=tri:c2=tri[out]" -map "[out]" salida.wav
   ```
   - intro→voz: `acrossfade d=0.8`
   - voz→outro: `acrossfade d=1.0`

---

## 9. Lecciones aprendidas (gotchas)

1. **Usar `pro`, no `flash`** para TTS: flash mete ruido tipo "lluvia" y suena actuado.
2. **NO pedir "respiraciones naturales"** en el prompt: Gemini genera respiraciones/ruido de boca que suenan a "lluvia". Pedir explícitamente *"audio limpio, sin respiraciones audibles"*.
3. **`amix duration=longest`** siempre (ver §7). `first` arruina la cola musical.
4. **Casting importa:** `Leda`=juvenil (mal para marca), `Charon`=cansado si no se dirige. Elegir voz por carácter, no por defecto.
5. **Pronunciación de marca:** guiar fuerte "Novár = no-VAR, acento última sílaba".
6. **Fraseo:** evitar `…` y `¡!` cuando cortan feo; pedir cierre "fluido y resuelto".
7. **Multi-hablante = máx 2 voces.** El remate grave (3ª voz) va en request aparte.
8. **El silencio del TTS es limpio** (piso de ruido ≈ −72 dB); si se oye ruido, viene de la voz (respiraciones) o de la mezcla, no del silencio.

---

## 10. Inventario de piezas producidas (S2 supervisores)

| Pieza | Voz(es) | Modelo | Estado |
|---|---|---|---|
| Podcast supervisores (diálogo 9 bloques) | Leda + Enceladus | pro-tts | ✅ |
| Bumper intro/outro femenino | Autonoe | pro-tts | ✅ en `_sello/bumpers/` |
| Bumper intro/outro masculino | Orus | pro-tts | ✅ en `_sello/bumpers/` |
| Cápsula/reel "la señal de cuidado" | Charon | pro-tts | ✅ |

---

## ANEXO STUDIO · Lecciones de sketches/comedia (producción "El club de la desmotivación", jul-2026)

1. **Naturalidad > teatro.** Dirigir "villano de caricatura MUY sobreactuado" produce "niños
   actuando". Lo que funciona: "conversación real entre colegas veteranos y cínicos, de sobremesa;
   dicen barbaridades con total naturalidad; risas de adulto contenidas y socarronas; NADA teatral".
2. **Fluidez = generar en PARES.** Las líneas generadas de a una y pegadas suenan forzadas.
   Generar la conversación en requests multi-speaker de 2 voces que se responden de verdad.
3. **Idioma:** coloquial latino con tuteo. Ni chilenismos forzados ni neutro de doblaje.
4. **Risas de público:** el modelo rechaza "risa pura" (finishReason OTHER). Envolverla en
   personaje: "Una estudiante escucha algo comiquísimo y estalla en carcajadas… Jajajaja… ¡ay, no
   puede ser!". Para grupo: mezclar 2 risas con adelay 200-250ms + asetrate 0.94 y bajar volumen.
5. **Unísono real** (varias voces gritando lo mismo): generar cada voz por separado y superponer
   con micro-retardos (45/85/130 ms) + volume 1.5 + alimiter.
6. **Record scratch sintético:** ruido rosa 0.5s + tremolo f=28 + bandpass 1100Hz + fades.
7. **Casting cómico validado:** rasposo cascarrabias = `Algenib` · nasal "rata" = `Puck` ·
   grave socarrón = `Algieba` · normal = `Iapetus` · estridente/indignada = `Zephyr`
   (`Sadachbia` se pierde contra Algenib en mezcla).
8. **Dirección por momentos dentro de la misma línea** funciona: "…su última línea la dice a
   regañadientes, masticando las palabras".
9. La energía de la actuación acorta la duración total (~20% entre "arrastrado" y "vehemente") —
   ajustar largo del guion pensando en eso.
