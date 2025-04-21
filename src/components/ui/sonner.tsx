import { type CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => (
  <Sonner
    theme={"system"}
    className="toaster group"
    data-testid="toast-container"
    richColors
    style={
      {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      } as CSSProperties
    }
    {...props}
  />
);

export { Toaster };
