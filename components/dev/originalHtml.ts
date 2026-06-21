import { readFileSync } from "node:fs";
import { join } from "node:path";

function findTagEnd(html: string, start: number) {
  let quote: string | null = null;

  for (let i = start; i < html.length; i += 1) {
    const char = html[i];

    if (quote) {
      if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === ">") return i;
  }

  return -1;
}

function sliceElement(html: string, start: number) {
  const openEnd = findTagEnd(html, start);
  if (openEnd === -1) return null;

  const openTag = html.slice(start, openEnd + 1);
  const tagMatch = /^<([a-zA-Z][\w:-]*)\b/.exec(openTag);
  if (!tagMatch) return null;

  const tag = tagMatch[1].toLowerCase();
  const voidTags = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);

  if (voidTags.has(tag) || openTag.endsWith("/>")) {
    return { html: openTag, end: openEnd + 1 };
  }

  let depth = 1;
  let cursor = openEnd + 1;

  while (cursor < html.length) {
    const nextOpen = html.indexOf("<", cursor);
    if (nextOpen === -1) return null;

    if (html.startsWith("<!--", nextOpen)) {
      const commentEnd = html.indexOf("-->", nextOpen + 4);
      cursor = commentEnd === -1 ? html.length : commentEnd + 3;
      continue;
    }

    const nextEnd = findTagEnd(html, nextOpen);
    if (nextEnd === -1) return null;

    const token = html.slice(nextOpen, nextEnd + 1);
    const closeMatch = new RegExp(`^</${tag}\\s*>`, "i").exec(token);
    const openMatch = new RegExp(`^<${tag}(\\s|>|/)`, "i").exec(token);

    if (closeMatch) {
      depth -= 1;
      if (depth === 0) return { html: html.slice(start, nextEnd + 1), end: nextEnd + 1 };
    } else if (openMatch && !token.endsWith("/>") && !voidTags.has(tag)) {
      depth += 1;
    }

    cursor = nextEnd + 1;
  }

  return null;
}

function splitTopLevelChildren(html: string) {
  const children: string[] = [];
  let cursor = 0;

  while (cursor < html.length) {
    const next = html.indexOf("<", cursor);
    if (next === -1) break;

    if (html.startsWith("<!--", next)) {
      const commentEnd = html.indexOf("-->", next + 4);
      cursor = commentEnd === -1 ? html.length : commentEnd + 3;
      continue;
    }

    const element = sliceElement(html, next);
    if (!element) break;

    children.push(element.html);
    cursor = element.end;
  }

  return children;
}

function parseStyleAttribute(value: string) {
  return Object.fromEntries(
    value
      .split(";")
      .map((rule) => rule.trim())
      .filter(Boolean)
      .map((rule) => {
        const colon = rule.indexOf(":");
        const property = rule.slice(0, colon).trim();
        const styleValue = rule.slice(colon + 1).trim();
        return [property, styleValue];
      })
  );
}

function getOriginalMainChildren() {
  const html = readFileSync(join(process.cwd(), "public", "notion-mirror", "dev.html"), "utf8");
  const mainStart = html.indexOf("<main ");
  if (mainStart === -1) return [];

  const main = sliceElement(html, mainStart);
  if (!main) return [];

  const openEnd = findTagEnd(main.html, 0);
  if (openEnd === -1) return [];

  const inner = main.html.slice(openEnd + 1, main.html.lastIndexOf("</main>"));
  return splitTopLevelChildren(inner);
}

export function getOriginalSection(index: number) {
  const html = getOriginalMainChildren()[index];
  return parseRootElement(html);
}

/**
 * TEMP scaffold (Phase 0): returns the Nth direct child of `dev_connectorScope`
 * (main > block[1] > [1.1]) so not-yet-ported sub-sections can render in place
 * while real components are built one by one. Removed in Phase 3.
 */
export function getConnectorChild(index: number) {
  const main = getOriginalMainChildren();
  const block1 = parseRootElement(main[1]);
  if (!block1) return null;
  const scopeHtml = splitTopLevelChildren(block1.inner)[1];
  const scope = parseRootElement(scopeHtml);
  if (!scope) return null;
  const childHtml = splitTopLevelChildren(scope.inner)[index];
  return parseRootElement(childHtml);
}

export function getOriginalFooter() {
  const html = readFileSync(join(process.cwd(), "public", "notion-mirror", "dev.html"), "utf8");
  const footerStart = html.indexOf("<footer ");
  if (footerStart === -1) return null;

  const footer = sliceElement(html, footerStart);
  return parseRootElement(footer?.html);
}

function parseRootElement(html?: string) {
  if (!html) return null;

  const openEnd = findTagEnd(html, 0);
  if (openEnd === -1) return null;

  const openTag = html.slice(0, openEnd + 1);
  const tagMatch = /^<([a-zA-Z][\w:-]*)\b/.exec(openTag);
  if (!tagMatch) return null;

  const tag = tagMatch[1].toLowerCase();
  const attrs: Record<string, string | true | Record<string, string>> = {};
  const attrSource = openTag.slice(tagMatch[0].length, -1);
  const attrPattern = /([\w:-]+)(?:=("([^"]*)"|'([^']*)'|([^\s"'>/]+)))?/g;
  let match: RegExpExecArray | null;

  while ((match = attrPattern.exec(attrSource))) {
    const rawName = match[1];
    const value = match[3] ?? match[4] ?? match[5] ?? true;
    const name = rawName === "class" ? "className" : rawName;
    attrs[name] = name === "style" && typeof value === "string" ? parseStyleAttribute(value) : value;
  }

  const closeTag = `</${tag}>`;
  const closeStart = html.toLowerCase().lastIndexOf(closeTag);
  const inner = closeStart === -1 ? "" : html.slice(openEnd + 1, closeStart);

  return { attrs, inner, tag };
}
