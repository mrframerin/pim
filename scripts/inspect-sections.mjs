import { readFileSync } from "node:fs";

const html = readFileSync("public/notion-mirror/dev.original.html", "utf8");
const voids = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);

function findTagEnd(h, s) {
  let q = null;
  for (let i = s; i < h.length; i++) {
    const c = h[i];
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === ">") return i;
  }
  return -1;
}

function sliceEl(h, start) {
  const oe = findTagEnd(h, start);
  if (oe < 0) return null;
  const open = h.slice(start, oe + 1);
  const tm = /^<([a-zA-Z][\w:-]*)/.exec(open);
  if (!tm) return null;
  const tag = tm[1].toLowerCase();
  if (voids.has(tag) || open.endsWith("/>")) return { tag, open, end: oe + 1 };
  let depth = 1, cur = oe + 1;
  while (cur < h.length) {
    const no = h.indexOf("<", cur);
    if (no < 0) return null;
    if (h.startsWith("<!--", no)) { const ce = h.indexOf("-->", no + 4); cur = ce < 0 ? h.length : ce + 3; continue; }
    const ne = findTagEnd(h, no);
    if (ne < 0) return null;
    const tok = h.slice(no, ne + 1);
    if (new RegExp("^</" + tag + "\\s*>", "i").test(tok)) { depth--; if (depth === 0) return { tag, open, end: ne + 1, full: h.slice(start, ne + 1) }; }
    else if (new RegExp("^<" + tag + "(\\s|>|/)", "i").test(tok) && !tok.endsWith("/>")) depth++;
    cur = ne + 1;
  }
  return null;
}

const ms = html.indexOf("<main");
const me = findTagEnd(html, ms);
const mainEl = sliceEl(html, ms);
const inner = html.slice(me + 1, ms + mainEl.full.length - "</main>".length);

let cur = 0, idx = 0;
while (cur < inner.length) {
  const n = inner.indexOf("<", cur);
  if (n < 0) break;
  if (inner.startsWith("<!--", n)) { const ce = inner.indexOf("-->", n + 4); cur = ce < 0 ? inner.length : ce + 3; continue; }
  const el = sliceEl(inner, n);
  if (!el) break;
  const cls = (/class="([^"]*)"/.exec(el.open) || [])[1] || "";
  const len = el.full ? el.full.length : el.open.length;
  // grab first heading text if any
  const hMatch = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/.exec(el.full || "");
  const heading = hMatch ? hMatch[1].replace(/<[^>]+>/g, "").trim().slice(0, 60) : "";
  console.log(`[${idx}] <${el.tag}> len=${len}  class="${cls.slice(0,70)}"  ${heading ? "H: " + heading : ""}`);
  cur = el.end; idx++;
}
