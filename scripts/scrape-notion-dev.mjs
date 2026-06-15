import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceUrl = "https://www.notion.com/product/dev";
const savedHtmlPath = "C:/Users/TITUS/Downloads/notion.com/notion.com/product/dev.html";
const outRoot = path.join(root, "public", "notion-mirror");
const origin = "https://www.notion.com";
const allowedHosts = new Set([
  "www.notion.com",
  "notion.com",
  "images.ctfassets.net",
  "videos.ctfassets.net"
]);

const queue = [];
const seen = new Set();
const downloaded = new Map();
let initialHtmlPhase = true;

function toUrl(raw, base = sourceUrl) {
  if (!raw || raw.startsWith("data:") || raw.startsWith("blob:") || raw.startsWith("#")) return null;
  const clean = raw.replaceAll("&amp;", "&").trim();
  try {
    return new URL(clean, base);
  } catch {
    return null;
  }
}

function localPathFor(url) {
  if (url.pathname === "/_next/image") {
    const source = url.searchParams.get("url");
    if (source) return localPathFor(new URL(source, origin));
  }

  if (url.hostname === "www.notion.com" || url.hostname === "notion.com") {
    if (url.pathname.startsWith("/_next/static/")) {
      return {
        publicPath: `/notion-mirror${url.pathname}`,
        filePath: path.join(outRoot, url.pathname)
      };
    }
    if (url.pathname.startsWith("/front-static/")) {
      return {
        publicPath: `/notion-mirror${url.pathname}`,
        filePath: path.join(outRoot, url.pathname)
      };
    }
  }

  if (url.hostname === "images.ctfassets.net" || url.hostname === "videos.ctfassets.net") {
    return {
      publicPath: `/notion-mirror/remote/${url.hostname}${url.pathname}`,
      filePath: path.join(outRoot, "remote", url.hostname, url.pathname)
    };
  }

  return null;
}

function enqueue(raw, base = sourceUrl) {
  const url = toUrl(raw, base);
  if (!url || !allowedHosts.has(url.hostname)) return;
  const local = localPathFor(url);
  if (!local) return;
  if (!initialHtmlPhase && isBroadFrontStatic(url)) return;
  const key = url.href;
  if (seen.has(key)) return;
  seen.add(key);
  queue.push({ url, local });
}

function isBroadFrontStatic(url) {
  if (!(url.hostname === "www.notion.com" || url.hostname === "notion.com")) return false;
  if (!url.pathname.startsWith("/front-static/")) return false;
  return !(
    url.pathname.startsWith("/front-static/pages/dev/") ||
    url.pathname.startsWith("/front-static/meta/dev-platform") ||
    url.pathname.startsWith("/front-static/fonts/") ||
    url.pathname.startsWith("/front-static/favicon") ||
    url.pathname.startsWith("/front-static/logo")
  );
}

function collectFromText(text, base = sourceUrl) {
  const attr = /\b(?:src|href|poster)=["']([^"']+)["']/g;
  const srcset = /\bsrcSet=["']([^"']+)["']/g;
  const urlFn = /url\((?!['"]?data:)(['"]?)([^'")]+)\1\)/g;
  const absolute = /https:\/\/(?:www\.notion\.com|notion\.com|images\.ctfassets\.net|videos\.ctfassets\.net)\/[^"'\\\s<>)]+/g;
  const rootAsset = /(?:\/_next\/static|\/front-static)\/[^"'\\\s<>)]+/g;
  const imageRoute = /\/_next\/image\?url=[^"'\\\s<>)]+/g;

  for (const match of text.matchAll(attr)) enqueue(match[1], base);
  for (const match of text.matchAll(srcset)) {
    for (const part of match[1].split(",")) enqueue(part.trim().split(/\s+/)[0], base);
  }
  for (const match of text.matchAll(urlFn)) enqueue(match[2], base);
  for (const match of text.matchAll(absolute)) enqueue(match[0], base);
  for (const match of text.matchAll(rootAsset)) enqueue(match[0], base);
  for (const match of text.matchAll(imageRoute)) enqueue(match[0], base);
  collectWebpackDynamicChunks(text, base);
}

function rewriteAssetRefs(text) {
  return text
    .replace(/(?:https:\/\/www\.notion\.com)?\/_next\/image\?url=([^&"'\\\s<>)]+)(?:(?:&amp;|&)[^"',\s<>)]+)*/g, (full, encodedSource) => {
      const source = decodeURIComponent(encodedSource);
      const local = localPathFor(new URL(source, origin));
      return local?.publicPath ?? full;
    })
    .replace(/https:\/\/www\.notion\.com\/_next\/static\//g, "/notion-mirror/_next/static/")
    .replace(/(?<!\/notion-mirror)\/_next\/static\//g, "/notion-mirror/_next/static/")
    .replace(/https:\/\/www\.notion\.com\/front-static\//g, "/notion-mirror/front-static/")
    .replace(/(?<!\/notion-mirror)\/front-static\//g, "/notion-mirror/front-static/")
    .replace(/https:\/\/images\.ctfassets\.net\/([^"'\\\s<>)]+)/g, "/notion-mirror/remote/images.ctfassets.net/$1")
    .replace(/https:\/\/videos\.ctfassets\.net\/([^"'\\\s<>)]+)/g, "/notion-mirror/remote/videos.ctfassets.net/$1")
    .replace(/(\/notion-mirror\/[^"',\s<>)]+?\.(?:webp|png|jpe?g|svg|ico|woff2|mp4|mp3|ogg))(?:&amp;|&)[^"',\s<>)]+/g, "$1")
    .replace(/\.p="\/_next\/"/g, '.p="/notion-mirror/_next/"');
}

function parseObjectLiteralPairs(source) {
  const pairs = new Map();
  for (const match of source.matchAll(/([A-Za-z0-9_.]+):"([^"]+)"/g)) {
    pairs.set(String(Number(match[1])), match[2]);
  }
  return pairs;
}

function collectWebpackDynamicChunks(text, base) {
  if (!text.includes("static/chunks/") && !text.includes("static/css/")) return;

  for (const match of text.matchAll(/static\/(?:chunks|css)\/[^"'\\+()]+?\.(?:js|css)/g)) {
    enqueue(`/_next/${match[0]}`, base);
  }

  const jsFallback = text.match(/\(\(\{([\s\S]*?)\}\)\[e\]\|\|e\)\+"\."\+\(\{([\s\S]*?)\}\)\[e\]\+"\.js"/);
  if (jsFallback) {
    const names = parseObjectLiteralPairs(jsFallback[1]);
    const hashes = parseObjectLiteralPairs(jsFallback[2]);
    for (const [id, hash] of hashes) {
      const name = names.get(id) || id;
      enqueue(`/_next/static/chunks/${name}.${hash}.js`, base);
    }
  }

  const cssFallback = text.match(/"static\/css\/"\+\(\{([\s\S]*?)\}\)\[e\]\+"\.css"/);
  if (cssFallback) {
    for (const [id, hash] of parseObjectLiteralPairs(cssFallback[1])) {
      enqueue(`/_next/static/css/${hash}.css`, base);
    }
  }
}

async function getHtml() {
  try {
    const response = await fetch(sourceUrl);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.text();
  } catch (error) {
    console.warn(`Live fetch failed, using saved HTML: ${error.message}`);
    return readFile(savedHtmlPath, "utf8");
  }
}

async function downloadOne(item) {
  const { url, local } = item;
  await mkdir(path.dirname(local.filePath), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url.href}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(local.filePath, buffer);
  downloaded.set(url.href, local.filePath);

  const type = response.headers.get("content-type") || "";
  if (type.includes("text") || type.includes("javascript") || type.includes("json") || /\.(css|js|json|svg)$/i.test(url.pathname)) {
    const text = buffer.toString("utf8");
    collectFromText(text, url.href);
    const rewritten = rewriteAssetRefs(text);
    if (rewritten !== text && /\.(css|js|json)$/i.test(url.pathname)) {
      await writeFile(local.filePath, rewritten);
    }
  }
}

async function scanExistingTextAsset(item) {
  if (!/\.(css|js|json|svg)$/i.test(item.url.pathname)) return;
  const text = await readFile(item.local.filePath, "utf8");
  collectFromText(text, item.url.href);
  const rewritten = rewriteAssetRefs(text);
  if (rewritten !== text && /\.(css|js|json)$/i.test(item.url.pathname)) {
    await writeFile(item.local.filePath, rewritten);
  }
}

async function main() {
  await mkdir(outRoot, { recursive: true });
  const html = await getHtml();
  await writeFile(path.join(outRoot, "dev.original.html"), html);
  collectFromText(html);
  initialHtmlPhase = false;

  let failures = 0;
  while (queue.length) {
    const item = queue.shift();
    try {
      if (existsSync(item.local.filePath)) {
        await scanExistingTextAsset(item);
      } else {
        await downloadOne(item);
      }
    } catch (error) {
      failures += 1;
      console.warn(`Failed: ${error.message}`);
    }
  }

  const mirrored = rewriteAssetRefs(html)
    .replaceAll("https://www.notion.com/product/dev", "/")
    .replaceAll("https://www.notion.com/product", "/")
    .replace(
      /(<head(?:\s[^>]*)?>)/i,
      '$1<meta http-equiv="Content-Security-Policy" content="default-src \'self\' data: blob:; script-src \'self\' \'unsafe-inline\' data: blob:; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: blob:; font-src \'self\' data:; media-src \'self\' data: blob:; connect-src \'self\' data: blob:;"><script src="/notion-mirror/static-frontend-guard.js"></script>'
    )
    .replace(/\shref="\/(?:login|signup)(?:[^"]*)?"/g, ' href="#"')
    .replace(/\sdata-analytics-href="\/(?:login|signup)(?:[^"]*)?"/g, ' data-analytics-href="#"')
    .replaceAll('href="dev.html#', 'href="#')
    .replaceAll('href="/product/dev#', 'href="#')
    .replaceAll("LOADING…", "LOADING...");

  await writeFile(path.join(outRoot, "dev.html"), mirrored);
  await writeFile(
    path.join(outRoot, "manifest.json"),
    JSON.stringify({ sourceUrl, assetCount: downloaded.size, failures }, null, 2)
  );

  console.log(`Mirrored ${downloaded.size} assets with ${failures} failures.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
