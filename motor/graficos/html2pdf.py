#!/usr/bin/env python3
"""
Motor gráfico NOVAR · HTML → PDF (+ PNG).

Uso: python3 html2pdf.py pieza.html salida.pdf [--png] [--dpi 200]

- El HTML debe ser autocontenido: fuentes y logos incrustados en base64
  (las Barlow del sello están en sello-novar/fuentes/).
- Tamaño de página: definirlo en el CSS con @page { size: ...; margin: 0; }.
- El PNG se genera desde el PDF con pdftoppm (nítido, sin trucos de viewport).
"""
import argparse, glob, os, subprocess, sys

def chromium():
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
    pats = ["/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell",
            "/opt/pw-browsers/chromium-*/chrome-linux/chrome",
            os.path.join(root, ".browsers", "**", "chrome-headless-shell"),
            os.path.join(root, ".browsers", "**", "chrome"),
            "/usr/bin/chromium", "/usr/bin/chromium-browser"]
    for pat in pats:
        h = sorted(glob.glob(pat, recursive=True))
        if h: return h[-1]
    sys.exit("No hay Chromium disponible. Corre ./setup.sh (necesita red a remotion.media o storage.googleapis.com).")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("html"); ap.add_argument("pdf")
    ap.add_argument("--png", action="store_true"); ap.add_argument("--dpi", type=int, default=200)
    a = ap.parse_args()
    subprocess.run([chromium(), "--headless", "--no-sandbox", "--disable-gpu",
                    "--no-pdf-header-footer", f"--print-to-pdf={a.pdf}",
                    "file://" + os.path.abspath(a.html)], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("PDF:", a.pdf)
    if a.png:
        base = a.pdf[:-4] if a.pdf.lower().endswith(".pdf") else a.pdf
        subprocess.run(["pdftoppm", "-png", "-r", str(a.dpi), "-singlefile", a.pdf, base], check=True)
        print("PNG:", base + ".png")

if __name__ == "__main__":
    main()
