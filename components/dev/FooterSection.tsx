import { createElement } from "react";
import { getOriginalFooter } from "@/components/dev/originalHtml";

export default function FooterSection() {
  const footer = getOriginalFooter();
  if (!footer) return null;

  return createElement(footer.tag, {
    ...footer.attrs,
    dangerouslySetInnerHTML: { __html: footer.inner },
    suppressHydrationWarning: true
  });
}
