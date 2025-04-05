'use client'

import { Fragment, useId } from 'react'
import Highlighter from 'react-highlight-words'
import { type AutocompleteApi, type AutocompleteCollection } from '@algolia/autocomplete-core'
import { type Result } from '@/markdoc/search.mjs'
import { navigation } from '@/lib/navigation' // Assuming navigation is needed for hierarchy

// Define minimal Autocomplete type needed for props
type Autocomplete = AutocompleteApi<
  Result,
  React.SyntheticEvent,
  React.MouseEvent,
  React.KeyboardEvent
>

// --- Reusable Highlighter Component ---
function HighlightQuery({ text, query }: { text: string; query: string }) {
  return (
    <Highlighter
      highlightClassName="group-aria-selected:underline bg-transparent text-sky-600 dark:text-sky-400" // TODO: Use semantic primary/accent color
      searchWords={[query]}
      autoEscape={true}
      textToHighlight={text}
    />
  )
}
// --- End Highlighter ---


// --- Individual Search Result Item ---
function SearchResultItem({
  result,
  autocomplete,
  collection,
  query,
}: {
  result: Result
  autocomplete: Autocomplete
  collection: AutocompleteCollection<Result>
  query: string
}) {
  let id = useId()

  // TODO: This navigation lookup might be better handled elsewhere or passed in
  let sectionTitle = navigation.find((section) =>
    section.links.find((link) => link.href === result.url.split('#')[0]),
  )?.title
  let hierarchy = [sectionTitle, result.pageTitle].filter(
    (x): x is string => typeof x === 'string',
  )

  return (
    <li
      className="group block cursor-default rounded-lg px-3 py-2 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-700/30" // Use p-3? TODO: Use semantic hover/selected background
      aria-labelledby={`${id}-hierarchy ${id}-title`}
      {...autocomplete.getItemProps({
        item: result,
        source: collection.source,
      })}
    >
      <div
        id={`${id}-title`}
        aria-hidden="true"
        className="text-sm text-slate-700 group-aria-selected:text-sky-600 dark:text-slate-300 dark:group-aria-selected:text-sky-400" // TODO: Use semantic text colors (foreground, primary)
      >
        <HighlightQuery text={result.title} query={query} />
      </div>
      {hierarchy.length > 0 && (
        <div
          id={`${id}-hierarchy`}
          aria-hidden="true"
          className="mt-0.5 truncate text-xs whitespace-nowrap text-slate-500 dark:text-slate-400" // Use mt-0.5 (2px). TODO: Use semantic muted color
        >
          {hierarchy.map((item, itemIndex, items) => (
            <Fragment key={itemIndex}>
              <HighlightQuery text={item} query={query} />
              <span
                className={
                  itemIndex === items.length - 1
                    ? 'sr-only'
                    : 'mx-2 text-slate-300 dark:text-slate-700' // Use mx-2 (8px). TODO: Use semantic border/muted color
                }
              >
                /
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </li>
  )
}
// --- End Search Result Item ---


// --- Search Results List ---
export function SearchResultsList({
  autocomplete,
  query,
  collection,
}: {
  autocomplete: Autocomplete
  query: string
  collection: AutocompleteCollection<Result>
}) {
  if (collection.items.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-slate-700 dark:text-slate-400"> {/* Use p-4, py-8. TODO: Use semantic text colors */}
        No results for &ldquo;
        <span className="break-words text-slate-900 dark:text-white"> {/* TODO: Use semantic text color */}
          {query}
        </span>
        &rdquo;
      </p>
    )
  }

  return (
    <ul {...autocomplete.getListProps()}>
      {collection.items.map((result) => (
        <SearchResultItem
          key={result.url}
          result={result}
          autocomplete={autocomplete}
          collection={collection}
          query={query}
        />
      ))}
    </ul>
  )
}
// --- End Search Results List ---
