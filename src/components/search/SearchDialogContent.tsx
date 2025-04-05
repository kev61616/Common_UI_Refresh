'use client'

import React, { useRef } from 'react'
import { DialogPanel } from '@headlessui/react'
import { type AutocompleteApi, type AutocompleteCollection, type AutocompleteState } from '@algolia/autocomplete-core'
import { type Result } from '@/markdoc/search.mjs'
import { SearchInputComponent } from './SearchInputComponent' // Import the extracted input
import { SearchResultsList } from './SearchResultsList' // Import the extracted results list

// Define minimal Autocomplete type needed for props
type Autocomplete = AutocompleteApi<
  Result,
  React.SyntheticEvent,
  React.MouseEvent,
  React.KeyboardEvent
>
type EmptyObject = Record<string, never>

interface SearchDialogContentProps {
  autocomplete: Autocomplete
  autocompleteState: AutocompleteState<Result> | EmptyObject
  onClose: () => void
}

export function SearchDialogContent({
  autocomplete,
  autocompleteState,
  onClose,
}: SearchDialogContentProps) {
  let formRef = useRef<React.ElementRef<'form'>>(null)
  let panelRef = useRef<React.ElementRef<'div'>>(null)
  // inputRef needs to be created and managed in the parent SearchDialog component
  // because the form props need access to it. We'll assume it's passed down or handled there.
  // For now, we'll pass null to getFormProps, but this needs adjustment in the parent.
  // Alternatively, pass inputRef as a prop. Let's assume inputRef is managed by parent.

  return (
    <DialogPanel className="mx-auto transform-gpu overflow-hidden rounded-xl bg-white shadow-xl sm:max-w-xl dark:bg-slate-800 dark:ring-1 dark:ring-slate-700">
      <div {...autocomplete.getRootProps({})}>
        <form
          ref={formRef}
          {...autocomplete.getFormProps({
            inputElement: null, // Needs ref from parent SearchDialog
          })}
        >
          {/* We need to instantiate SearchInputComponent here, but it needs a ref.
              This suggests SearchInputComponent might need to stay within SearchDialog
              or the ref needs careful handling/passing.
              Let's defer moving SearchInputComponent instantiation for now and focus on SearchResultsList.
              The parent SearchDialog will render SearchInputComponent directly.
           */}

          <div
            ref={panelRef}
            className="border-t border-slate-200 bg-white px-2 py-3 empty:hidden dark:border-slate-400/10 dark:bg-slate-800" // Use p-2, py-3. TODO: Use semantic border/bg
            {...autocomplete.getPanelProps({})}
          >
            {autocompleteState.isOpen && autocompleteState.collections.length > 0 && (
              <SearchResultsList
                autocomplete={autocomplete}
                query={autocompleteState.query}
                collection={autocompleteState.collections[0]}
              />
            )}
          </div>
        </form>
      </div>
    </DialogPanel>
  )
}
