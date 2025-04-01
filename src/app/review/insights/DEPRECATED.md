# DEPRECATED

This folder is deprecated and should be removed.

The insights page has been replaced with direct navigation to the specific review pages:
- /review/set
- /review/question
- /review/board

The redirection logic has been updated in /src/app/review/page.tsx to route users to the specific pages instead of insights.
Navigation has also been updated in /src/lib/navigation.ts to point directly to the specific pages.

## Removal Plan

This directory can be safely removed as part of the next cleanup process after verifying that:
1. Navigation works correctly to all three review pages
2. No references to /insights remain in the codebase
