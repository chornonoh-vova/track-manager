import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = ({ className, ...props }: ComponentProps<"ul">) => (
  <ul
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
);

const PaginationItem = (props: ComponentProps<"li">) => <li {...props} />;

type PaginationLinkProps = Exclude<
  ComponentProps<typeof Button>,
  "variant" | "size"
> & {
  isActive?: boolean;
};

const PaginationLink = ({ isActive, ...props }: PaginationLinkProps) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    data-active={isActive}
    variant={isActive ? "outline" : "ghost"}
    size="icon"
    {...props}
  />
);

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
};

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
