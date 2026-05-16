import { FieldValues, FormState } from "react-hook-form";
import { CSSProperties, useCallback, useMemo } from "react";

type UseFormDirtyStyleOptions = {
  dirtyClassName?: string;
  dirtyStyle?: CSSProperties;
};

const DEFAULT_DIRTY_CLASS = "border-amber-600";
const DEFAULT_DIRTY_STYLE: CSSProperties = {
  borderColor: "var(--color-amber-600)",
};

/**
 * Cấu trúc đệ quy của `dirtyFields` từ react-hook-form.
 * - Primitive field → `boolean`
 * - Nested object   → `DirtyValueObject`
 * - Field array     → `DirtyValueObject[]`
 */
type DirtyValue = boolean | DirtyValueObject | DirtyValueObject[];
type DirtyValueObject = { [key: string]: DirtyValue };

/**
 * Hook trả về các helper để lấy class / style cho field đã bị thay đổi.
 *
 * @param dirtyFields - `formState.dirtyFields` từ `useForm`
 * @param options     - Tuỳ chỉnh class và style khi dirty (mặc định: `border-amber-600`)
 *
 * @returns
 * - `getDirty(fieldName)`      — `true` nếu field (hoặc bất kỳ con nào) đã dirty
 * - `getDirtyClass(fieldName)` — trả về className nếu dirty, chuỗi rỗng nếu không
 * - `getDirtyStyle(fieldName)` — trả về CSSProperties nếu dirty, `undefined` nếu không
 *
 * @example
 * const { getDirtyClass } = useFormDirtyStyle(formState.dirtyFields);
 *
 * <input className={twMerge("border-gray-300", getDirtyClass("email"))} />
 * <input className={twMerge("border-gray-300", getDirtyClass("address.city"))} />
 */
export function useFormDirtyStyle<TFieldValues extends FieldValues>(
  dirtyFields: FormState<TFieldValues>["dirtyFields"],
  options: UseFormDirtyStyleOptions = {},
) {
  const {
    dirtyClassName = DEFAULT_DIRTY_CLASS,
    dirtyStyle = DEFAULT_DIRTY_STYLE,
  } = options;

  /**
   * Duyệt đệ quy một nhánh của dirtyFields.
   * Trả về `true` nếu tìm thấy bất kỳ `true` nào trong cây.
   *
   * Cần đệ quy vì RHF không flatten dirtyFields —
   * thay đổi ở `address.city` chỉ đánh dấu `{ address: { city: true } }`,
   * không phải `{ "address.city": true }`.
   */
  const hasTruthy = useCallback(
    (val: DirtyValue | null | undefined): boolean => {
      if (val == null) return false;
      if (typeof val === "boolean") return val;
      if (Array.isArray(val)) return val.some((v) => hasTruthy(v));
      // còn lại là DirtyValueObject — kiểm tra tất cả giá trị con
      return Object.values(val).some((v) => hasTruthy(v));
    },
    [],
  );

  const getDirty = useCallback(
    (fieldName: keyof TFieldValues | string): boolean => {
      if (!dirtyFields) return false;

      // Tách "address.city" → ["address", "city"]
      // Tách "tags.0.label" → ["tags", "0", "label"]  ("0" là array index)
      const parts = (fieldName as string).split(".");
      let cur: DirtyValue | undefined = (dirtyFields as DirtyValueObject)[
        parts[0]
      ];

      for (const p of parts.slice(1)) {
        if (cur == null || typeof cur === "boolean") return false;
        // JS tự coerce "0" → 0 khi truy cập array, nên không cần Number(p)
        cur = (cur as DirtyValueObject)[p];
      }

      return hasTruthy(cur);
    },
    [dirtyFields, hasTruthy],
  );

  /** Trả về `dirtyClassName` nếu field dirty, chuỗi rỗng nếu không. */
  const getDirtyClass = useCallback(
    (fieldName: keyof TFieldValues | string): string =>
      getDirty(fieldName) ? dirtyClassName : "",
    [getDirty, dirtyClassName],
  );

  /** Trả về `dirtyStyle` nếu field dirty, `undefined` nếu không. */
  const getDirtyStyle = useCallback(
    (fieldName: keyof TFieldValues | string): CSSProperties | undefined =>
      getDirty(fieldName) ? dirtyStyle : undefined,
    [getDirty, dirtyStyle],
  );

  return useMemo(
    () => ({ getDirty, getDirtyClass, getDirtyStyle }),
    [getDirty, getDirtyClass, getDirtyStyle],
  );
}
