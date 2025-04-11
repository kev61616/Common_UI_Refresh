import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
// Import from our ESM module
import * as typography from "../../config/typography.mjs";

// Define variant type based on available typography variants
type TypographyVariant = keyof typeof typography.typographyVariants;

// Import variant classes from the centralized typography configuration
const typographyVariants = cva("text-foreground", {
  variants: {
    variant: typography.getTypographyVariantClasses() as Record<string, string>,
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    },
    font: {
      default: "font-sans",
      heading: "font-sans",
      mono: "font-mono"
    }
  },
  defaultVariants: {
    variant: "p",
    weight: "normal",
    font: "default"
  }
});

export interface TypographyProps extends 
  Omit<React.HTMLAttributes<HTMLElement>, "as">, 
  Omit<VariantProps<typeof typographyVariants>, 'variant'> {
    variant?: TypographyVariant;
}

// Using a more versatile approach to handle different element types
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", weight, font, ...props }, ref) => {
    const Comp = React.useMemo(() => {
      switch(variant) {
        case 'h1': return 'h1';
        case 'h2': return 'h2';
        case 'h3': return 'h3';
        case 'h4': return 'h4';
        case 'h5': return 'h5';
        case 'h6': return 'h6';
        case 'blockquote': return 'blockquote';
        case 'list': return 'ul';
        default: return 'p';
      }
    }, [variant]);

    return React.createElement(
      Comp,
      {
        className: cn(typographyVariants({ variant, weight, font, className })),
        ref,
        ...props
      }
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
