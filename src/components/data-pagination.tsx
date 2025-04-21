import { type PaginatedResponse } from "../lib/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type DataPaginationProps = {
  meta: PaginatedResponse<unknown>["meta"];
  onPrev: () => void;
  onNext: () => void;
  onPage: (page: number) => void;
};

const DataPagination = ({
  meta,
  onPrev,
  onPage,
  onNext,
}: DataPaginationProps) => {
  return (
    <Pagination data-testid="pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            data-testid="pagination-prev"
            onClick={onPrev}
            disabled={meta.page === 1}
            aria-disabled={meta.page === 1 ? true : undefined}
          />
        </PaginationItem>
        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === meta.page}
                onClick={() => onPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            data-testid="pagination-next"
            disabled={meta.page === meta.totalPages}
            aria-disabled={meta.page === meta.totalPages ? true : undefined}
            onClick={onNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { DataPagination };
