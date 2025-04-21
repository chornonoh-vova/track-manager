import { ComponentProps } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

type LoadingButtonProps = ComponentProps<typeof Button> & {
  isLoading: boolean;
};

const LoadingButton = ({
  isLoading,
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={isLoading}
      aria-disabled={isLoading ? true : undefined}
      data-loading={isLoading ? true : undefined}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
};

export { LoadingButton };
