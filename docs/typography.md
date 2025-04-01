# ✨ Typography System

> *"Typography is what language looks like."* — Ellen Lupton

Our typography system creates a visual language that balances **beauty**, **readability**, and **personality** across the entire platform. We've designed a system that not only looks stunning but ensures optimal readability for extended learning sessions.

## 🔤 Font Family: Inter

<div style="background: linear-gradient(to right, #f0f9ff, #e0f2fe); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
  <p style="font-family: Inter; font-size: 40px; line-height: 1.2; margin: 0; font-weight: 700; background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Inter</p>
  <p style="font-family: Inter; font-size: 16px; margin-top: 8px; color: #334155;">A typeface carefully crafted & designed for computer screens.</p>
</div>

We exclusively use **Inter** for all typography to maintain a cohesive visual identity. Its clean, modern design provides exceptional readability at all sizes while offering distinctive character that sets our platform apart.

### Features That Make Inter Special

* **Expert Crafting**: Optimized for screens with precise pixel alignment
* **Dynamic Range**: Beautiful across weights from thin to bold
* **Versatile Scale**: Remains readable from tiny labels to massive headlines
* **OpenType Enhancements**: Special character variants for improved legibility

## 🎨 Creating Beautiful Text Hierarchies

<div style="display: flex; flex-direction: column; gap: 16px; margin: 24px 0;">
  <div style="background: #ffffff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 0 8px 8px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h1 style="font-size: 2.75rem; line-height: 1.2; margin: 0 0 8px 0; font-weight: 700; color: #1e293b;">Main Headline (h1)</h1>
    <p style="font-size: 1rem; color: #64748b; margin: 0;">Use for page titles and main content headlines</p>
  </div>
  
  <div style="background: #ffffff; border-left: 4px solid #8b5cf6; padding: 16px; border-radius: 0 8px 8px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h2 style="font-size: 2.25rem; line-height: 1.3; margin: 0 0 8px 0; font-weight: 600; color: #1e293b;">Section Header (h2)</h2>
    <p style="font-size: 1rem; color: #64748b; margin: 0;">Use for dividing content into logical sections</p>
  </div>
  
  <div style="background: #ffffff; border-left: 4px solid #10b981; padding: 14px; border-radius: 0 8px 8px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h3 style="font-size: 2rem; line-height: 1.3; margin: 0 0 8px 0; font-weight: 600; color: #1e293b;">Subsection Header (h3)</h3>
    <p style="font-size: 1rem; color: #64748b; margin: 0;">Use for grouping related content within sections</p>
  </div>
  
  <div style="background: #ffffff; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 0 8px 8px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h4 style="font-size: 1.75rem; line-height: 1.4; margin: 0 0 8px 0; font-weight: 600; color: #1e293b;">Component Header (h4)</h4>
    <p style="font-size: 1rem; color: #64748b; margin: 0;">Use for card headers and UI components</p>
  </div>
</div>

## 💫 Typography Component Usage

Our Typography component makes it easy to create beautiful, consistent text. Here are some examples of how to create stunning text elements:

```tsx
// 🌟 For attention-grabbing introductions
<Typography variant="h1" weight="bold" className="text-gradient-blue-purple">
  Learning That Adapts To You
</Typography>

// 💎 For important section headers
<Typography variant="h2" weight="semibold" className="border-b pb-2 border-indigo-200 dark:border-indigo-800">
  Progress Tracking
</Typography>

// 🌿 For explanatory lead text
<Typography variant="lead" className="text-slate-600 dark:text-slate-300 mb-6 max-w-3xl">
  Our adaptive learning system adjusts to your needs, providing personalized
  content that evolves with your understanding.
</Typography>

// 💡 For emphasized important points
<Typography weight="medium" className="text-indigo-600 dark:text-indigo-400">
  Students using our platform improve test scores by 24% on average.
</Typography>

// 🔖 For beautiful quotes
<Typography variant="blockquote" className="border-l-4 border-indigo-500 pl-4 italic text-slate-700 dark:text-slate-300">
  "Education is not the filling of a pail, but the lighting of a fire."
</Typography>
```

## ✨ Creating Beautiful Text Effects

Combine typography with these techniques to create stunning text effects:

### Gradient Text

```tsx
<h1 className="text-h1 font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
  Gradient Headlines
</h1>
```

<div style="background: linear-gradient(to right, #2563eb, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 2.75rem; font-weight: 700; margin: 20px 0;">
  Gradient Headlines
</div>

### Animated Text Underlines

```tsx
<h2 className="text-h2 font-semibold relative">
  Interactive Underline
  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 transition-transform origin-left hover:scale-x-100"></span>
</h2>
```

### Text With Decorative Elements

```tsx
<h3 className="text-h3 font-semibold flex items-center">
  <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-3"></span>
  Section With Accent
</h3>
```

<div style="font-size: 2rem; font-weight: 600; display: flex; align-items: center; margin: 20px 0;">
  <span style="display: inline-block; width: 12px; height: 12px; border-radius: 9999px; background-color: #10b981; margin-right: 12px;"></span>
  Section With Accent
</div>

## 📏 Typography Scale Reference

| Class | Use For | Example |
|-------|---------|---------|
| <code>text-h1</code> | Page titles | <div style="font-size: 2.75rem; font-weight: 700; line-height: 1.2;">Main Headline</div> |
| <code>text-h2</code> | Section headers | <div style="font-size: 2.25rem; font-weight: 600; line-height: 1.3;">Section Header</div> |
| <code>text-h3</code> | Subsection headers | <div style="font-size: 2rem; font-weight: 600; line-height: 1.3;">Subsection Title</div> |
| <code>text-p1</code> | Lead paragraphs | <div style="font-size: 1.5rem; line-height: 1.4;">Opening paragraph text that introduces a section with impact.</div> |
| <code>text-p2</code> | Important content | <div style="font-size: 1.375rem; line-height: 1.4;">Secondary content that deserves prominence.</div> |
| <code>text-p3</code> | Body text | <div style="font-size: 1.25rem; line-height: 1.5;">Standard body text used throughout the application.</div> |

## 🎭 Light & Dark Mode Typography

Our typography system is designed to shine in both light and dark modes:

<div style="display: flex; gap: 16px; margin: 24px 0;">
  <div style="flex: 1; background: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h3 style="font-size: 1.5rem; font-weight: 600; color: #000000; margin-top: 0;">Light Mode</h3>
    <p style="font-size: 1rem; color: #1e293b; margin-bottom: 8px;">Primary text uses true black for maximum contrast.</p>
    <p style="font-size: 0.875rem; color: #475569; margin-bottom: 0;">Secondary text uses dark slate for readability while maintaining hierarchy.</p>
  </div>
  
  <div style="flex: 1; background: #0f172a; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h3 style="font-size: 1.5rem; font-weight: 600; color: #ffffff; margin-top: 0;">Dark Mode</h3>
    <p style="font-size: 1rem; color: #f8fafc; margin-bottom: 8px;">Primary text uses pure white for maximum contrast.</p>
    <p style="font-size: 0.875rem; color: #cbd5e1; margin-bottom: 0;">Secondary text uses light slate to reduce eye strain while maintaining visibility.</p>
  </div>
</div>

## 💎 Best Practices for Beautiful Typography

1. **Create Clear Hierarchy** – Guide users through content using size, weight and color to establish importance.

2. **Maintain Consistent Spacing** – Use multiples of 4px for margins and line height to create harmony.

3. **Limit Type Variations** – Stick to 2-3 sizes per page to maintain visual cohesion.

4. **Use Color Intentionally** – Reserve colored text for important information or interactive elements.

5. **Embrace White Space** – Give text room to breathe with generous margins and padding.

6. **Consider Line Length** – Aim for 60-75 characters per line for optimal readability.

7. **Pair with Beautiful UI Elements** – Combine typography with subtle shadows, gradients and borders.
