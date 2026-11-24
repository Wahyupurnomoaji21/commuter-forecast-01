// Charm the Commuter: Forecast a City That Isn't
// Writes one line of weather forecast (<=140 chars) for the fictional city
// of Snizzlewick to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Snizzlewick: sunshine all morning, with a shower of compliments at 8:15 — the bus is on time, and honestly, you look great today.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entry = ENTRY.trim();

if (entry.length < 1 || entry.length > 140) {
  console.error(`entry must be 1-140 chars, got ${entry.length}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry + "\n", "utf8");

// Read back and verify: the file must hold exactly the entry (plus newline).
const written = readFileSync(outPath, "utf8");
if (written !== entry + "\n") {
  console.error("entry.txt round-trip mismatch");
  process.exit(1);
}
console.log(`wrote entry.txt (${entry.length} chars)`);
