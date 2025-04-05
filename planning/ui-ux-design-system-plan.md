# Planning Document: UI/UX & Design System Improvements

**Version:** 1.0
**Date:** 2025-04-04

## 1. Introduction

This document outlines potential improvements related to the User Interface (UI), User Experience (UX), and the consistency and completeness of the Design System for the Syntax education platform. **A key part of this plan involves adopting the Catalyst UI kit (from Tailwind UI) as the foundation for our component library to accelerate development and ensure a high-quality, consistent look and feel.**

## 2. Goals

*   Enhance visual appeal and create a more polished, modern user interface.
*   Improve usability and intuitiveness of user flows.
*   Ensure consistency in design patterns, components, and interactions across the application.
*   Strengthen accessibility compliance.
*   Formalize and document the design system more comprehensively.

## 3. Proposed Improvement Areas

### 3.1. Design System Refinement & Documentation

*   **Objective:** Solidify and document the core elements of the design system, leveraging the Catalyst UI kit as the primary component source, supplemented by custom elements where necessary.
*   **Measurable Goal:** Catalyst components integrated. Documented guidelines for using Catalyst vs. custom components. Documented spacing, colors, typography, and iconography. Central `design-system.md` updated.
*   **Action Items:**
    *   **[X] Integrate Catalyst UI Kit:** Copied Catalyst TypeScript components into `src/components/catalyst/`. Installed required dependencies (`@headlessui/react`, `framer-motion`, `clsx`) and updated `tailwindcss` to v4.
    *   **[X] Define Component Strategy:** Initial strategy documented in `docs/design-system.md`. This outlines prioritizing Catalyst components and provides criteria for using custom components.
    *   **[~] Spacing System:** Defined scale in `tailwind.config.js`. Catalyst components generally adhere to Tailwind defaults. **[ ]** Document any project-specific overrides or conventions in `docs/design-system.md`. **[ ]** Refactor remaining custom components to use the scale.
    *   **[~] Color System:** Applied semantic colors in some refactored components. **[ ]** Align project's semantic colors with Catalyst's approach where possible. **[ ]** Review variable definitions & contrast, especially when combining Catalyst and custom components. **[ ]** Update `docs/colors.md` guidance.
    *   **[~] Typography:** Verified consistent application in refactored components. Catalyst provides base typography styles. **[ ]** Ensure consistency between Catalyst text styles and project styles. (Custom `Typography` component deprecated).
    *   **[X] Iconography:** Standardize on `lucide-react`. **Deprecated custom `Icon` component (`src/components/Icon.tsx`) and associated icons (`src/components/icons/`).** Strategy is to import directly from `lucide-react` and style with Tailwind. Documented in `docs/design-system.md`. **[ ]** Replace remaining ad-hoc SVGs and usages of the old `Icon` component (High Priority).
    *   **[X] Custom Component Library (`src/components/ui`):** **[X] Audited `Card` - Marked for deprecation.** **[X] Audited `Button` (at `src/components/Button.tsx`) - Marked for deprecation.** **[X] Audited `Skeleton` - Marked for deprecation.** **[X] Audited `tool-window.tsx` - Marked to keep, needs refactoring.** **[X] Audited `typography.tsx` - Marked for deprecation.** Initial audit complete. **[ ]** Systematically replace usages of deprecated components (High Priority). **[ ]** Refactor `tool-window.tsx` (Medium Priority).
    *   **[X] Create/Update Central Design System Doc:** Created `docs/design-system.md` and added initial component strategy. Will require ongoing updates as system evolves.
*   **Dependencies:** Requires frontend development time for refactoring, documentation, and potential component replacement analysis.
*   **Related Plans:** Architecture Plan (TypeScript, Component Modularization).

### 3.2. UI Polish & Visual Appeal

*   **Objective:** Enhance the overall aesthetic quality and perceived polish of the application, leveraging Catalyst's built-in styling and components.
*   **Measurable Goal:** Consistent application of Catalyst styles (shadows, transitions, etc.). Visually appealing loading/empty states implemented using Catalyst patterns where applicable. Positive user feedback on visual design.
*   **Action Items:**
    *   **[ ] Review Visual Hierarchy:** Audit key pages (Dashboard, Profile, Review) for clear hierarchy, utilizing Catalyst components and adhering to its design principles (Medium Priority).
    *   **[ ] Microinteractions & Animations:** Leverage Catalyst's built-in transitions and animations. Identify areas for custom animations if needed (Low Priority).
    *   **[ ] Shadows & Elevation:** Adopt Catalyst's approach to shadows and elevation consistently (Medium Priority).
    *   **[~] Gradients & Effects:** Refined some gradients during component refactoring. **[ ]** Align with Catalyst's styling or define clear rules for custom effects (Low Priority).
    *   **[ ] Empty States & Loading States:** Design and implement consistent empty/loading states using Catalyst/Tailwind (Medium Priority).
*   **Dependencies:** Design System Refinement (Integration of Catalyst).
*   **Related Plans:** Performance Plan (Loading States, Animations).

### 3.3. User Experience (UX) Enhancements

*   **Objective:** Improve the usability and intuitiveness of key user flows by leveraging well-designed Catalyst components.
*   **Measurable Goal:** Reduction in user-reported confusion on specific tasks. Improved task completion rates (if measurable via analytics or testing). Consistent interaction patterns based on Catalyst components.
*   **Action Items:**
    *   **[ ] Navigation Review:** Evaluate main navigation (potentially using Catalyst `Navbar` or `Sidebar` components) and information discovery flows. Simplify structure if needed.
    *   **[ ] Information Architecture:** Analyze complex pages (Dashboard, Review) to optimize information layout, potentially using Catalyst layout components (`StackedLayout`, etc.) or `DescriptionList`.
    *   **[~] Form Design:** Standardized `FilterBar` and basic `Settings` form. **[ ]** Audit and refactor other forms (e.g., Search, Login/Signup if applicable) using Catalyst components (High Priority, once forms are identified/created).
    *   **[ ] Feedback Mechanisms:** Utilize Catalyst components like `Alert` or `Dialog` for feedback (Medium Priority).
    *   **[ ] Onboarding & Contextual Help:** Implement tooltips or use Catalyst `Dropdown` / `Dialog` components (Low Priority).
*   **Dependencies:** Design System Refinement (Integration of Catalyst). Requires UX design/research input.
*   **Related Plans:** Architecture Plan (Error Handling).

### 3.4. Accessibility (a11y) Audit & Improvements

*   **Objective:** Ensure the application meets WCAG 2.1 AA standards or higher.
*   **Measurable Goal:** Zero critical/serious automated accessibility violations. Successful completion of key flows using keyboard-only and screen reader. WCAG AA compliance for color contrast.
*   **Action Items:**
    *   **[ ] Automated Audit:** Integrate Axe DevTools (`@axe-core/react`) or similar (High Priority). Run Lighthouse audits regularly.
    *   **[ ] Manual Audit (Key Flows):** Begin manual testing (Keyboard, Screen Reader, Contrast) on refactored areas (FilterBar, Navigation, Dashboard) and high-traffic pages (High Priority).
        *   **[~] Color Contrast:** Identified potential issues. **[ ]** Systematically verify contrast ratios. **[ ]** Adjust semantic colors as needed.
        *   **[ ] Keyboard Navigation:** Perform thorough keyboard-only testing.
        *   **[ ] Screen Reader Testing:** Test core user flows.
        *   **[ ] ARIA Usage:** Audit custom components (`ToolWindow`, charts, etc.) and Catalyst compositions.
    *   **[ ] Image Alt Text:** Audit `next/image` usage and SVGs (Medium Priority).
    *   **[ ] Form Labels & Errors:** Ensure accessible labels/errors during form refactoring (High Priority).
    *   **[X] Create `docs/accessibility.md`:** Initial guidelines created. Update as needed.
*   **Dependencies:** Requires dedicated testing time. May require adjustments to Design System.
*   **Related Plans:** Architecture Plan (Testing Strategy).

## 4. Prioritization (Updated Example)

1.  **[ ] Replace Deprecated Component Usages (`Card`, `Button`, `Skeleton`, `Typography`, `Icon`) (High Priority)**
2.  **[ ] Accessibility Audit & High-Impact Fixes (High Priority)** - Start automated/manual checks.
3.  **[ ] Refactor Remaining Key UI Areas (Forms, Profile Pages, etc.) using Catalyst (High Priority)**
4.  **[ ] Review & Align Color/Spacing/Typography with Catalyst (Medium Priority)**
5.  **[ ] Refactor `tool-window.tsx` (Medium Priority)**
6.  **[ ] Implement Consistent Empty/Loading States (Medium Priority)**
7.  **[ ] Review & Improve UI Polish (Shadows, Animations, Hierarchy) (Low Priority)**
8.  **[X] Define Component Strategy & Document (High Priority)** - Done.
9.  **[X] Refactor FilterBar & Navigation (High Priority)** - Done.
10. **[X] Audit `src/components/ui` (Medium Priority)** - Done.
11. **[X] Establish Iconography Strategy (Low Priority)** - Done.

## 5. Next Steps (Updated)

*   Begin replacing usages of deprecated components (`Typography`, `Button`, `Card`, `Skeleton`, `Icon`).
*   Start accessibility audits (automated checks, initial manual keyboard/screen reader tests).
*   Continue refactoring other key UI areas (e.g., identify and refactor forms).
*   Update documentation as refactoring progresses and patterns solidify.
