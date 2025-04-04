# Syntax Application Architecture Guide

This document provides an overview of the technical architecture, design patterns, and best practices employed in the Syntax education platform. Its goal is to guide development, ensure consistency, and facilitate onboarding for new contributors.

## Table of Contents

- [Syntax Application Architecture Guide](#syntax-application-architecture-guide)
  - [Table of Contents](#table-of-contents)
  - [Overall Architecture](#overall-architecture)
    - [Technology Stack](#technology-stack)
    - [Project Structure](#project-structure)
    - [Rendering Strategy (Server/Client Components)](#rendering-strategy-serverclient-components)
  - [Component Design Patterns](#component-design-patterns)
    - [Reusable UI Components (`src/components/ui`)](#reusable-ui-components-srccomponentsui)
    - [Feature Components (`src/components/*`)](#feature-components-srccomponents)
    - [Custom Hooks (`src/hooks`)](#custom-hooks-srchooks)
    - [Styling (Tailwind CSS)](#styling-tailwind-css)
    - [Handling Hydration Errors](#handling-hydration-errors)
  - [State Management](#state-management)
    - [URL State (`useSearchParams`)](#url-state-usesearchparams)
    - [React Context (`src/contexts`)](#react-context-srccontexts)
    - [Local Component State (`useState`, `useReducer`)](#local-component-state-usestate-usereducer)
  - [Data Flow](#data-flow)
    - [Data Fetching (Server Components)](#data-fetching-server-components)
    - [Data Mutation](#data-mutation)
    - [Mock Data (`src/lib/mockData`)](#mock-data-srclibmockdata)
  - [Routing and Navigation](#routing-and-navigation)
    - [App Router (`src/app`)](#app-router-srcapp)
    - [Layouts (`layout.tsx`)](#layouts-layouttsx)
    - [Loading UI (`loading.tsx`)](#loading-ui-loadingtsx)
    - [Error Handling (`error.tsx`, `global-error.tsx`)](#error-handling-errortsx-global-errortsx)
    - [Navigation Utilities (`src/lib/navigation.ts`)](#navigation-utilities-srclibnavigationts)
  - [React Best Practices](#react-best-practices)
    - [React 18+ Features](#react-18-features)
    - [Hooks Rules](#hooks-rules)
    - [Performance Optimization](#performance-optimization)
  - [Code Style and Linting](#code-style-and-linting)
  - [Testing Strategy](#testing-strategy)

---

## Overall Architecture

### Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI Library:** React
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **Formatting:** Prettier

### Project Structure

*(Refer to `docs/page-structure.md` for initial details, potentially merge relevant content here later)*

A brief overview of key directories:

- `src/app/`: Contains all routes, pages, layouts, and API endpoints following the App Router convention.
- `src/components/`: Reusable React components.
  - `src/components/ui/`: Generic, primitive UI components (e.g., Button, Input).
  - `src/components/[feature]/`: Components specific to a feature area (e.g., `dashboard`, `profile`).
- `src/lib/`: Utility functions, constants, data fetching logic, type definitions.
- `src/hooks/`: Custom React hooks for shared logic.
- `src/contexts/`: React Context providers for global or shared state.
- `src/styles/`: Global styles, Tailwind base/component layers, CSS variables.
- `public/`: Static assets (images, fonts).
- `docs/`: Project documentation.

### Rendering Strategy (Server/Client Components)

- **Default to Server Components:** Components are Server Components by default for better performance and direct data access.
- **Use Client Components (`'use client'`) Sparingly:** Only use Client Components when interactivity (hooks like `useState`, `useEffect`, event handlers) is required.
- **Component Splitting:** Keep Client Components small and push them down the tree. Pass Server Component data down as props where possible.
- **Suspense Boundaries:** Wrap Client Components that depend on URL state (`useSearchParams`) or other client-side data fetching in `<Suspense>` boundaries with appropriate fallbacks (`loading.tsx` or inline spinners).

## Component Design Patterns

*(Details to be added)*

### Reusable UI Components (`src/components/ui`)

*(Document approach for base UI elements, e.g., using Radix UI primitives, Shadcn UI conventions, etc.)*

### Feature Components (`src/components/*`)

*(Document patterns for composing features, data flow within features)*

### Custom Hooks (`src/hooks`)

*(List key custom hooks and their purpose, e.g., `useTimer`, `useClickAway`)*

### Styling (Tailwind CSS)

- **Utility-First:** Primarily use Tailwind utility classes directly in JSX.
- **Avoid Custom CSS:** Only use custom CSS (`src/styles`) for complex animations, base styles, or when Tailwind utilities are insufficient.
- **Theme Configuration:** Customize Tailwind via `tailwind.config.js`.
- **Dark Mode:** Implement dark mode using Tailwind's `dark:` variant.

### Handling Hydration Errors

- **Deterministic Rendering:** Ensure components render the same initial HTML on the server and client. Avoid randomness or browser-specific APIs during the initial render.
- **`useEffect` for Client-Side Logic:** Use `useEffect` to run code only after the component has mounted on the client (e.g., accessing `window` or applying dynamic styles based on client state).
- **`isClient` State Pattern:** Use a state variable initialized to `false` and set to `true` in a `useEffect` hook to conditionally render client-specific UI or apply styles only after hydration.
- **`suppressHydrationWarning`:** Use as a last resort on elements where minor, unavoidable differences are expected (e.g., timestamps).
- **Dedicated Client Components:** Isolate client-only logic (like date formatting) into specific Client Components with SSR fallbacks.
- **Refer to `docs/HYDRATION_ERRORS.md`** for more detailed examples and strategies.

## State Management

*(Details to be added)*

### URL State (`useSearchParams`)

- Used for state that should be bookmarkable or shareable (filters, pagination, view modes).
- **Best Practices:** Follow the guidelines in [`docs/use-search-params-guide.md`](docs/use-search-params-guide.md).
- **Suspense:** Wrap components using `useSearchParams` in `<Suspense>`.

### React Context (`src/contexts`)

- Used for global state or state shared across distant parts of the component tree (e.g., theme, layout state).
- Use judiciously to avoid performance issues.

### Local Component State (`useState`, `useReducer`)

- Preferred for state confined to a single component or a small subtree.

## Data Flow

*(Details to be added)*

### Data Fetching (Server Components)

- Primarily fetch data directly within Server Components using `async/await`.
- Use caching mechanisms provided by Next.js (`fetch` extensions, `cache`).

### Data Mutation

*(Document patterns for handling form submissions, API calls for updates/creates/deletes, potentially using Server Actions)*

### Mock Data (`src/lib/mockData`)

- Used for development and testing, especially for complex views.
- Ensure mock data generation is deterministic to prevent hydration errors.

## Routing and Navigation

*(Details to be added, leveraging App Router conventions)*

### App Router (`src/app`)

*(Structure, conventions)*

### Layouts (`layout.tsx`)

*(Shared UI, nested layouts)*

### Loading UI (`loading.tsx`)

*(Streaming UI, loading states)*

### Error Handling (`error.tsx`, `global-error.tsx`)

*(Component-level and global error boundaries)*

### Navigation Utilities (`src/lib/navigation.ts`)

*(Helper functions for constructing paths, managing navigation state)*

## React Best Practices

*(Details to be added)*

### React 18+ Features

*(Leveraging Suspense, Transitions, Server Components)*

### Hooks Rules

*(Adherence to rules, avoiding conditional hooks)*

### Performance Optimization

*(Memoization, code splitting, bundle analysis)*

## Code Style and Linting

- Enforced by ESLint and Prettier configuration (`.eslintrc.json`, `prettier.config.js`).
- Run `npm run lint` and `npm run format`.

## Testing Strategy

*(Details to be added - specify frameworks like Jest, React Testing Library, Cypress, and testing approach)*
