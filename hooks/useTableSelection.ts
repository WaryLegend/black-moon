import { useState, useCallback, useMemo } from "react";

export function useTableSelection(itemIds: number[]) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleToggleAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(checked ? itemIds : []);
    },
    [itemIds],
  );

  const handleToggleOne = useCallback((id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked
        ? prev.includes(id)
          ? prev
          : [...prev, id]
        : prev.includes(id)
          ? prev.filter((i) => i !== id)
          : prev,
    );
  }, []);

  const clearSelection = useCallback(
    () => setSelectedIds((prev) => (prev.length === 0 ? prev : [])),
    [],
  );

  return useMemo(
    () => ({
      selectedIds,
      setSelectedIds,
      handleToggleAll,
      handleToggleOne,
      clearSelection,
    }),
    [selectedIds, handleToggleAll, handleToggleOne, clearSelection],
  );
}
