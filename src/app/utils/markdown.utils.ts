import remarkParse from "remark-parse";
import { unified } from "unified";
import { Heading } from "mdast";

type MarkdownHeader = {
  text: string;
  children?: MarkdownHeader[];
};

/**
 * Parses markdown code and returns an array of headers representing the
 * hierarchical structure of headers. The elements of the array are h1 elements,
 * each containing h2 elements if any, which contains h3 elements if any, etc.
 *
 * @param markdown The markdown code
 * @returns An array of headers in hierarchical structure. The elements of the
 *   array are h1 elements.
 */
function extractHeaders(markdown: string): MarkdownHeader[] {
  const root = unified().use(remarkParse).parse(markdown);
  const headers: MarkdownHeader[] = [];
  const headerAncestorStack: Array<{ header: MarkdownHeader; depth: number }> =
    [];

  for (const n of root.children) {
    if (n.type !== "heading") continue;

    const headerNode = n as Heading;
    const formattedHeader = {
      text: headerNode.children
        .filter((n) => n.type === "text")
        .map((n) => n.value)
        .join(""),
    };

    while (
      headerAncestorStack.length > 0 &&
      headerNode.depth <=
        headerAncestorStack[headerAncestorStack.length - 1].depth
    )
      headerAncestorStack.pop();

    if (headerAncestorStack.length === 0) {
      headers.push(formattedHeader);
    } else {
      const parent = headerAncestorStack[headerAncestorStack.length - 1].header;
      if (!parent.children) parent.children = [];
      parent.children?.push(formattedHeader);
    }
    headerAncestorStack.push({
      header: formattedHeader,
      depth: headerNode.depth,
    });
  }

  return headers;
}

export { extractHeaders };
export type { MarkdownHeader };
