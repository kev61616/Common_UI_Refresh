# Accessibility (a11y) Guidelines & Testing

**Version:** 1.0
**Date:** 2025-04-05

## 1. Introduction

This document outlines the accessibility standards, guidelines, and testing procedures for the Syntax application. Our goal is to ensure the platform is usable and accessible to everyone, including individuals with disabilities, by adhering to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

Accessibility is an ongoing effort and a core part of our development process.

## 2. Standards & Goals

*   **Target Standard:** WCAG 2.1 Level AA
*   **Key Goals:**
    *   Zero critical/serious automated accessibility violations.
    *   Successful completion of key user flows using keyboard-only navigation.
    *   Successful completion of key user flows using screen readers (e.g., VoiceOver, NVDA).
    *   Compliance with WCAG AA color contrast requirements.
    *   Semantic HTML structure and correct ARIA usage where necessary.

## 3. Guidelines & Best Practices

### 3.1. Semantic HTML

*   Use HTML elements according to their semantic meaning (e.g., `<nav>`, `<main>`, `<aside>`, `<button>`, `<input>`, `<h1>`-`<h6>`).
*   Ensure a logical document structure and heading hierarchy.
*   Use landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) appropriately.

### 3.2. Keyboard Navigation

*   All interactive elements (links, buttons, form controls) must be focusable and operable using the keyboard alone.
*   Focus order must be logical and predictable, typically following the visual flow.
*   Visible focus indicators (`focus:ring`, `focus-visible:`) must be present and clear on all focusable elements. Do not disable default outlines without providing a clear alternative.
*   Leverage Catalyst components' built-in keyboard navigation features.

### 3.3. Screen Reader Compatibility

*   Provide descriptive `alt` text for all meaningful images (`next/image` or `<img>`). Decorative images should have an empty `alt=""`.
*   Ensure all form controls have associated, programmatically linked `<label>` elements. Use `aria-label` or `aria-labelledby` only when a visible label is not feasible.
*   Use ARIA attributes (`role`, `aria-*` states and properties) correctly and sparingly, primarily for custom components or dynamic content updates where native HTML semantics are insufficient. Refer to ARIA patterns (e.g., for modals, tabs, accordions). Catalyst components often handle necessary ARIA roles internally.
*   Ensure dynamic content changes are announced appropriately (e.g., using `aria-live` regions).

### 3.4. Color & Contrast

*   Text and interactive elements must meet WCAG AA contrast ratios:
    *   4.5:1 for normal text.
    *   3:1 for large text (18pt/24px normal weight, or 14pt/18.5px bold).
    *   3:1 for graphical elements and UI components (e.g., input borders, button backgrounds against adjacent colors).
*   Use tools (browser devtools, online checkers) to verify contrast.
*   Do not rely on color alone to convey information. Provide text labels, icons, or other visual cues.
*   Refer to `docs/colors.md` for palette guidance and ensure semantic colors meet contrast requirements.

### 3.5. Forms

*   All form inputs must have clear, visible, and programmatically associated labels.
*   Provide clear instructions and indicate required fields.
*   Error messages should be clearly associated with the relevant input (e.g., using `aria-describedby`) and provide helpful guidance.
*   Ensure validation feedback is accessible to screen readers.

### 3.6. Images & Media

*   Provide meaningful `alt` text for images conveying content.
*   Provide captions and transcripts for videos, and audio descriptions where necessary.

## 4. Testing Procedures

Accessibility testing should be integrated throughout the development lifecycle.

### 4.1. Automated Testing

*   **Tools:**
    *   Axe DevTools browser extension.
    *   Lighthouse audits in browser devtools.
    *   (Future) Integrate `@axe-core/react` or similar into CI pipeline or development workflow.
*   **Frequency:** Run regularly during development and before merging major features.
*   **Goal:** Catch common violations related to contrast, ARIA usage, form labels, etc. Automated tools cannot catch all issues.

### 4.2. Manual Testing

*   **Keyboard-Only Testing:**
    *   Navigate through all interactive elements using only the Tab key (Shift+Tab to go backward).
    *   Ensure all elements are reachable and focus order is logical.
    *   Verify visible focus indicators.
    *   Activate all controls (buttons, links, inputs, selects) using Enter or Spacebar.
    *   Test core user flows end-to-end.
*   **Screen Reader Testing:**
    *   **Tools:** VoiceOver (macOS), NVDA (Windows), JAWS (Windows).
    *   **Process:** Test core user flows. Listen for clear announcements of element types, names, states, and values. Verify form labels and error messages are read correctly. Ensure dynamic content updates are announced.
*   **Color Contrast Check:**
    *   Use browser devtools or dedicated contrast checker tools to verify text and UI element contrast ratios against WCAG AA requirements. Check different states (hover, focus).
*   **Zoom/Magnification:**
    *   Zoom the browser up to 200%. Ensure content reflows correctly without horizontal scrolling and remains usable.

## 5. Reporting & Remediation

*   Log accessibility issues found during testing (manual or automated).
*   Prioritize fixing critical and serious violations first.
*   Discuss complex issues or pattern decisions with the team.

## 6. Resources

*   [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
*   [WebAIM (Web Accessibility In Mind)](https://webaim.org/)
*   [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
*   [A11Y Project](https://www.a11yproject.com/)
*   [Catalyst UI Accessibility (Implicit via Headless UI)](https://headlessui.com/react/dialog#accessibility) - Review Headless UI docs for underlying patterns.
