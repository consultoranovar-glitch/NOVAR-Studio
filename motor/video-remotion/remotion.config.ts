import { Config } from "@remotion/cli/config";
import fs from "fs";
import path from "path";

Config.setVideoImageFormat("jpeg");
Config.setConcurrency(2);

// Autodetección de navegador, en orden: (1) Chromium administrado del entorno
// (/opt/pw-browsers, p. ej. contenedores con Playwright), (2) Chrome for Testing
// instalado por setup.sh en .browsers/ (raíz del repo). Si no hay ninguno,
// Remotion administra el suyo (npx remotion browser ensure).
const found: string[] = [];
const scan = (dir: string, depth: number) => {
  if (depth < 0) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p, depth - 1);
    else if (["headless_shell", "chrome-headless-shell", "chrome"].includes(e.name)) found.push(p);
  }
};
scan("/opt/pw-browsers", 3);
// cwd al correr remotion = motor/video-remotion; cubrimos también raíz del repo por si acaso
for (const rel of ["../../.browsers", ".browsers", "../.browsers"]) {
  scan(path.resolve(process.cwd(), rel), 5);
}
const pick = found.find((p) => p.includes("headless")) ?? found[0];
if (pick) Config.setBrowserExecutable(pick);
