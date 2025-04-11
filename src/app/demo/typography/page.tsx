import { Typography } from "@/components/ui/typography";

export default function TypographyDemo() {
  return (
    <div className="container max-w-4xl py-10 space-y-12" data-oid="vg6ay05">
      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
        <Typography variant="h4" className="text-primary mb-2">New Typography Control Panel</Typography>
        <Typography variant="p">
          Try out our new interactive typography control panel where you can experiment with different font settings in real-time.
        </Typography>
        <div className="mt-3">
          <a href="/demo/typography-control" className="px-4 py-2 rounded-md bg-primary text-primary-foreground inline-block hover:bg-primary/90 transition-colors">
            Open Typography Control Panel
          </a>
        </div>
      </div>
      <div data-oid="fahyxrd">
        <Typography variant="h1" className="mb-6" data-oid="5vm:tv0">Typography System</Typography>
        <Typography variant="lead" data-oid="191eqck">
          This page demonstrates the typography system used in the Syntax Learning Platform.
          It showcases various heading styles, paragraph formats, and utility classes.
        </Typography>
      </div>

      <div className="space-y-6" data-oid="iftxj2t">
        <Typography variant="h2" data-oid="z0a481z">Heading Examples</Typography>
        <div className="grid gap-4" data-oid="glis1m8">
          <Typography variant="h1" data-oid="6elvtth">Heading 1 (2.5rem)</Typography>
          <Typography variant="h2" data-oid="zx9:366">Heading 2 (2rem)</Typography>
          <Typography variant="h3" data-oid=":mx4:m-">Heading 3 (1.75rem)</Typography>
          <Typography variant="h4" data-oid="jzi:dia">Heading 4 (1.5rem)</Typography>
          <Typography variant="h5" data-oid="zk8zlqz">Heading 5 (1.25rem)</Typography>
          <Typography variant="h6" data-oid="azkdn4b">Heading 6 (1.125rem)</Typography>
        </div>
      </div>

      <div className="space-y-6" data-oid="0p4cvav">
        <Typography variant="h2" data-oid="b2z2_s6">Paragraph Styles</Typography>
        <div className="grid gap-6" data-oid="5lkufhx">
          <div data-oid="o.ql_hg">
            <Typography variant="small" className="text-muted-foreground mb-2" data-oid="loa_.:n">P1 (1.25rem)</Typography>
            <p className="text-p1" data-oid="gyoaajc">
              This is a paragraph in text-p1 size. It's designed for lead paragraphs 
              that introduce a section or provide important context. The size is 
              large enough to draw attention but not as prominent as headings.
            </p>
          </div>
          <div data-oid="t9:dzza">
            <Typography variant="small" className="text-muted-foreground mb-2" data-oid="xhya-lm">P2 (1.125rem)</Typography>
            <p className="text-p2" data-oid="bv.0h-a">
              This is a paragraph in text-p2 size. It works well for standard content that 
              needs a bit more emphasis than the default body text, such as important 
              instructions or key information that should stand out.
            </p>
          </div>
          <div data-oid="_h-_umu">
            <Typography variant="small" className="text-muted-foreground mb-2" data-oid="3i1irso">P3 (1rem) - Default</Typography>
            <p className="text-p3" data-oid="dkyj86p">
              This is a paragraph in text-p3 size, which is the default body text size. 
              It's optimized for readability in longer content blocks and provides 
              a comfortable reading experience across different screen sizes.
            </p>
          </div>
          <div data-oid="ejus.pe">
            <Typography variant="small" className="text-muted-foreground mb-2" data-oid="cdrmfb.">P4 (0.875rem)</Typography>
            <p className="text-p4" data-oid=".fpqgqn">
              This is a paragraph in text-p4 size. It's useful for secondary information, notes, 
              captions, or any content that should be visually subordinate to the main text 
              but still readable.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6" data-oid="9swp9fx">
        <Typography variant="h2" data-oid="6liuyx4">Font Weights</Typography>
        <div className="grid gap-4" data-oid="h.zzaba">
          <div className="font-normal" data-oid="wh9opus">Regular (400) - The default weight for body text</div>
          <div className="font-medium" data-oid="xnrdz2o">Medium (500) - Subtle emphasis, good for subheadings</div>
          <div className="font-semibold" data-oid="l6f13ze">Semibold (600) - Standard weight for headings</div>
          <div className="font-bold" data-oid="ieeghyx">Bold (700) - Strong emphasis, calls to action</div>
        </div>
      </div>

      <div className="space-y-6" data-oid="sf68t-y">
        <Typography variant="h2" data-oid="fu0-d:5">Special Variants</Typography>
        <div className="space-y-4" data-oid="g39g87l">
          <Typography variant="blockquote" data-oid="gosh_2j">
            This is a blockquote. It's useful for displaying quoted text or
            highlighting important information that needs to stand out from
            the rest of the content.
          </Typography>
          
          <Typography variant="lead" data-oid="w:.qqpg">
            This is a lead paragraph. It's designed to introduce a section with
            slightly larger text that draws the reader in.
          </Typography>
          
          <Typography variant="large" data-oid="qut4d6-">
            This is large text, which can be used for emphasis without using a heading.
          </Typography>
          
          <Typography variant="small" data-oid="opep9_e">
            This is small text, useful for captions, footnotes, or supplementary information.
          </Typography>
          
          <Typography variant="muted" data-oid="3nt3-cj">
            This is muted text, which uses a less prominent color for secondary information.
          </Typography>
        </div>
      </div>

      <div className="space-y-6" data-oid="uhb700p">
        <Typography variant="h2" data-oid="7714f6b">Combining Classes</Typography>
        <div className="space-y-4" data-oid="6iq29.4">
          <p className="text-p1 font-bold" data-oid="0k15_ht">
            Bold paragraph text (text-p1 + font-bold)
          </p>
          
          <p className="text-p2 font-medium text-primary" data-oid="no22zxo">
            Medium weight, primary colored text (text-p2 + font-medium + text-primary)
          </p>
          
          <p className="text-p3 italic" data-oid="jx.o4.8">
            Italic body text (text-p3 + italic)
          </p>
          
          <p className="text-p4 font-semibold tracking-wide uppercase" data-oid="a8ew5zt">
            Small caps, semibold, widely tracked text (text-p4 + font-semibold + tracking-wide + uppercase)
          </p>
        </div>
      </div>
      
      <div className="space-y-6" data-oid="c5hibk4">
        <Typography variant="h2" data-oid="bl217k1">Typography Component Usage</Typography>
        <div className="space-y-4" data-oid="_oetziz">
          <Typography data-oid="f-cfqt8">
            Default typography component renders as a paragraph
          </Typography>
          
          <Typography weight="bold" data-oid="d:k7d9-">
            Bold text using the weight prop
          </Typography>
          
          <Typography variant="h3" weight="medium" data-oid="_pl58p6">
            Medium weight heading using variant and weight props
          </Typography>
          
          <Typography variant="muted" className="italic" data-oid="yvjuron">
            Muted text with additional italic class
          </Typography>
        </div>
      </div>
    </div>);

}
