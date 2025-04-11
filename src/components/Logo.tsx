import Image from 'next/image';

export function Logomark(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-8 w-8 relative" {...props} data-oid="avtvuco">
      <Image
        src="/topbar/brainbox_logo.png"
        alt="BrainBox Logo"
        width={32}
        height={32}
        className="object-contain" data-oid="gnkh6id" />

    </div>);

}

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-8 relative flex items-center" {...props} data-oid="f0eiemq">
      <div className="relative w-8 h-8 flex items-center justify-center" data-oid="dlwelpa">
        <Image
          src="/topbar/brainbox_logo.png"
          alt="BrainBox Logo"
          width={32}
          height={32}
          priority
          className="object-contain" data-oid="dhjc9x." />

      </div>
      <span className="ml-2 text-base font-semibold text-slate-800 dark:text-white leading-none whitespace-nowrap" data-oid="zd4e_-p">BrainBox</span>
    </div>);

}