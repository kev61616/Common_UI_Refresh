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

### 3.1. Component Modularization

*   **Objective:** Reduce the complexity of large components for better readability, testability, and reusability.
*   **Measurable Goal:** Reduce the number of components > 400 lines by X%. Aim for average component size < Y lines.
*   **Action Items:**
    *   Continue systematically refactoring components identified as exceeding the line count threshold (e.g., 400 lines), prioritizing non-variant components first.
        *   **Example Targets:** `src/components/Search.tsx` (potential sub-components: `SearchResultsList`, `SearchInput`, `SearchFilters`), `src/components/review/AnalyticsPanel.tsx` (sub-components: `StatCard`, `PerformanceChart`, `InsightSummary`), `src/components/review/FilterBar.tsx` (sub-components: `FilterPill`, `FilterDropdown`, `AppliedFiltersDisplay`).
    *   Evaluate complex view variants (`src/components/review/*-view-variants/`) for potential modularization. Example: A chart-heavy variant could extract the chart logic/rendering into a dedicated `*ChartView.tsx` component.
    *   Establish clear guidelines on component size (e.g., aim for < 200-300 lines) and responsibility (Single Responsibility Principle) within `CONTRIBUTING.md` or `docs/architecture.md`.
*   **Tools:** React functional components, Props drilling (initially), Context API or state management libraries (Zustand, Jotai) for deeper state needs.
*   **Dependencies:** State Management Strategy (for passing state to new sub-components).

### 3.2. State Management Strategy

*   **Objective:** Define clear guidelines for choosing the appropriate state management tool based on the scope and nature of the state.
*   **Measurable Goal:** Documented strategy agreed upon by the team. Reduction in prop drilling depth in refactored components.
*   **Action Items:**
    *   Document explicit rules and decision tree in `docs/architecture.md`:
        *   **URL State (`useSearchParams`):** For shareable/bookmarkable state (filters, pagination, view modes). Reference `docs/use-search-params-guide.md`.
        *   **React Context (`src/contexts`):** For low-frequency global state (theme, user auth, layout). Avoid for high-frequency updates.
        *   **Component Local State (`useState`, `useReducer`):** Default for component-specific state.
        *   **Client-side State Library (e.g., Zustand):** Evaluate and potentially adopt for complex, cross-component client state with frequent updates (e.g., shared form state, complex UI interactions).
    *   Refactor components identified during modularization or audits to use the appropriate strategy.
*   **Dependencies:** Component Modularization.
*   **Related Plans:** UI/UX Plan (Component Library).

### 3.3. TypeScript & Type Safety

*   **Objective:** Leverage TypeScript more effectively to catch errors during development and improve code clarity.
*   **Measurable Goal:** Achieve 0 `any` types in the codebase (excluding external library limitations). Enable and pass stricter `tsconfig.json` checks.
*   **Action Items:**
    *   Enable/verify stricter options in `tsconfig.json`: `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`.
    *   Use ESLint rules (e.g., `@typescript-eslint/no-explicit-any`) to flag `any` usage. Systematically refactor identified instances.
    *   Define/refine interfaces/types in `src/types/` for core domain models (`Question`, `User`, `TestSet`, `Achievement`, etc.) and API payloads. Use these types consistently in component props, state, and function signatures. Add JSDoc for clarity.
    *   Utilize utility types (`Partial`, `Pick`, `Omit`, `Record`, `Readonly`) to create precise types derived from base models.
    *   Refactor mock data (`src/lib/mockData`) to strictly adhere to defined types, potentially using factory functions or type validation.
*   **Dependencies:** Ongoing effort alongside other refactoring.
*   **Related Plans:** UI/UX Plan (Component Library documentation).

### 3.4. Utility Functions & Hooks

*   **Objective:** Consolidate and organize reusable logic into utility functions and custom hooks.
*   **Measurable Goal:** Reduction of duplicated helper functions within components. Creation of X new reusable hooks.
*   **Action Items:**
    *   Identify and extract common helper functions (e.g., formatting functions, calculation logic like `getRankColor`, `getAccuracyColor`) from components into `src/lib/utils.ts` or more specific utility files.
    *   Identify patterns of shared stateful logic or side effects within components and refactor them into custom hooks in `src/hooks/` (e.g., `useDataFetching`, `useTimer`, `useWindowSize`).
    *   Document key utilities and hooks with usage examples in `docs/architecture.md` or dedicated files.
*   **Dependencies:** Component Modularization (identifies candidates for extraction).
*   **Related Plans:** Performance Plan (Debounce/Throttle).

### 3.5. Testing Strategy

*   **Objective:** Establish a comprehensive testing strategy to ensure application stability and prevent regressions.
*   **Measurable Goal:** Achieve X% unit test coverage for critical utilities, hooks, and UI components. Implement E2E tests for Y key user flows. Integrate tests into CI pipeline.
*   **Action Items:**
    *   Choose and configure testing frameworks: **Vitest** (recommended for Vite-based Next.js) or Jest for unit/integration tests, **React Testing Library** for component testing, **Playwright** (recommended) or Cypress for E2E tests.
    *   Define the testing strategy and guidelines in `docs/testing.md`: Scope of unit vs. integration vs. E2E tests, naming conventions, mocking strategy.
    *   Set up testing environment and scripts (`npm run test`, `npm run test:e2e`).
    *   Integrate test execution and coverage reporting into the CI/CD pipeline (e.g., GitHub Actions).
    *   Prioritize writing tests for:
        *   Utility functions (`src/lib`).
        *   Custom hooks (`src/hooks`).
        *   Core UI components (`src/components/ui`).
        *   Critical user flows (e.g., login, completing a test, viewing results) via E2E tests.
    *   Establish an initial code coverage target (e.g., 60%) and gradually increase it.
*   **Dependencies:** Requires setup and ongoing effort.
*   **Related Plans:** UI/UX Plan (Accessibility testing). Performance Plan (CI/CD Optimization).

### 3.6. Error Handling

*   **Objective:** Implement robust error handling mechanisms for both client-side and server-side operations.
*   **Measurable Goal:** Reduction in uncaught runtime errors reported. Consistent error display to users.
*   **Action Items:**
    *   Implement a root `global-error.tsx` for catching unhandled application-wide errors.
    *   Utilize route-specific `error.tsx` files for more granular error UI within specific sections.
    *   Wrap critical UI sections or components prone to failure (e.g., complex data visualizations, third-party integrations) with custom React Error Boundaries.
    *   Standardize API error handling: Define common error types/codes, implement consistent try/catch blocks or a utility function for data fetching, log errors to a monitoring service (e.g., Sentry).
    *   Design user-friendly error messages that explain the issue (if possible) and suggest next steps (e.g., "Try again", "Contact support"). Avoid exposing technical details.
*   **Dependencies:** Testing Strategy (to verify error states).
*   **Related Plans:** UI/UX Plan (Feedback Mechanisms).

## 4. Prioritization (Example)

1.  Continue Component Modularization (High Priority)
2.  Refine State Management Strategy & Documentation (High Priority)
3.  Improve TypeScript Usage & Type Safety (Medium Priority)
4.  Refactor Utilities & Hooks (Medium Priority)
5.  Define & Implement Testing Strategy (Medium Priority, ongoing)
6.  Enhance Error Handling (Medium Priority)

## 5. Next Steps

*   Discuss and refine the proposed improvement areas.
*   Prioritize action items based on impact and effort.
*   Begin implementation, starting with high-priority items like component modularization.
*   Update relevant documentation (`docs/architecture.md`, `CONTRIBUTING.md`) as patterns are established.
