import { Typography } from "@/components/ui/typography";

export default function TypographyDemo() {
  return (
    <div className="container max-w-4xl py-10 space-y-12">
      <div>
        <Typography variant="h1" className="mb-6">Typography System</Typography>
        <Typography variant="lead">
          This page demonstrates the typography system used in the Syntax Learning Platform.
          It showcases various heading styles, paragraph formats, and utility classes.
        </Typography>
      </div>

      <div className="space-y-6">
        <Typography variant="h2">Heading Examples</Typography>
        <div className="grid gap-4">
          <Typography variant="h1">Heading 1 (2.5rem)</Typography>
          <Typography variant="h2">Heading 2 (2rem)</Typography>
          <Typography variant="h3">Heading 3 (1.75rem)</Typography>
          <Typography variant="h4">Heading 4 (1.5rem)</Typography>
          <Typography variant="h5">Heading 5 (1.25rem)</Typography>
          <Typography variant="h6">Heading 6 (1.125rem)</Typography>
        </div>
      </div>

      <div className="space-y-6">
        <Typography variant="h2">Paragraph Styles</Typography>
        <div className="grid gap-6">
          <div>
            <Typography variant="small" className="text-muted-foreground mb-2">P1 (1.25rem)</Typography>
            <p className="text-p1">
              This is a paragraph in text-p1 size. It's designed for lead paragraphs 
              that introduce a section or provide important context. The size is 
              large enough to draw attention but not as prominent as headings.
            </p>
          </div>
          <div>
            <Typography variant="small" className="text-muted-foreground mb-2">P2 (1.125rem)</Typography>
            <p className="text-p2">
              This is a paragraph in text-p2 size. It works well for standard content that 
              needs a bit more emphasis than the default body text, such as important 
              instructions or key information that should stand out.
            </p>
          </div>
          <div>
            <Typography variant="small" className="text-muted-foreground mb-2">P3 (1rem) - Default</Typography>
            <p className="text-p3">
              This is a paragraph in text-p3 size, which is the default body text size. 
              It's optimized for readability in longer content blocks and provides 
              a comfortable reading experience across different screen sizes.
            </p>
          </div>
          <div>
            <Typography variant="small" className="text-muted-foreground mb-2">P4 (0.875rem)</Typography>
            <p className="text-p4">
              This is a paragraph in text-p4 size. It's useful for secondary information, notes, 
              captions, or any content that should be visually subordinate to the main text 
              but still readable.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Typography variant="h2">Font Weights</Typography>
        <div className="grid gap-4">
          <div className="font-normal">Regular (400) - The default weight for body text</div>
          <div className="font-medium">Medium (500) - Subtle emphasis, good for subheadings</div>
          <div className="font-semibold">Semibold (600) - Standard weight for headings</div>
          <div className="font-bold">Bold (700) - Strong emphasis, calls to action</div>
        </div>
      </div>

      <div className="space-y-6">
        <Typography variant="h2">Special Variants</Typography>
        <div className="space-y-4">
          <Typography variant="blockquote">
            This is a blockquote. It's useful for displaying quoted text or
            highlighting important information that needs to stand out from
            the rest of the content.
          </Typography>
          
          <Typography variant="lead">
            This is a lead paragraph. It's designed to introduce a section with
            slightly larger text that draws the reader in.
          </Typography>
          
          <Typography variant="large">
            This is large text, which can be used for emphasis without using a heading.
          </Typography>
          
          <Typography variant="small">
            This is small text, useful for captions, footnotes, or supplementary information.
          </Typography>
          
          <Typography variant="muted">
            This is muted text, which uses a less prominent color for secondary information.
          </Typography>
        </div>
      </div>

      <div className="space-y-6">
        <Typography variant="h2">Combining Classes</Typography>
        <div className="space-y-4">
          <p className="text-p1 font-bold">
            Bold paragraph text (text-p1 + font-bold)
          </p>
          
          <p className="text-p2 font-medium text-primary">
            Medium weight, primary colored text (text-p2 + font-medium + text-primary)
          </p>
          
          <p className="text-p3 italic">
            Italic body text (text-p3 + italic)
          </p>
          
          <p className="text-p4 font-semibold tracking-wide uppercase">
            Small caps, semibold, widely tracked text (text-p4 + font-semibold + tracking-wide + uppercase)
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <Typography variant="h2">Typography Component Usage</Typography>
        <div className="space-y-4">
          <Typography>
            Default typography component renders as a paragraph
          </Typography>
          
          <Typography weight="bold">
            Bold text using the weight prop
          </Typography>
          
          <Typography variant="h3" weight="medium">
            Medium weight heading using variant and weight props
          </Typography>
          
          <Typography variant="muted" className="italic">
            Muted text with additional italic class
          </Typography>
        </div>
      </div>
    </div>
  );
}
