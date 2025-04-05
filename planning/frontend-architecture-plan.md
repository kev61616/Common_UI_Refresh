# Planning Document: Frontend Architecture & Code Quality Improvements

**Version:** 1.0
**Date:** 2025-04-04

## 1. Introduction

This document outlines potential improvements related to the frontend architecture, code structure, quality, and maintainability of the Syntax education platform.

## 2. Goals

*   Improve code readability and maintainability (e.g., reduce average component complexity, increase code reuse).
*   Enhance developer experience and onboarding (e.g., faster setup, clearer documentation).
*   Increase type safety and reduce potential runtime errors (e.g., target 0 `any` types, enable stricter TS checks).
*   Establish clearer patterns for state management and data flow.
*   Improve application performance through architectural choices (e.g., faster navigation, reduced client-side load).
*   Lay a foundation for a robust testing strategy (e.g., achieve target code coverage).

## 3. Proposed Improvement Areas

### 3.1. Component Modularization & Composition

*   **Objective:** Reduce the complexity of large components and promote reuse through modularization and effective composition, leveraging the Catalyst UI kit.
*   **Measurable Goal:** Reduce the number of custom components > 400 lines by X%. Increase usage of Catalyst components for standard UI patterns. Aim for average custom component size < Y lines.
*   **Action Items:**
    *   **[~]** Continue systematically refactoring large custom components. Prioritize identifying sections that can be replaced by standard Catalyst components (`src/components/catalyst/`).
        *   **Done (Pre-Catalyst):** `ProfilePage`, `Search`, `AnalyticsPanel`, `ReviewTestPage`, `Dashboard`.
        *   **Example Targets Remaining:** `src/components/review/FilterBar.tsx` (evaluate using Catalyst form/dropdown components), various view variants.
    *   **[ ]** Evaluate complex view variants (`src/components/review/*-view-variants/`) for potential modularization or replacement with compositions of Catalyst components.
    *   **[ ]** Establish clear guidelines in `CONTRIBUTING.md` or `docs/architecture.md` on:
        *   When to use Catalyst components vs. creating custom components (`src/components/ui/`).
        *   Best practices for composing Catalyst components to build application features.
        *   Target size/complexity for *custom* components.
*   **Tools:** React functional components, Catalyst UI Kit (`src/components/catalyst/`), Custom components (`src/components/ui/`), State Management tools.
*   **Dependencies:** State Management Strategy, UI/UX Plan (Component Strategy definition).

### 3.2. State Management Strategy

*   **Objective:** Define clear guidelines for choosing the appropriate state management tool based on the scope and nature of the state.
*   **Measurable Goal:** Documented strategy agreed upon by the team. Reduction in prop drilling depth in refactored components.
*   **Action Items:**
    *   **[ ]** Document explicit rules and decision tree in `docs/architecture.md`:
        *   **URL State (`useSearchParams`):** For shareable/bookmarkable state (filters, pagination, view modes). Reference `docs/use-search-params-guide.md`.
        *   **React Context (`src/contexts`):** For low-frequency global state (theme, user auth, layout). Avoid for high-frequency updates.
        *   **Component Local State (`useState`, `useReducer`):** Default for component-specific state.
        *   **Client-side State Library (e.g., Zustand):** Evaluate and potentially adopt for complex, cross-component client state with frequent updates (e.g., shared form state, complex UI interactions).
    *   **[~]** Refactor components identified during modularization or audits to use the appropriate strategy (Partially done via hook extraction for ReviewTestPage).
*   **Dependencies:** Component Modularization.
*   **Related Plans:** UI/UX Plan (Component Library).

### 3.3. TypeScript & Type Safety

*   **Objective:** Leverage TypeScript more effectively to catch errors during development and improve code clarity, utilizing types provided by libraries like Catalyst.
*   **Measurable Goal:** Achieve 0 `any` types in the codebase (excluding external library limitations). Enable and pass stricter `tsconfig.json` checks. Consistent use of defined types.
*   **Action Items:**
    *   **[ ]** Enable/verify stricter options in `tsconfig.json`: `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`.
    *   **[ ]** Use ESLint rules (e.g., `@typescript-eslint/no-explicit-any`) to flag `any` usage. Systematically refactor identified instances.
    *   **[~]** Define/refine interfaces/types in `src/types/` for core domain models (`Question`, `User`, `TestSet`, `Achievement`, etc.) and API payloads. Use these types consistently in component props, state, and function signatures. Add JSDoc for clarity (Partially done for extracted components).
    *   **[ ]** Leverage TypeScript types exported by Catalyst components and other dependencies (`@headlessui/react`, etc.) where applicable when interacting with these components.
    *   **[ ]** Utilize utility types (`Partial`, `Pick`, `Omit`, `Record`, `Readonly`) to create precise types derived from base models.
    *   **[~]** Refactor mock data (`src/lib/mockData`) to strictly adhere to defined types, potentially using factory functions or type validation (Partially done for `PerformanceInsights` mock data types).
*   **Dependencies:** Ongoing effort alongside other refactoring.
*   **Related Plans:** UI/UX Plan (Component Library documentation).

### 3.4. Utility Functions & Hooks

*   **Objective:** Consolidate and organize reusable logic into utility functions and custom hooks.
*   **Measurable Goal:** Reduction of duplicated helper functions within components. Creation of X new reusable hooks.
*   **Action Items:**
    *   **[x]** Identify and extract common helper functions (e.g., formatting functions, calculation logic like `getRankColor`, `getAccuracyColor`) from components into `src/lib/utils.ts` or more specific utility files (Done for `formatDate`, `formatTime`).
    *   **[x]** Identify patterns of shared stateful logic or side effects within components and refactor them into custom hooks in `src/hooks/` (Done for `usePracticeSetAnalytics`, `useReviewPageState`).
    *   **[ ]** Document key utilities and hooks with usage examples in `docs/architecture.md` or dedicated files.
*   **Dependencies:** Component Modularization (identifies candidates for extraction).
*   **Related Plans:** Performance Plan (Debounce/Throttle).

### 3.5. Testing Strategy

*   **Objective:** Establish a comprehensive testing strategy to ensure application stability and prevent regressions, focusing on custom logic and integration points.
*   **Measurable Goal:** Achieve X% unit test coverage for critical utilities, hooks, and custom UI components. Implement E2E tests for Y key user flows. Integrate tests into CI pipeline.
*   **Action Items:**
    *   **[ ]** Choose and configure testing frameworks: **Vitest** (recommended for Vite-based Next.js) or Jest for unit/integration tests, **React Testing Library** for component testing, **Playwright** (recommended) or Cypress for E2E tests.
    *   **[ ]** Define the testing strategy and guidelines in `docs/testing.md`: Scope of unit vs. integration vs. E2E tests, naming conventions, mocking strategy. **Emphasize testing the *integration* and *usage* of Catalyst components within the application, not the internal implementation of Catalyst components themselves.**
    *   **[ ]** Set up testing environment and scripts (`npm run test`, `npm run test:e2e`).
    *   **[ ]** Integrate test execution and coverage reporting into the CI/CD pipeline (e.g., GitHub Actions).
    *   **[ ]** Prioritize writing tests for:
        *   Utility functions (`src/lib`).
        *   Custom hooks (`src/hooks`).
        *   Custom UI components (`src/components/ui`) and complex compositions involving Catalyst components.
        *   Critical user flows (e.g., login, completing a test, viewing results) via E2E tests.
    *   **[ ]** Establish an initial code coverage target (e.g., 60%) for *custom code* and gradually increase it.
*   **Dependencies:** Requires setup and ongoing effort.
*   **Related Plans:** UI/UX Plan (Accessibility testing). Performance Plan (CI/CD Optimization).

### 3.6. Error Handling

*   **Objective:** Implement robust error handling mechanisms for both client-side and server-side operations.
*   **Measurable Goal:** Reduction in uncaught runtime errors reported. Consistent error display to users.
*   **Action Items:**
    *   **[ ]** Implement a root `global-error.tsx` for catching unhandled application-wide errors.
    *   **[ ]** Utilize route-specific `error.tsx` files for more granular error UI within specific sections.
    *   **[ ]** Wrap critical UI sections or components prone to failure (e.g., complex data visualizations, third-party integrations) with custom React Error Boundaries.
    *   **[ ]** Standardize API error handling: Define common error types/codes, implement consistent try/catch blocks or a utility function for data fetching, log errors to a monitoring service (e.g., Sentry).
    *   **[ ]** Design user-friendly error messages that explain the issue (if possible) and suggest next steps (e.g., "Try again", "Contact support"). Avoid exposing technical details.
*   **Dependencies:** Testing Strategy (to verify error states).
*   **Related Plans:** UI/UX Plan (Feedback Mechanisms).

## 4. Prioritization (Example)

1.  Refactor/Replace Components using Catalyst & Modularize Custom Code (High Priority)
2.  Refine State Management Strategy & Documentation (High Priority)
3.  Improve TypeScript Usage & Type Safety (Leveraging Catalyst Types) (Medium Priority)
4.  Refactor Utilities & Hooks (Medium Priority)
5.  Define & Implement Testing Strategy (Focus on Integration) (Medium Priority, ongoing)
6.  Enhance Error Handling (Medium Priority)

## 5. Next Steps

*   Discuss and refine the proposed improvement areas, particularly the strategy for integrating Catalyst components.
*   Prioritize action items based on impact and effort.
*   Begin implementation, focusing on replacing/refactoring components with Catalyst where appropriate.
*   Update relevant documentation (`docs/architecture.md`, `CONTRIBUTING.md`) as patterns for using Catalyst are established.
