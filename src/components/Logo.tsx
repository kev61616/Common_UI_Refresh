import Image from 'next/image'

export function Logomark(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-9 w-9 relative" {...props}>
      <Image 
        src="/topbar/brainbox_logo.png" 
        alt="BrainBox Logo" 
        fill
        className="object-contain"
        sizes="36px"
      />
    </div>
  )
}

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-9 w-auto max-w-[180px] relative" {...props}>
      <Image 
        src="/topbar/brainbox_logo.png" 
        alt="BrainBox Logo" 
        fill
        className="object-contain object-left"
        sizes="(max-width: 1024px) 100vw, 180px"
      />
    </div>
  )
}
