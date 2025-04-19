import { type PaginatedResponse } from "../lib/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

type DataPaginationProps = {
  meta: PaginatedResponse<unknown>["meta"];
};

const DataPagination = ({ meta }: DataPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        {meta.page !== 1 && (
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
        )}
        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === meta.page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        {meta.page !== meta.totalPages && (
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export { DataPagination };
