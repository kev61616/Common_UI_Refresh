# Design System Documentation

**Version:** 1.0
**Date:** 2025-04-05

## 1. Introduction

This document serves as the central reference for the Syntax application's design system. It outlines our core principles, visual language (colors, typography, spacing), component library usage, and accessibility guidelines. The goal is to ensure consistency, improve developer efficiency, and maintain a high-quality user experience.

Our design system is built upon:

*   **Tailwind CSS v4:** For utility-first styling.
*   **Catalyst UI Kit (from Tailwind UI):** As the primary source for foundational UI components.
*   **Custom Components (`src/components/ui`):** For application-specific elements not covered by Catalyst or requiring significant customization.
*   **Lucide Icons:** For iconography.

## 2. Core Principles

*   **Consistency:** Components and patterns should look and behave predictably across the application.
*   **Clarity:** Interfaces should be intuitive and easy to understand.
*   **Efficiency:** The design system should enable developers to build features faster.
*   **Accessibility:** All components and patterns must adhere to WCAG 2.1 AA standards.
*   **Modularity:** Components should be reusable and composable.

## 3. Visual Language

*(This section will be populated with details on Colors, Typography, Spacing, etc., referencing other docs like `colors.md` and `typography.md` as needed)*

*   **Colors:** See [`docs/colors.md`](./colors.md). Align semantic colors with Catalyst where possible.
*   **Typography:** See [`docs/typography.md`](./typography.md). Ensure consistency between Catalyst text styles and project styles. Use Catalyst `Heading` and `Text` components directly with Tailwind utilities. (Custom `Typography` component is deprecated).
*   **Spacing:** Utilize the Tailwind default spacing scale. Document any project-specific overrides.
*   **Iconography:** Standardize on the [`lucide-react`](https://lucide.dev/) library. Import icons directly from `lucide-react` and style them using standard Tailwind utility classes (e.g., `className="size-5 text-foreground"`). The custom `Icon` component (`src/components/Icon.tsx`) and its associated custom icons (`src/components/icons/`) are **deprecated** and should be removed once all usages are refactored.

## 4. Component Strategy: Catalyst vs. Custom

To leverage the quality and consistency of a professional UI kit while retaining flexibility for application-specific needs, we adopt the following strategy:

*   **Prioritize Catalyst:** For common, general-purpose UI patterns, **always prefer using components from the Catalyst UI kit (`src/components/catalyst/`)**. This includes elements like:
    *   Buttons (`Button`)
    *   Inputs & Form Elements (`Input`, `Checkbox`, `Radio`, `Select`, `Textarea`, `Fieldset`, `FieldGroup`, `Label`)
    *   Layout Primitives (`StackedLayout`, `SidebarLayout`)
    *   Navigation (`Navbar`, `Sidebar`)
    *   Overlays (`Dialog`, `Dropdown`)
    *   Feedback (`Alert`)
    *   Data Display (`Table`, `DescriptionList`, `Badge`)
    *   Basic Elements (`Avatar`, `Divider`, `Link`, `Heading`, `Text`)
*   **Use Custom Components (`src/components/ui/`) When:**
    *   **No Catalyst Equivalent:** Catalyst does not offer a component for the required pattern.
    *   **Highly Specialized Logic:** The component requires significant application-specific state management, data fetching, or complex interactions tightly coupled to the application's domain, which would be difficult to achieve by composing Catalyst components.
    *   **Significant Visual Deviation:** The required visual design fundamentally differs from the Catalyst aesthetic and cannot be achieved through standard Tailwind customization or Catalyst component props. (This should be rare and require justification).
*   **Composition:** Build complex UI sections by composing multiple Catalyst components together whenever possible.
*   **Refactoring Existing `src/components/ui/`:** Existing custom components in `src/components/ui/` (like `Card`, `Button`) should be audited. If a suitable Catalyst equivalent exists, the custom component should be refactored to use or be replaced by the Catalyst component. If a custom component remains necessary based on the criteria above, it should be documented here.

**Current Custom Components (`src/components/ui/`) Status:**

*   `card.tsx`: **[Deprecated]** - This component only applies basic Tailwind styles (`rounded-xl border border-border bg-card text-card-foreground shadow-sm`). Apply these classes directly to `div` elements instead of using this component. It will be removed in a future refactor.
*   `Button.tsx` (at `src/components/Button.tsx`): **[Deprecated]** - This component provides polymorphic behavior (button/link) and custom styling variants. Use the Catalyst `Button` component (`@/components/catalyst/button`) instead, which also handles polymorphism and provides standard variants.
*   `skeleton.tsx`: **[Deprecated]** - This component applies basic skeleton styles (`animate-pulse`, `rounded-md`, `bg-gray-200`). Apply Tailwind classes like `animate-pulse rounded-md bg-muted` directly to placeholder `div` elements instead.
*   `tool-window.tsx`: **[Keep - Needs Refactor]** - Provides unique draggable/resizable iframe window functionality not present in Catalyst. Requires significant refactoring to replace inline styles with Tailwind classes and potentially use Catalyst components internally (e.g., Button, Heading) to align with the design system.
*   `typography.tsx`: **[Deprecated]** - This component wraps text elements and applies styles via variants. Use Catalyst's `Heading` and `Text` components directly, styling them with standard Tailwind utility classes instead.

**Decision Process:**

1.  Identify the required UI pattern.
2.  Check if a suitable component exists in `src/components/catalyst/`.
3.  If yes, use the Catalyst component.
4.  If no, evaluate if the pattern can be built by composing existing Catalyst components.
5.  If composition is feasible and clean, use composition.
6.  If no suitable Catalyst component or composition exists, or if the criteria for custom components are met, create/use a component in `src/components/ui/`. Document the rationale.

## 5. Accessibility

*(Link to `docs/accessibility.md` once created/updated)*

Leverage the built-in accessibility features of Catalyst and Headless UI. Ensure all custom components follow ARIA patterns and best practices.

## 6. Contributing

Refer to [`CONTRIBUTING.md`](../CONTRIBUTING.md) for general contribution guidelines. Adhere to the component strategy outlined above when adding or modifying UI elements.
