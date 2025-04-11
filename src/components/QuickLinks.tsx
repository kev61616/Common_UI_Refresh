import Link from 'next/link';

import { Icon } from '@/components/Icon';

export function QuickLinks({ children }: {children: React.ReactNode;}) {
  return (
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2" data-oid="qapr7hk">
      {children}
    </div>);

}

export function QuickLink({
  title,
  description,
  href,
  icon





}: {title: string;description: string;href: string;icon: React.ComponentProps<typeof Icon>['icon'];}) {
  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800" data-oid="a66kpcn">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,var(--color-sky-50)),var(--quick-links-hover-bg,var(--color-sky-50)))_padding-box,linear-gradient(to_top,var(--color-indigo-400),var(--color-cyan-400),var(--color-sky-500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:var(--color-slate-800)]" data-oid="beka2tv" />
      <div className="relative overflow-hidden rounded-xl p-6" data-oid=".:j.36:">
        <Icon icon={icon} className="h-8 w-8" data-oid="jhbj.u1" />
        <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white" data-oid="nre1nbe">
          <Link href={href} data-oid="4snjcyx">
            <span className="absolute -inset-px rounded-xl" data-oid="wai.r2w" />
            {title}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400" data-oid="j0j4c63">
          {description}
        </p>
      </div>
    </div>);

}