# ✨ Typography System

> *"Typography is what language looks like."* — Ellen Lupton

Our typography system creates a visual language that balances **beauty**, **readability**, and **personality** across the entire platform. We've designed a system based on a modular scale and the highly readable "Inter" font family to ensure clarity and consistency.

## 🔤 Font Family: Inter

We exclusively use **Inter** (`font-sans`) for all UI text to maintain a cohesive visual identity. Its clean, modern design provides exceptional readability at all sizes and weights on screen.

## 📐 Modular Scale & Usage

Our typography is built upon a modular scale defined in `tailwind.config.js`, ranging from `text-xs` (12px) to `text-5xl` (40px). The base font size for body content is `text-base` (16px). Default letter spacing is used for optimal readability with the Inter font.

The `Typography` component (`src/components/ui/typography.tsx`) provides semantic variants that map directly to this scale (e.g., `<Typography variant="p">` renders using `text-base`) and apply appropriate font weights and styles.

### Scale Reference & `Typography` Variant Mapping

| `Typography` Variant | Maps to Class | Size    | Weight   | Line Height | Intended Use Case            |
| :------------------- | :------------ | :------ | :------- | :---------- | :--------------------------- |
| `h1`                 | `text-5xl`    | `2.5rem`  | `bold`   | `3rem`      | Main page titles             |
| `h2`                 | `text-4xl`    | `2rem`    | `semibold` | `2.5rem`    | Section headers            |
| `h3`                 | `text-3xl`    | `1.75rem` | `semibold` | `2.25rem`   | Subsection headers         |
| `h4`                 | `text-2xl`    | `1.5rem`  | `semibold` | `2rem`      | Card/Component headers     |
| `h5`                 | `text-xl`     | `1.25rem` | `semibold` | `1.75rem`   | Sub-component headers      |
| `h6`                 | `text-lg`     | `1.125rem`| `semibold` | `1.75rem`   | Smaller headers            |
| `large`              | `text-lg`     | `1.125rem`| `semibold` | `1.75rem`   | Emphasized text            |
| `lead`               | `text-lg`     | `1.125rem`| `normal` | `1.75rem`   | Lead paragraphs            |
| `p` (default)        | `text-base`   | `1rem`    | `normal` | `1.75rem`   | Default body text          |
| `blockquote`         | `text-base`   | `1rem`    | `normal` | `1.75rem`   | Blockquotes                |
| `list`               | `text-base`   | `1rem`    | `normal` | `1.75rem`   | Lists                      |
| `small`              | `text-sm`     | `0.875rem`| `medium` | `1.25rem`   | Smaller text, captions     |
| `muted`              | `text-sm`     | `0.875rem`| `normal` | `1.25rem`   | Muted text                 |
| *(Direct Use)*       | `text-xs`     | `0.75rem` | `normal` | `1rem`      | Tiny text, labels          |

*(Note: The `Typography` component applies default weights. Override with the `weight` prop or Tailwind classes. For `text-xs`, apply classes directly as there is no corresponding `Typography` variant.)*

## 🎭 Component Usage Examples

Use the `Typography` component for semantic correctness and consistent styling:

```tsx
// Page Title
<Typography variant="h1">Platform Dashboard</Typography>

// Section Header with border
<Typography variant="h2" className="border-b pb-2">
  Performance Overview
</Typography>

// Subsection Header
<Typography variant="h3">Accuracy Trends</Typography>

// Lead Paragraph
<Typography variant="lead" className="text-muted-foreground">
  Analyze your progress over the last 30 days to identify strengths and weaknesses.
</Typography>

// Standard Paragraph (renders as text-base)
<Typography variant="p">
  The system tracks your answers across various subjects and difficulty levels.
  Use the filters to narrow down the results.
</Typography>

// Emphasized Text (renders as text-lg)
<Typography variant="large" className="text-primary">
  Focus on areas below 70% mastery.
</Typography>

// Blockquote (renders as text-base)
<Typography variant="blockquote">
  "The beautiful thing about learning is that nobody can take it away from you." - B.B. King
</Typography>

// Small Muted Text (renders as text-sm)
<Typography variant="muted">
  Last updated: 3 minutes ago
</Typography>

// List (renders as text-base)
<Typography variant="list">
  <li>Review incorrect answers.</li>
  <li>Practice targeted exercises.</li>
  <li>Track mastery improvements.</li>
</Typography>

// Overriding weight
<Typography variant="h4" weight="bold" className="text-accent-foreground">
  Custom Component Title
</Typography>
```

## ✨ Styling Text Directly

While the `Typography` component is preferred for semantic elements, you can apply text styles directly using Tailwind classes:

```tsx
// Gradient Headline
<h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
  Adaptive Learning
</h1>

// Muted Body Text
<p className="text-base text-muted-foreground">
  This text is less prominent.
</p>

// Small Bold Label (using direct classes for text-xs)
<span className="text-xs font-bold uppercase tracking-wider text-primary">
  New Feature
</span>
```

## 🎨 Light & Dark Mode

Our typography utilizes CSS variables for colors (e.g., `text-foreground`, `text-muted-foreground`, `text-primary`) defined in `tailwind.config.js` and `src/styles/globals.css`. This ensures text automatically adapts to light and dark modes for optimal contrast and readability.

*   **Light Mode:** Typically uses dark text (`--foreground`: near black) on light backgrounds.
*   **Dark Mode:** Typically uses light text (`--foreground`: near white) on dark backgrounds.

Refer to the Color System documentation for more details.

## 💎 Best Practices

1.  **Use Semantic Variants:** Prefer the `Typography` component variants (`h1`-`h6`, `p`, `blockquote`, `list`) for accessibility and structure.
2.  **Maintain Hierarchy:** Use the defined scale consistently to guide the user's eye. Avoid skipping heading levels.
3.  **Prioritize Readability:** Ensure sufficient contrast between text and background colors. Use the defined line heights for comfortable reading (e.g., `leading-7` / `1.75rem` for `text-base`).
4.  **Limit Variations:** Avoid using too many different font sizes and weights on a single screen. Stick to the established scale and semantic variants.
5.  **Intentional Color:** Use color (`text-primary`, `text-accent`, etc.) purposefully for emphasis or interactive states, not just decoration. `text-foreground` and `text-muted-foreground` should cover most text needs.
6.  **Consider Line Length:** While not strictly enforced by the system, aim for comfortable line lengths (typically 50-75 characters) for extended reading.
