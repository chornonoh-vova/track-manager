import { Order, type Sort } from "../lib/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SortSelectProps = {
  selectedSort: Sort;
  selectedOrder: Order;
  onSelectedSortChange: (sort: Sort) => void;
  onSelectedOrderChange: (order: Order) => void;
};

const SortSelect = ({
  selectedSort,
  selectedOrder,
  onSelectedSortChange,
  onSelectedOrderChange,
}: SortSelectProps) => {
  const sortOptions: Record<Sort, string> = {
    title: "Title",
    artist: "Artist",
    album: "Album",
    createdAt: "Created At",
  };

  const orderOptions: Record<Order, string> = {
    asc: "Asc",
    desc: "Desc",
  };

  return (
    <>
      <Select
        data-testid="sort-select"
        value={selectedSort}
        onValueChange={onSelectedSortChange}
      >
        <SelectTrigger>
          <SelectValue aria-label={selectedSort}>
            Sort By: {sortOptions[selectedSort]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            {Object.entries(sortOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={selectedOrder} onValueChange={onSelectedOrderChange}>
        <SelectTrigger>
          <SelectValue aria-label={selectedOrder}>
            Order: {orderOptions[selectedOrder]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order</SelectLabel>
            {Object.entries(orderOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export { SortSelect };
