import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      // Reverted: Map semantic variants directly to Tailwind scale classes
      h1: "scroll-m-20 text-5xl font-bold tracking-tight", // h1 -> 5xl
      h2: "scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight first:mt-0", // h2 -> 4xl
      h3: "scroll-m-20 text-3xl font-semibold tracking-tight", // h3 -> 3xl
      h4: "scroll-m-20 text-2xl font-semibold tracking-tight", // h4 -> 2xl
      h5: "scroll-m-20 text-xl font-semibold tracking-tight", // h5 -> xl
      h6: "scroll-m-20 text-lg font-semibold tracking-tight", // h6 -> lg
      p: "text-base leading-7 [&:not(:first-child)]:mt-6", // p -> base (default)
      blockquote: "mt-6 border-l-2 pl-6 italic text-base", // blockquote -> base
      list: "my-6 ml-6 list-disc text-base [&>li]:mt-2", // list -> base
      lead: "text-lg text-foreground", // lead -> lg
      large: "text-lg font-semibold", // large -> lg
      small: "text-sm font-medium leading-tight", // small -> sm
      muted: "text-sm text-muted-foreground", // muted -> sm
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    font: {
      default: "font-sans",
      heading: "font-sans",
      mono: "font-mono",
    },
  },
  defaultVariants: {
    variant: "p",
    weight: "normal",
    font: "default",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, weight, font, ...props }, ref) => {
    const Component = 
      variant === 'blockquote' 
        ? 'blockquote' 
        : variant === 'list' 
          ? 'ul' 
          : variant === 'h1' 
            ? 'h1'
          : variant === 'h2' 
            ? 'h2'
          : variant === 'h3' 
            ? 'h3'
          : variant === 'h4' 
            ? 'h4'
          : variant === 'h5' 
            ? 'h5'
          : variant === 'h6' 
            ? 'h6'
          : 'p'
    
    return React.createElement(
      Component,
      {
        className: cn(typographyVariants({ variant, weight, font, className })),
        ref,
        ...props
      }
    )
  }
)
Typography.displayName = "Typography"

export { Typography, typographyVariants }
