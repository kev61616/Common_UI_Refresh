import { type Node } from '@markdoc/markdoc'

import { DocsHeader } from '@/components/DocsHeader'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { collectSections } from '@/lib/sections'

export function DocsLayout({
  children,
  frontmatter: { title },
  nodes,
}: {
  children: React.ReactNode
  frontmatter: { title?: string }
  nodes: Array<Node>
}) {
  // We still collect sections for potential future use
  let tableOfContents = collectSections(nodes)

  return (
    <div className="max-w-3xl mx-auto py-16">
      <article className="min-w-0">
        <DocsHeader title={title} />
        <Prose>{children}</Prose>
      </article>
      <PrevNextLinks className="mt-12" />
    </div>
  )
}
