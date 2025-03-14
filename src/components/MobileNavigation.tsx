'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Dialog, DialogPanel, Disclosure } from '@headlessui/react'
import clsx from 'clsx'

import { Logomark } from '@/components/Logo'
import { navigation } from '@/lib/navigation'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  )
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function CloseOnNavigation({ close }: { close: () => void }) {
  let pathname = usePathname()
  let searchParams = useSearchParams()

  useEffect(() => {
    close()
  }, [pathname, searchParams, close])

  return null
}

function MobileNavigationItem({ 
  section,
  pathname,
  onLinkClick
}: {
  section: {
    title: string
    links: { title: string; href: string }[]
  }
  pathname: string
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  const isActive = section.links.some(link => link.href === pathname)
  
  return (
    <Disclosure as="div" className="py-2">
      {({ open }) => (
        <>
          <Disclosure.Button className={clsx(
            "flex w-full items-center justify-between px-3 py-2 text-base font-medium",
            isActive ? "text-sky-500" : "text-slate-700 dark:text-slate-300"
          )}>
            <span>{section.title}</span>
            <ChevronDownIcon 
              className={clsx(
                "h-5 w-5 transition-transform duration-150",
                open ? 'rotate-180 transform' : ''
              )} 
            />
          </Disclosure.Button>
          
          <Disclosure.Panel className="mt-1 space-y-1">
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onLinkClick}
                className={clsx(
                  'block pl-8 pr-3 py-2 text-base',
                  link.href === pathname
                    ? 'font-medium text-sky-500'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                )}
              >
                {link.title}
              </Link>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export function MobileNavigation() {
  let [isOpen, setIsOpen] = useState(false)
  let pathname = usePathname()
  let close = useCallback(() => setIsOpen(false), [setIsOpen])

  function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
    let link = event.currentTarget
    if (
      link.pathname + link.search + link.hash ===
      window.location.pathname + window.location.search + window.location.hash
    ) {
      close()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-6 w-6 stroke-slate-500" />
      </button>
      <Suspense fallback={null}>
        <CloseOnNavigation close={close} />
      </Suspense>
      <Dialog
        open={isOpen}
        onClose={() => close()}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur-sm lg:hidden"
        aria-label="Navigation"
      >
        <DialogPanel className="min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 sm:px-6 dark:bg-slate-900">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => close()}
              aria-label="Close navigation"
            >
              <CloseIcon className="h-6 w-6 stroke-slate-500" />
            </button>
            <Link href="/" className="ml-6" aria-label="Home page">
              <Logomark className="h-9 w-9" />
            </Link>
          </div>
          
          <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
            {navigation.map((section) => (
              <MobileNavigationItem
                key={section.title}
                section={section}
                pathname={pathname}
                onLinkClick={onLinkClick}
              />
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}
