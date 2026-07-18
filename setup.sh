#!/usr/bin/env bash
# Preparación del entorno NOVAR Studio (Ubuntu/Debian). Ejecutar UNA vez por contenedor.
# En Codex Cloud: configurar este script como "setup script" del environment.
set -euo pipefail
SUDO=""; [ "$(id -u)" != "0" ] && SUDO="sudo"

echo "── 1/4 · Herramientas de sistema (ffmpeg, poppler, fuentes) ──"
$SUDO apt-get update -y -qq
$SUDO apt-get install -y -qq ffmpeg poppler-utils fonts-liberation ca-certificates

echo "── 2/4 · Dependencias Python (.venv) ──"
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -q --upgrade pip
python -m pip install -q -r requirements.txt

echo "── 3/4 · Remotion (npm + navegador) ──"
( cd motor/video-remotion && npm install --no-audit --no-fund )
if ( cd motor/video-remotion && npx remotion browser ensure ); then
  echo "Navegador de Remotion OK (remotion.media)."
elif npx --yes @puppeteer/browsers install chrome-headless-shell@stable --path "$(pwd)/.browsers"; then
  echo "Navegador OK vía Chrome for Testing (storage.googleapis.com) en .browsers/."
else
  echo "⚠️  Sin navegador: la red bloquea remotion.media y storage.googleapis.com."
  echo "    Habilita esos dominios en el acceso a internet del entorno y reejecuta ./setup.sh"
fi

echo "── 4/4 · Verificación ──"
ffmpeg -version | head -1
pdftoppm -v 2>&1 | head -1
python -c "import docx, pptx, lxml, requests, PIL; print('Python deps: OK')"
if [ -z "${GEMINI_API_KEY:-}" ]; then
  echo "⚠️  FALTA GEMINI_API_KEY: agrégala como SECRETO del entorno (nunca al repo)."
else
  echo "GEMINI_API_KEY: presente"
fi
echo "Listo. Recuerda activar el venv en cada sesión:  . .venv/bin/activate"
