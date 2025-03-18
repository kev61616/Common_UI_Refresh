import Image from 'next/image'

export function Logomark(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-8 w-8 relative" {...props}>
      <Image 
        src="/topbar/brainbox_logo.png" 
        alt="BrainBox Logo" 
        width={32}
        height={32}
        className="object-contain"
      />
    </div>
  )
}

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-8 relative flex items-center" {...props}>
      <div className="relative w-8 h-8 flex items-center justify-center">
        <Image 
          src="/topbar/brainbox_logo.png" 
          alt="BrainBox Logo" 
          width={32}
          height={32}
          priority
          className="object-contain"
        />
      </div>
      <span className="ml-2 text-base font-semibold text-slate-800 dark:text-white leading-none whitespace-nowrap">BrainBox</span>
    </div>
  )
}
