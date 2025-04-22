import { useEffect } from "react";
import { useTrackIds } from "../lib/queries";
import { useSet } from "./use-set";

export function useSelectedTracks() {
  const selected = useSet<string>();
  const { data: ids } = useTrackIds();

  useEffect(() => {
    if (!ids) return;

    for (const selectedId of selected) {
      if (!ids.has(selectedId)) {
        selected.delete(selectedId);
      }
    }
  }, [selected, ids]);

  const isSelectedAll = () => {
    if (!ids) return false;
    if (ids.size === selected.size) {
      return true;
    } else if (selected.size !== 0) {
      return "indeterminate";
    } else {
      return false;
    }
  };

  const selectAll = () => {
    ids?.forEach((id) => selected.add(id));
  };

  const deselectAll = () => {
    selected.clear();
  };

  const select = (id: string) => {
    selected.add(id);
  };

  const deselect = (id: string) => {
    selected.delete(id);
  };

  const isSelected = (id: string) => {
    return selected.has(id);
  };

  return {
    selected,
    selectedCount: selected.size,
    isSelectedAll,
    selectAll,
    deselectAll,
    select,
    deselect,
    isSelected,
  };
}
