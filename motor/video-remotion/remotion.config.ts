import { Config } from "@remotion/cli/config";
import fs from "fs";
import path from "path";

Config.setVideoImageFormat("jpeg");
Config.setConcurrency(2);

// Busca un navegador ya disponible: (1) Chromium administrado del entorno (Playwright),
// (2) Chrome for Testing instalado por setup.sh en .browsers/ del repo.
// Si no hay ninguno, Remotion administra el suyo (npx remotion browser ensure).
const found: string[] = [];
const scan = (dir: string, depth: number) => {
  if (depth < 0 || !fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p, depth - 1);
    else if (["headless_shell", "chrome-headless-shell", "chrome"].includes(e.name)) found.push(p);
  }
};
scan("/opt/pw-browsers", 3);
scan(path.join(__dirname, "..", "..", ".browsers"), 4);
const pick = found.find((p) => p.includes("headless")) ?? found[0];
if (pick) Config.setBrowserExecutable(pick);
