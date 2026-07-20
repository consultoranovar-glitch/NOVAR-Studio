#!/usr/bin/env python3
"""
Voz OFICIAL de Novarito (validada por Pau, 20-jul-2026). Receta cerrada:
Gemini TTS voz Orus + dirección actoral fija + pitch x1.06 + tempo final x1.05.

Uso:  python3 voz_novarito.py guion.txt salida
      (el guion trae SOLO lo que dice Novarito; los registros se marcan inline
       si se necesitan: [PREGUNTA] [ÉNFASIS] [REFLEXIÓN] — ver ficha del sello)

Produce salida.mp3 (y deja salida.wav crudo por si se necesita mezclar).
Requiere GEMINI_API_KEY y ffmpeg. NO cambiar los parámetros sin autorización de Pau.
"""
import subprocess, sys, os, tempfile

PITCH = 1.06        # +1 semitono: personaje sin artefacto "globo" (validado)
TEMPO_FINAL = 1.05  # ritmo ágil validado
DIRECCION = """Voz de personaje animado bonachón: redonda, cálida, de pecho, CERO nasal. Habla fluida
y natural como conversación real, frases hiladas, arranques naturales, nada acartonado.
Español latino coloquial cálido. Audio limpio, sin respiraciones.
Registros del personaje cuando el guion los marque: [PREGUNTA] curiosidad genuina, tono
que sube; [ÉNFASIS] golpea las palabras clave con energía; [REFLEXIÓN] baja ritmo y
volumen, cercano e íntimo. Remates con chispa alegre.

"""

def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    guion, out = sys.argv[1], sys.argv[2]
    texto = DIRECCION + open(guion, encoding="utf-8").read()
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f:
        f.write(texto); tmp = f.name
    here = os.path.dirname(os.path.abspath(__file__))
    subprocess.run([sys.executable, os.path.join(here, "tts_gemini.py"), tmp, out, "--voice", "Orus"], check=True)
    os.unlink(tmp)
    atempo = TEMPO_FINAL / PITCH
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", out + ".wav",
                    "-af", f"asetrate=24000*{PITCH},aresample=24000,atempo={atempo:.6f}",
                    "-codec:a", "libmp3lame", "-b:a", "160k", out + ".mp3"], check=True)
    print(f"Novarito listo: {out}.mp3  (Orus · pitch x{PITCH} · tempo x{TEMPO_FINAL})")

if __name__ == "__main__":
    main()
