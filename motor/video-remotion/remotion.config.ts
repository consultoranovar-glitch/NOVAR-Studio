import { Config } from "@remotion/cli/config";
import fs from "fs";

Config.setVideoImageFormat("jpeg");
Config.setConcurrency(2);

// Si el entorno trae un Chromium administrado (p. ej. contenedores con Playwright),
// úsalo; si no, Remotion descarga y administra su propio navegador (npx remotion browser ensure).
const roots = ["/opt/pw-browsers"];
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const dir of fs.readdirSync(root)) {
    for (const bin of ["chrome-linux/headless_shell", "chrome-linux/chrome"]) {
      const p = `${root}/${dir}/${bin}`;
      if (fs.existsSync(p)) {
        Config.setBrowserExecutable(p);
        break;
      }
    }
  }
}
