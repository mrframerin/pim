import { createElement } from "react";
import { getOriginalSection } from "@/components/dev/originalHtml";

export default function ExactOriginalSection({ index }: { index: number }) {
  const section = getOriginalSection(index);
  if (!section) return null;

  return createElement(section.tag, {
    ...section.attrs,
    dangerouslySetInnerHTML: { __html: section.inner },
    suppressHydrationWarning: true
  });
}
