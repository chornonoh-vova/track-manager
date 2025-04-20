import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "whitespace-nowrap",
    "rounded-md",
    "text-sm",
    "font-medium",
    "ring-offset-background",
    "transition-colors",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg]:size-4",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary",
          "text-primary-foreground",
          "hover:bg-primary/90",
        ],
        destructive: [
          "bg-destructive",
          "text-destructive-foreground",
          "hover:bg-destructive/90",
        ],
        secondary: [
          "bg-secondary",
          "text-secondary-foreground",
          "hover:bg-secondary/80",
        ],
        outline: [
          "border",
          "border-border",
          "bg-background",
          "shadow-xs",
          "hover:bg-accent",
          "hover:text-accent-foreground",
        ],
        ghost: [
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "dark:hover:bg-accent/50",
        ],
        link: ["text-primary", "underline-offset-4", "hover:underline"],
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <button
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  />
);

Button.displayName = "Button";

export { Button };
