import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16" data-oid="ujbr4py">
      <div className="flex h-full flex-col items-center justify-center text-center" data-oid="7y:u9.d">
        <p className="font-display text-sm font-medium text-slate-900 dark:text-white" data-oid="fua:5qz">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl tracking-tight text-slate-900 dark:text-white" data-oid="_ql4287">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400" data-oid="z_5-6w4">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="mt-8 text-sm font-medium text-slate-900 dark:text-white" data-oid="2_ei9:y">

          Go back home
        </Link>
      </div>
    </div>);

}