import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(scriptDir, "..");
const serverDir = path.join(workspace, ".next", "server");
const chunksDir = path.join(serverDir, "chunks");

let entries;
try {
  entries = await readdir(chunksDir, { withFileTypes: true });
} catch {
  process.exit(0);
}

for (const entry of entries) {
  if (!entry.isFile() || !entry.name.endsWith(".js")) continue;
  await copyFile(path.join(chunksDir, entry.name), path.join(serverDir, entry.name));
}
