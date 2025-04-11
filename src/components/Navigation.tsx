import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { navigation } from '@/lib/navigation';

export function Navigation({
  className,
  onLinkClick



}: {className?: string;onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>;}) {
  let pathname = usePathname();

  return (
    <nav className={clsx('text-lg lg:text-base', className)} data-oid="nde.xnf">
      <ul role="list" className="space-y-6" data-oid="2qbzsmw">
        {navigation.map((section) =>
        <li key={section.title} data-oid="jikiej_">
            <h2 className="font-display font-medium text-slate-900 dark:text-white" data-oid=".lp66hg">
              {section.title}
            </h2>
            <ul
            role="list"
            className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-3 lg:space-y-3 lg:border-slate-200 dark:border-slate-800" data-oid="xf07wl4">

              {section.links.map((link) =>
            <li key={link.href} className="relative" data-oid="ww.kgqt">
                  <Link
                href={link.href}
                onClick={onLinkClick}
                className={clsx(
                  'block w-auto mr-4 py-1 px-2 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full transition-all duration-200',
                  link.href === pathname ?
                  'font-semibold text-sky-600 before:bg-sky-500 rounded-full bg-sky-100 dark:bg-sky-900/40 dark:text-sky-300' :
                  'text-slate-500 before:hidden before:bg-slate-300 hover:bg-purple-50 hover:text-purple-600 hover:rounded-full hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-purple-400 dark:hover:bg-purple-900/30'
                )} data-oid="nhtd-xs">

                    {link.title}
                  </Link>
                </li>
            )}
            </ul>
          </li>
        )}
      </ul>
    </nav>);

}