import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";
import { type ComponentProps } from "react";

const Progress = ({
  className,
  value,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Root>) => (
  <ProgressPrimitive.Root
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
);

export { Progress };
