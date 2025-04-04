    # 🎨 Color System

Our color system is designed for clarity, consistency, and adaptability, supporting both light and dark modes seamlessly through CSS variables.

## Core Philosophy

- **Semantic Naming:** Colors are defined semantically (e.g., `background`, `foreground`, `primary`, `accent`, `destructive`) rather than purely by hue. This makes applying colors more intuitive and maintainable.
- **CSS Variables:** The core semantic colors are defined using HSL values assigned to CSS variables in `src/styles/globals.css`. This allows for easy theme switching (light/dark mode) by redefining these variables within media queries or theme classes.
- **Tailwind Integration:** Tailwind utilities (`bg-background`, `text-foreground`, `border-primary`, etc.) directly consume these CSS variables.
- **Accessibility:** Color choices prioritize sufficient contrast ratios for readability, especially between text and backgrounds.

## Semantic Colors (via CSS Variables)

These are the primary building blocks of the UI's color scheme. Their actual HSL values are defined in `src/styles/globals.css` for both light and dark themes.

| Tailwind Utility        | CSS Variable                 | Description                                                                 |
| :---------------------- | :--------------------------- | :-------------------------------------------------------------------------- |
| `bg-background`         | `--background`               | Default background color for pages and large containers.                    |
| `text-foreground`       | `--foreground`               | Default text color for body content.                                        |
| `bg-card`/`text-card-fg`| `--card`/`--card-foreground` | Background and text color for card-like elements (slightly offset from page bg). |
| `bg-popover`/`text-popover-fg`| `--popover`/`--popover-foreground` | Background and text color for popovers, tooltips, dropdowns.          |
| `bg-primary`/`text-primary-fg`| `--primary`/`--primary-foreground` | Primary brand color, used for main actions, highlights, active states. |
| `bg-secondary`/`text-secondary-fg`| `--secondary`/`--secondary-foreground` | Secondary color, often used for less prominent interactive elements. |
| `bg-muted`/`text-muted-fg`| `--muted`/`--muted-foreground` | Muted backgrounds and text for less important content or disabled states. |
| `bg-accent`/`text-accent-fg`| `--accent`/`--accent-foreground` | Accent color, used for secondary highlights or alternative actions.       |
| `bg-destructive`/`text-destructive-fg`| `--destructive`/`--destructive-foreground` | Color for destructive actions (e.g., delete) or error states.       |
| `border`                | `--border`                   | Default border color for separators, inputs, outlines.                      |
| `input`                 | `--input`                    | Border color specifically for form inputs.                                  |
| `ring`                  | `--ring`                     | Color for focus rings, typically matching the primary color.                |

**Example Usage:**

```tsx
<div className="bg-background text-foreground p-4">
  <h2 className="text-primary">Main Content Area</h2>
  <p className="text-muted-foreground">Some less important text.</p>
  <button className="bg-primary text-primary-foreground">Click Me</button>
  <div className="mt-4 border-t border-border pt-4">Footer</div>
</div>
```

## Color Palettes

In addition to the semantic CSS variables, we define extended palettes in `tailwind.config.js` for specific colors, primarily used for illustrations, status indicators, or specific UI elements where semantic colors aren't appropriate.

### Primary (Blue)

Used for primary actions and branding. (`primary-50` to `primary-950`)

```tsx
<div className="bg-primary-500 text-white p-2">Primary 500</div>
<div className="bg-primary-100 text-primary-900 p-2">Primary 100</div>
```

### Accent (Violet)

Used for secondary highlights and accents. (`accent-50` to `accent-950`)

```tsx
<div className="bg-accent-500 text-white p-2">Accent 500</div>
<div className="bg-accent-100 text-accent-900 p-2">Accent 100</div>
```

### Success (Green)

Used for success messages, confirmation states, positive indicators. (`success-50` to `success-950`)

```tsx
<div className="bg-success-500 text-white p-2">Success 500</div>
<div className="bg-success-100 text-success-900 p-2">Success 100</div>
```

### Warning (Amber/Yellow)

Used for warnings, alerts, attention-grabbing indicators. (`warning-50` to `warning-950`)

```tsx
<div className="bg-warning-500 text-white p-2">Warning 500</div>
<div className="bg-warning-100 text-warning-900 p-2">Warning 100</div>
```

*(Note: The `destructive` color primarily uses the semantic CSS variable, but a full palette could be added if needed.)*

## Usage Guidelines

- **Prioritize Semantic Colors:** Use `bg-background`, `text-foreground`, `bg-primary`, etc., for most UI elements to ensure theme adaptability.
- **Use Palettes Sparingly:** Reserve the numbered palettes (e.g., `primary-500`, `accent-100`) for specific cases like status indicators, illustrations, or when a precise shade is needed that isn't covered by the semantic roles.
- **Ensure Contrast:** Always check text contrast against its background, especially when using palette colors directly. Tools like the WebAIM Contrast Checker or browser dev tools can help.
- **Consistency:** Apply colors consistently based on their intended semantic meaning. Avoid using `primary` for destructive actions, for example.
