import { type Node } from '@markdoc/markdoc';

import { DocsHeader } from '@/components/DocsHeader';
import { PrevNextLinks } from '@/components/PrevNextLinks';
import { Prose } from '@/components/Prose';
// Removed TableOfContents import
import { collectSections } from '@/lib/sections';

export function DocsLayout({
  children,
  frontmatter: { title },
  nodes




}: {children: React.ReactNode;frontmatter: {title?: string;};nodes: Array<Node>;}) {
  // We still collect sections for potential future use
  let tableOfContents = collectSections(nodes);

  return (
    <>
      <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16" data-oid="oj.i7rg">
        <article data-oid="h69tw2a">
          <DocsHeader title={title} data-oid="59wuzd6" />
          <Prose data-oid="u:8k5y9">{children}</Prose>
        </article>
        <PrevNextLinks data-oid="me5__y7" />
      </div>
      {/* TableOfContents component removed */}
    </>);

}