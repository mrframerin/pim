import { createElement } from "react";
import { getConnectorChild } from "@/components/dev/originalHtml";

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr"
]);

/**
 * TEMP scaffold (Phase 0): renders a single child of `dev_connectorScope` from
 * the original HTML, in its real position, until a proper component replaces it.
 * Removed in Phase 3.
 */
export default function ExactConnectorChild({ index }: { index: number }) {
  const node = getConnectorChild(index);
  if (!node) return null;

  const isVoid = VOID_TAGS.has(node.tag);
  return createElement(node.tag, {
    ...node.attrs,
    ...(isVoid || !node.inner
      ? {}
      : { dangerouslySetInnerHTML: { __html: node.inner } }),
    suppressHydrationWarning: true
  });
}
