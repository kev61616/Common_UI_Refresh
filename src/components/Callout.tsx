import clsx from 'clsx';

import { Icon } from '@/components/Icon';

const styles = {
  note: {
    container:
    'bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-sky-900 dark:text-sky-400',
    body: 'text-sky-800 [--tw-prose-background:var(--color-sky-50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300'
  },
  warning: {
    container:
    'bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 [--tw-prose-underline:var(--color-amber-400)] [--tw-prose-background:var(--color-amber-50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:var(--color-sky-700)] dark:prose-code:text-slate-300'
  }
};

const icons = {
  note: (props: {className?: string;}) => <Icon icon="lightbulb" {...props} data-oid="h1pzwzh" />,
  warning: (props: {className?: string;}) =>
  <Icon icon="warning" color="amber" {...props} data-oid="2iogmfc" />

};

export function Callout({
  title,
  children,
  type = 'note'




}: {title: string;children: React.ReactNode;type?: keyof typeof styles;}) {
  let IconComponent = icons[type];

  return (
    <div className={clsx('my-8 flex rounded-3xl p-6', styles[type].container)} data-oid="w7846am">
      <IconComponent className="h-8 w-8 flex-none" data-oid="xg4-f2k" />
      <div className="ml-4 flex-auto" data-oid="l9z.qib">
        <p className={clsx('m-0 font-display text-xl', styles[type].title)} data-oid="fcdo.k9">
          {title}
        </p>
        <div className={clsx('prose mt-2.5', styles[type].body)} data-oid="fqxls34">
          {children}
        </div>
      </div>
    </div>);

}