// HTML -> JSX transformer for the 1:1 Notion mirror conversion.
// Input: a file of well-formed (browser/SSR-serialized) HTML for one element.
// Output: JSX to stdout. Keeps class names/ids verbatim; converts attrs to JSX;
// style="" -> style object; SVG attrs camelCased; <pre> preserved exactly via
// dangerouslySetInnerHTML (the only sanctioned raw-HTML use). Review before use.
import { readFileSync } from "node:fs";

const voids = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);

// HTML attr name -> JSX prop name (explicit cases). Hyphenated SVG attrs not
// listed fall through to camelCase(). data-*/aria-* are passed through verbatim.
const ATTR = {
  class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly",
  maxlength: "maxLength", minlength: "minLength", fetchpriority: "fetchPriority",
  autocomplete: "autoComplete", crossorigin: "crossOrigin", srcset: "srcSet",
  contenteditable: "contentEditable", spellcheck: "spellCheck", autofocus: "autoFocus",
  novalidate: "noValidate", enctype: "encType", autoplay: "autoPlay", playsinline: "playsInline",
  inputmode: "inputMode", enterkeyhint: "enterKeyHint", usemap: "useMap", accesskey: "accessKey",
  "xlink:href": "xlinkHref", "xml:space": "xmlSpace", "xml:lang": "xmlLang",
  // common SVG presentation attrs
  "fill-rule": "fillRule", "clip-rule": "clipRule", "clip-path": "clipPath",
  "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap", "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit", "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset", "stroke-opacity": "strokeOpacity",
  "fill-opacity": "fillOpacity", "stop-color": "stopColor", "stop-opacity": "stopOpacity",
  "text-anchor": "textAnchor", "dominant-baseline": "dominantBaseline", "vector-effect": "vectorEffect",
  "font-family": "fontFamily", "font-size": "fontSize", "font-weight": "fontWeight",
  "letter-spacing": "letterSpacing", "color-interpolation-filters": "colorInterpolationFilters",
  "gradientunits": "gradientUnits", "gradienttransform": "gradientTransform",
  "patternunits": "patternUnits", "patterncontentunits": "patternContentUnits",
  "preserveaspectratio": "preserveAspectRatio", "stddeviation": "stdDeviation"
};

// Boolean attributes: present (even as `attr=""`) means true in HTML. In JSX they
// must be `attr={true}`, not `attr=""` (empty string is falsy for these props).
const BOOLEAN_ATTRS = new Set([
  "readonly", "disabled", "checked", "selected", "multiple", "required",
  "autofocus", "hidden", "default", "controls", "loop", "muted", "autoplay",
  "playsinline", "novalidate", "formnovalidate", "itemscope", "open", "reversed",
  "ismap", "nomodule", "allowfullscreen"
]);

function camel(s) { return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }
function jsxAttrName(name) {
  const lower = name.toLowerCase();
  if (ATTR[lower]) return ATTR[lower];
  if (lower.startsWith("data-") || lower.startsWith("aria-")) return name;
  if (lower.includes("-")) return camel(lower); // generic SVG fall-through
  return name;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&rsquo;/g, "’").replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”").replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–").replace(/&hellip;/g, "…")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

function styleObject(value) {
  const entries = value.split(";").map((r) => r.trim()).filter(Boolean).map((rule) => {
    const i = rule.indexOf(":");
    const prop = rule.slice(0, i).trim();
    const val = rule.slice(i + 1).trim();
    const key = prop.startsWith("--") ? `"${prop}"` : camel(prop);
    return `${key}: ${JSON.stringify(val)}`;
  });
  return `{{ ${entries.join(", ")} } as CSSProperties}`;
}

function findTagEnd(h, s) { let q=null; for(let i=s;i<h.length;i++){const c=h[i]; if(q){if(c===q)q=null;continue;} if(c==='"'||c==="'"){q=c;continue;} if(c===">")return i;} return -1; }

function parseAttrs(openInner) {
  const attrs = [];
  const re = /([\w:-]+)(?:=("([^"]*)"|'([^']*)'|([^\s"'>/]+)))?/g;
  let m;
  while ((m = re.exec(openInner))) {
    const raw = m[1];
    const hasVal = m[2] !== undefined;
    const val = m[3] ?? m[4] ?? m[5];
    attrs.push({ name: jsxAttrName(raw), raw, hasVal, val });
  }
  return attrs;
}

function emitAttrs(attrs) {
  return attrs.map((a) => {
    if (a.raw.toLowerCase() === "style" && a.hasVal) return `style=${styleObject(a.val)}`;
    if (BOOLEAN_ATTRS.has(a.raw.toLowerCase())) return `${a.name}={true}`; // present => true
    if (!a.hasVal) return a.name; // valueless non-boolean attr
    // keep entity refs in attribute values (JSX decodes them); values are double-quoted in source
    return `${a.name}="${a.val}"`;
  }).join(" ");
}

function emitText(t) {
  if (/^\s*$/.test(t)) return /[^\S\r\n]/.test(t) ? '{" "}' : "";
  const needsBrace = /[{}<]/.test(t);
  if (needsBrace) return "{" + JSON.stringify(decodeEntities(t)) + "}";
  const lead = /^[^\S\r\n]/.test(t) ? '{" "}' : "";
  const trail = /[^\S\r\n]$/.test(t) ? '{" "}' : "";
  return lead + t.trim() + trail;
}

function parseNodes(inner) {
  const nodes = [];
  let cur = 0;
  while (cur < inner.length) {
    const lt = inner.indexOf("<", cur);
    if (lt === -1) { if (cur < inner.length) nodes.push({ type: "text", value: inner.slice(cur) }); break; }
    if (lt > cur) nodes.push({ type: "text", value: inner.slice(cur, lt) });
    if (inner.startsWith("<!--", lt)) { const ce = inner.indexOf("-->", lt + 4); cur = ce < 0 ? inner.length : ce + 3; continue; }
    const oe = findTagEnd(inner, lt);
    const open = inner.slice(lt, oe + 1);
    const tag = /^<([a-zA-Z][\w:-]*)/.exec(open)[1];
    const tl = tag.toLowerCase();
    if (voids.has(tl) || open.endsWith("/>")) { nodes.push({ type: "el", tag, open, inner: "", selfClose: true }); cur = oe + 1; continue; }
    // find matching close
    let depth = 1, c = oe + 1;
    while (c < inner.length) {
      const no = inner.indexOf("<", c);
      if (no < 0) break;
      if (inner.startsWith("<!--", no)) { const ce = inner.indexOf("-->", no + 4); c = ce < 0 ? inner.length : ce + 3; continue; }
      const ne = findTagEnd(inner, no);
      const tok = inner.slice(no, ne + 1);
      if (new RegExp("^</" + tl + "\\s*>", "i").test(tok)) { depth--; if (depth === 0) { nodes.push({ type: "el", tag, open, inner: inner.slice(oe + 1, no) }); cur = ne + 1; break; } }
      else if (new RegExp("^<" + tl + "(\\s|>|/)", "i").test(tok) && !tok.endsWith("/>")) depth++;
      c = ne + 1;
    }
    if (depth !== 0) { cur = inner.length; }
  }
  return nodes;
}

function emitEl(node, indent) {
  const pad = "  ".repeat(indent);
  const tag = node.tag;
  const openInner = node.open.replace(/^<[a-zA-Z][\w:-]*/, "").replace(/\/?>$/, "");
  const attrs = parseAttrs(openInner);
  const attrStr = attrs.length ? " " + emitAttrs(attrs) : "";

  if (node.selfClose || node.inner.trim() === "") return `${pad}<${tag}${attrStr} />`;

  // Preserve <pre> exactly (whitespace + token markup) via dangerouslySetInnerHTML.
  if (tag.toLowerCase() === "pre") {
    return `${pad}<${tag}${attrStr} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(node.inner)} }} />`;
  }

  const kids = parseNodes(node.inner);
  // pure-text element on one line
  if (kids.length === 1 && kids[0].type === "text") {
    return `${pad}<${tag}${attrStr}>${emitText(kids[0].value)}</${tag}>`;
  }
  const body = kids.map((k) => k.type === "text" ? (emitText(k.value) ? "  ".repeat(indent + 1) + emitText(k.value) : "") : emitEl(k, indent + 1)).filter(Boolean).join("\n");
  return `${pad}<${tag}${attrStr}>\n${body}\n${pad}</${tag}>`;
}

const file = process.argv[2];
const args = process.argv.slice(3);
const getArg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const name = getArg("--name");
const out = getArg("--out");
const doc = getArg("--doc") || "";

const html = readFileSync(file, "utf8").trim();
const nodes = parseNodes(html);

if (name) {
  // Emit a complete component file. Indent the body two levels (inside return()).
  const bodyRaw = nodes.map((n) => n.type === "el" ? emitEl(n, 2) : "    " + emitText(n.value)).join("\n");
  const needsCss = bodyRaw.includes("as CSSProperties");
  const hasImg = bodyRaw.includes("<img");
  const header = [];
  if (hasImg) header.push("/* eslint-disable @next/next/no-img-element */");
  if (needsCss) header.push('import type { CSSProperties } from "react";');
  const top = header.length ? header.join("\n") + "\n\n" : "";
  const docBlock = doc ? `/** ${doc} */\n` : "";
  const fileText = `${top}${docBlock}export default function ${name}() {\n  return (\n${bodyRaw}\n  );\n}\n`;
  if (out) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(out, fileText);
    console.log(`wrote ${out} (${fileText.length} bytes)`);
  } else {
    console.log(fileText);
  }
} else {
  console.log(nodes.map((n) => n.type === "el" ? emitEl(n, 0) : emitText(n.value)).join("\n"));
}
