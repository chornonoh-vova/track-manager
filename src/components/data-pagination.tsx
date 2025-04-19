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
        {meta.page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              data-testid="pagination-prev"
              onClick={onPrev}
            />
          </PaginationItem>
        )}
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
        {meta.page !== meta.totalPages && (
          <PaginationItem>
            <PaginationNext data-testid="pagination-next" onClick={onNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export { DataPagination };
