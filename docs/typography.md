# Typography System

Syntax Learning Platform uses a comprehensive typography system based on shadcn/ui and Tailwind CSS to ensure consistent, accessible, and visually appealing text rendering across the entire application.

## Font Family: Inter

The project uses **Inter** font exclusively for all typography to maintain a clean, modern, and consistent design. Inter is a carefully crafted font family designed for computer screens with excellent readability at various sizes.

## Font Features

Inter is configured with OpenType features that enhance readability and aesthetics:
- `cv02`, `cv03`, `cv04`, `cv11`: Character variants for improved legibility
- `ss01`: Stylistic set for a more modern appearance

## Font Weights

- **Regular (400)**: Default text, body content
- **Medium (500)**: Subtle emphasis, secondary headings
- **Semibold (600)**: Primary headings, important content
- **Bold (700)**: Strong emphasis, calls to action

## Color System

Typography uses CSS variables for colors to support both light and dark themes:

- **Light Theme**: Text uses `--foreground` (near black) for maximum contrast and readability
- **Dark Theme**: Text uses `--foreground` (near white) for optimal visibility on dark backgrounds
- **Muted Text**: Secondary text uses `--muted-foreground` for less emphasis

## Typography Component

The project includes a flexible Typography component built with shadcn/ui principles:

```tsx
import { Typography } from "@/components/ui/typography";

// Basic usage
<Typography>Regular paragraph text</Typography>

// Heading variants
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>

// Weight variants
<Typography weight="bold">Bold text</Typography>
<Typography weight="medium">Medium text</Typography>

// Combined variants
<Typography variant="h2" weight="bold">Bold heading 2</Typography>

// Special variants
<Typography variant="lead">Larger introductory text</Typography>
<Typography variant="muted">Secondary information</Typography>
<Typography variant="blockquote">Quoted text</Typography>
```

## Font Size System

Tailwind CSS classes have been extended with a comprehensive typography scale that can be used directly in components:

```tsx
<p className="text-p1">Paragraph level 1</p>
<p className="text-p2">Paragraph level 2</p>
<h1 className="text-h1">Heading 1</h1>
<h2 className="text-h2">Heading 2</h2>
```

## Enhanced Readability

The typography system includes two key enhancements for better readability:

1. **Increased Letter Spacing**: All text elements use a slightly increased letter spacing (0.02em) to improve text legibility and reduce eye strain during extended reading sessions.

2. **Larger Font Sizes**: All typography elements are 2px larger than standard sizes to enhance readability, especially for users who may have minor visual impairments.

## Typography Scale (With +2px Size Increase)

| Class   | Font size | Line height | Weight  | Example Use Case          |
|---------|-----------|-------------|---------|---------------------------|
| text-h1 | 2.625rem (42px) | 3.125rem (50px) | Bold    | Main page titles          |
| text-h2 | 2.125rem (34px) | 2.625rem (42px) | Semibold| Section headers           |
| text-h3 | 1.875rem (30px) | 2.375rem (38px) | Semibold| Subsection headers        |
| text-h4 | 1.625rem (26px) | 2.125rem (34px) | Semibold| Card or panel headers     |
| text-h5 | 1.375rem (22px) | 1.875rem (30px) | Semibold| Minor section headers     |
| text-h6 | 1.25rem (20px)  | 1.625rem (26px) | Semibold| Small headers, labels     |
| text-p1 | 1.375rem (22px) | 1.875rem (30px) | Normal  | Lead paragraphs           |
| text-p2 | 1.25rem (20px)  | 1.625rem (26px) | Normal  | Standard content          |
| text-p3 | 1.125rem (18px) | 1.625rem (26px) | Normal  | Body text                 |
| text-p4 | 1rem (16px)     | 1.375rem (22px) | Normal  | Secondary information     |

## Utility Classes

Additional utility classes for special text treatments:

| Class      | Purpose                                |
|------------|----------------------------------------|
| font-normal | Regular (400) weight text             |
| font-medium | Medium (500) weight text              |
| font-semibold | Semibold (600) weight text          |
| font-bold   | Bold (700) weight text                |
| text-foreground | Primary text color                |
| text-muted-foreground | Secondary text color        |
| tracking-tight | Tighter letter spacing for headings|
| tracking-wide | Wider letter spacing for emphasis   |

## Usage Guidelines

1. **Consistency**: Use the Typography component or the appropriate text-* classes to maintain consistency.
2. **Hierarchy**: Maintain a proper hierarchy with h1-h6 for structured content.
3. **Readability**: Default text uses font-size text-p3 (16px) for optimal readability.
4. **Contrast**: Ensure sufficient contrast between text and background.
5. **Responsive Design**: The typography system includes responsive variants for different screen sizes.
