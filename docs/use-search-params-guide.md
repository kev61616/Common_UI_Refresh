# useSearchParams Best Practices Guide

The `useSearchParams` hook from `next/navigation` is a powerful tool for managing state in the URL query string. To ensure consistency, prevent bugs, and maintain clean state management, follow these best practices throughout the application.

## Core Principles

1.  **Use Only String Values:**
    *   Always ensure that values passed to `setSearchParams` (or used when constructing `URLSearchParams`) are strings. Convert numbers, booleans, or other types to strings explicitly.
    *   **Example:** `params.set('page', String(currentPage));`

2.  **Preserve Existing Parameters:**
    *   When updating one search parameter, avoid accidentally removing others. Always start with the current parameters and modify them.
    *   **Example:**
        ```typescript
        import { useSearchParams, useRouter, usePathname } from 'next/navigation';
        import { useCallback } from 'react';

        // Inside your component
        const router = useRouter();
        const pathname = usePathname();
        const searchParams = useSearchParams();

        const updateSortParam = useCallback((newSortValue: string) => {
          // Create a new URLSearchParams object based on the current params
          const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

          // Update the specific parameter
          current.set('sort', newSortValue);

          // Cast the updated params to a string
          const search = current.toString();
          // Create the query string
          const query = search ? `?${search}` : "";

          router.push(`${pathname}${query}`);
        }, [searchParams, pathname, router]);
        ```

3.  **Do Not Mutate Directly:**
    *   The `searchParams` object returned by the hook is read-only. Attempting to mutate it directly can lead to unexpected behavior.

4.  **Clone Before Modifying:**
    *   Always create a *new* `URLSearchParams` instance based on the current `searchParams` before making changes, as shown in the example above.
    *   **Correct:** `const newParams = new URLSearchParams(searchParams);`
    *   **Incorrect:** `searchParams.set('key', 'value'); // Don't do this!`

5.  **Use `.toString()` Only for Final Query String:**
    *   Use the `URLSearchParams` methods (`.set()`, `.get()`, `.delete()`, etc.) for manipulation. Only call `.toString()` when you need the final query string representation to append to the URL path for navigation.

6.  **Handle Missing/Null Parameters Gracefully:**
    *   When reading parameters using `searchParams.get('key')`, always account for the possibility that the parameter might be missing (`null`). Provide sensible defaults or fallback logic.
    *   **Example:** `const page = parseInt(searchParams.get('page') ?? '1', 10);`

7.  **Consistent Key Names:**
    *   Use the same parameter key names consistently across different parts of the application to avoid confusion. Document standard key names if necessary.

8.  **Debounce Frequent Updates:**
    *   If syncing UI elements that change rapidly (like text input filters) to search parameters, debounce the updates to avoid excessive URL changes and potential performance issues.

9.  **Avoid Redundant Updates:**
    *   Before calling `router.push`, check if the new parameter value is actually different from the current value in `searchParams`. If not, skip the navigation to prevent unnecessary re-renders or history entries.

10. **Reflect Meaningful, Shareable State:**
    *   Only store state in the URL that is meaningful to share or bookmark (e.g., filters, page numbers, view states). Avoid storing transient UI state (e.g., modal open/closed status) in search parameters unless it's essential for deep linking.

By adhering to these guidelines, we can leverage `useSearchParams` effectively for robust and predictable state management via the URL.
