#!/usr/bin/env python3
"""
Motor de audio NOVAR · Gemini TTS → WAV + MP3.

Uso:
  1 voz:   python3 tts_gemini.py guion.txt salida --voice Charon
  2 voces: python3 tts_gemini.py guion.txt salida --speakers "Paula=Leda,Diego=Enceladus"

El guion es texto plano. Para 2 voces, cada línea de diálogo parte con "Nombre: ".
El texto de dirección actoral (estilo, tono, carácter de cada voz) va al INICIO del guion,
antes del diálogo — ver guias/produccion-audio.md para los prompts que funcionan.

Requiere: GEMINI_API_KEY en el entorno · ffmpeg para el MP3.
Máximo 2 speakers por request (límite de la API). Para escenas con más voces:
generar por partes y mezclar con ffmpeg (ver guía, sección sketches).
"""
import argparse, base64, json, os, struct, subprocess, sys, urllib.request

MODEL = "gemini-2.5-pro-preview-tts"  # PRO, no flash (flash mete ruido tipo "lluvia")

def call(body):
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "x-goog-api-key": os.environ["GEMINI_API_KEY"]})
    r = json.load(urllib.request.urlopen(req, timeout=300))
    try:
        return base64.b64decode(r["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])
    except Exception:
        sys.exit("Respuesta sin audio: " + json.dumps(r)[:400])

def save(pcm, out):
    n = len(pcm)
    hdr = (b'RIFF' + struct.pack('<I', 36 + n) + b'WAVEfmt ' +
           struct.pack('<IHHIIHH', 16, 1, 1, 24000, 48000, 2, 16) + b'data' + struct.pack('<I', n))
    open(out + ".wav", "wb").write(hdr + pcm)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", out + ".wav",
                    "-codec:a", "libmp3lame", "-b:a", "160k", out + ".mp3"], check=True)
    print(f"OK  {out}.wav  {out}.mp3  (~{n/48000:.1f} s)")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("guion"); ap.add_argument("salida")
    ap.add_argument("--voice", help="voz única (p. ej. Charon)")
    ap.add_argument("--speakers", help='2 voces: "Nombre1=Voz1,Nombre2=Voz2"')
    a = ap.parse_args()
    text = open(a.guion, encoding="utf-8").read()
    if a.speakers:
        pairs = [s.split("=") for s in a.speakers.split(",")]
        if len(pairs) != 2: sys.exit("La API admite exactamente 2 speakers por request.")
        cfg = {"multiSpeakerVoiceConfig": {"speakerVoiceConfigs": [
            {"speaker": n, "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": v}}} for n, v in pairs]}}
    elif a.voice:
        cfg = {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": a.voice}}}
    else:
        sys.exit("Indica --voice o --speakers.")
    body = {"contents": [{"parts": [{"text": text}]}],
            "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": cfg}}
    save(call(body), a.salida)

if __name__ == "__main__":
    main()
