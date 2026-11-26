import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "line.txt"), "utf8").trim();

if (line.length === 0 || line.length > 200) {
  throw new Error(`Entry line must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n")) {
  throw new Error("Entry line must be a single line");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  process.env.MAKEFUN_BOT_DIR ||
  "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(`Wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
