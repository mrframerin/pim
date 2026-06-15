import { cp, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The Notion mirror's webpack bundle requests lazily-loaded chunks from the
// bare `/_next/static/...` public path (its internal publicPath is `/_next/`).
//
// Locally, the `fallback` rewrite in next.config.mjs maps `/_next/static/*` to
// `/notion-mirror/_next/static/*`, so those chunks resolve. On Vercel, rewrites
// under `/_next/*` are ignored (the path is reserved and served straight from
// the build's static output), so the lazy chunks 404 -> ChunkLoadError ->
// Notion's "Sorry, an error occurred" boundary fires on scroll.
//
// Fix: mirror the static assets into the real build output (`.next/static`),
// which Vercel serves at `/_next/static/`. Existing host-app files are never
// overwritten, so the outer page keeps its own chunks.

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(scriptDir, "..");
const source = path.join(workspace, "public", "notion-mirror", "_next", "static");
const target = path.join(workspace, ".next", "static");

if (!existsSync(source) || !existsSync(target)) {
  process.exit(0);
}

let copied = 0;
let skipped = 0;

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const fromPath = path.join(from, entry.name);
    const toPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(fromPath, toPath);
    } else if (entry.isFile()) {
      if (existsSync(toPath)) {
        // Never clobber a file the host build already produced.
        skipped += 1;
        continue;
      }
      await cp(fromPath, toPath);
      copied += 1;
    }
  }
}

await copyDir(source, target);

console.log(
  `[copy-mirror-static] copied ${copied} file(s) into .next/static (skipped ${skipped} existing).`
);
