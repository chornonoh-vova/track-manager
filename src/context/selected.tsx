import { createContext } from "react";

export type SelectedContext = {
  select: (id: string) => void;
  deselect: (id: string) => void;
  isSelected: (id: string) => boolean;
};

export const SelectedContext = createContext<SelectedContext>({
  select: () => null,
  deselect: () => null,
  isSelected: () => false,
});
